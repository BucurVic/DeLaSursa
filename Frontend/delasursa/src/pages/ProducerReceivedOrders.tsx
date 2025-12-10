import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { colors, textResources } from "../theme";

// TIPURI
type Address = {
  street: string;
  city: string;
  county: string;
};

type ProductInOrder = {
  name: string;
  quantity: number;
};

type OrderStatus =
  | "Creată"
  | "În procesare"
  | "Pregatită"
  | "Livrată"
  | "Anulată";

type Order = {
  id: number;
  date: Date;
  status: OrderStatus;
  products: ProductInOrder[];
  deliveryAddress: Address;
  billingAddress: Address;
  deliveryMethod: string;
  paymentMethod: string;
  clientEmail?: string;
  shippingCost?: number;
  trackingNumber?: string;
};

// OPȚIUNI STATUS
const orderStatusOptions = [
  { value: "Creată", label: textResources.orders.created },
  { value: "În procesare", label: textResources.orders.processing },
  { value: "Pregatită", label: textResources.orders.ready },
  { value: "Livrată", label: textResources.orders.delivered },
  { value: "Anulată", label: textResources.orders.canceled },
];

// CULORI CARD DUPĂ STATUS
const statusColors: Record<OrderStatus, string> = {
  Creată: "#d9eaff",
  "În procesare": "#fff4cc",
  Pregatită: "#e6ffe6",
  Livrată: "#ccffea",
  Anulată: "#ffd6d6",
};

// MOCK DATA
const mockOrders: Order[] = [
  {
    id: 1,
    date: new Date("2025-01-03"),
    status: "În procesare",
    products: [
      { name: "Mere", quantity: 10 },
      { name: "Pere", quantity: 4 },
    ],
    deliveryAddress: {
      street: "Str. Lalelelor 12",
      city: "Cluj",
      county: "CJ",
    },
    billingAddress: { street: "Str. Unirii 22", city: "Cluj", county: "CJ" },
    deliveryMethod: "Curier",
    paymentMethod: "Card",
    clientEmail: "client1@mail.com",
    shippingCost: 15,
    trackingNumber: "TRK12345",
  },
  {
    id: 2,
    date: new Date("2025-01-04"),
    status: "Livrată",
    products: [{ name: "Portocale", quantity: 5 }],
    deliveryAddress: {
      street: "Str. Florilor 50",
      city: "Oradea",
      county: "BH",
    },
    billingAddress: {
      street: "Str. Florilor 50",
      city: "Oradea",
      county: "BH",
    },
    deliveryMethod: "Pickup local",
    paymentMethod: "Cash",
  },
  {
    id: 3,
    date: new Date("2025-01-05"),
    status: "Anulată",
    products: [{ name: "Banane", quantity: 7 }],
    deliveryAddress: {
      street: "Str. Libertatii 3",
      city: "București",
      county: "B",
    },
    billingAddress: {
      street: "Str. Libertatii 3",
      city: "București",
      county: "B",
    },
    deliveryMethod: "Curier",
    paymentMethod: "Card",
  },
];

const ProducerReceivedOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>("Creată");
  const [confirmCancel, setConfirmCancel] = useState(false);

  const changeOrderStatus = (id: number, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <Box sx={{ mt: 4, px: 2, maxWidth: "900px", mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {textResources.sidebar.orders}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {orders.map((order) => (
          <Card
            key={order.id}
            sx={{
              width: "100%",
              backgroundColor: "transparent",
              borderRadius: "14px",
              padding: 2,
              border: `0.5px solid ${colors.lightGreen1Transparent}`,
            }}
          >
            <CardContent>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Comanda #{order.id}
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography>
                <strong>Data:</strong> {order.date.toLocaleDateString()}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                <strong>Status:</strong> {order.status}
              </Typography>

              <Button
                variant="outlined"
                sx={{ mt: 2, textTransform: "none" }}
                onClick={() => {
                  setSelectedOrder(order);
                  setNewStatus(order.status);
                }}
              >
                Detalii
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* MODAL DETALII COMANDĂ */}
      <Dialog
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        fullWidth
        maxWidth="sm"
      >
        {selectedOrder && (
          <>
            <DialogTitle>Comanda #{selectedOrder.id}</DialogTitle>

            <DialogContent dividers>
              <Typography>
                <strong>Data:</strong> {selectedOrder.date.toLocaleDateString()}
              </Typography>

              <Typography sx={{ mt: 2 }}>
                <strong>Produse:</strong>
              </Typography>
              {selectedOrder.products.map((p, i) => (
                <Typography key={i}>
                  • {p.name} x {p.quantity}
                </Typography>
              ))}

              <Typography sx={{ mt: 2 }}>
                <strong>Adresă livrare:</strong>
              </Typography>
              <Typography>
                {selectedOrder.deliveryAddress.street},{" "}
                {selectedOrder.deliveryAddress.city},{" "}
                {selectedOrder.deliveryAddress.county}
              </Typography>

              <Typography sx={{ mt: 2 }}>
                <strong>Metodă plată:</strong> {selectedOrder.paymentMethod}
              </Typography>
              <Typography>
                <strong>Metodă livrare:</strong> {selectedOrder.deliveryMethod}
              </Typography>

              <Typography sx={{ mt: 2 }}>
                <strong>Status actual:</strong> {selectedOrder.status}
              </Typography>

              {/* SELECT STATUS */}
              <Select
                fullWidth
                sx={{ mt: 2 }}
                value={newStatus}
                onChange={(e) => {
                  const v = e.target.value as OrderStatus;
                  if (v === "Anulată") {
                    setConfirmCancel(true);
                  } else {
                    setNewStatus(v);
                  }
                }}
              >
                {orderStatusOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setSelectedOrder(null)}>Închide</Button>
              <Button
                variant="contained"
                onClick={() => {
                  changeOrderStatus(selectedOrder.id, newStatus);
                  setSelectedOrder(null);
                }}
              >
                Salvează
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* CONFIRMARE ANULARE */}
      <Dialog open={confirmCancel} onClose={() => setConfirmCancel(false)}>
        <DialogTitle>Confirmare anulare</DialogTitle>
        <DialogContent>Sigur vrei să anulezi această comandă?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmCancel(false)}>Nu</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              if (selectedOrder) {
                setNewStatus("Anulată");
              }
              setConfirmCancel(false);
            }}
          >
            Da, anulează
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProducerReceivedOrders;
