import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { colors, textResources } from "../theme";
import ClientOrderViewProductCard from "../components/ClientOrderViewProductCard.tsx";
import Box from "@mui/material/Box";
import { Card, CardContent, Step, StepLabel, Stepper } from "@mui/material";
import Divider from "@mui/material/Divider";
import { AuthContext } from "../context/AuthContext.tsx";
import { jwtDecode } from "jwt-decode";
import type { DecodedJwt } from "../common/utils.ts";
import { ordersApi } from "../api/ordersApi.ts";
import type { ComandaDto } from "../common/types.ts";

type Address = {
  name: string;
  street: string;
  city: string;
  region: string;
  zip: string;
  phone: string;
};

type ProductInOrder = {
  id: number;
  image: string;
  title: string;
  category: string;
  quantity: number;
  unit: string;
  supplierRegion: string;
  supplierLogo?: string;
  supplier: string;
  price: number;
  currency?: string;
  onAddReview: () => void;
};

type Order = {
  id: number;
  date: Date;
  status: "Creată" | "În procesare" | "Pregatită" | "Livrată" | "Anulată";
  products: ProductInOrder[];
  deliveryAddress: Address;
  billingAddress: Address;
  deliveryMethod: string;
  paymentMethod: string;
  transportCost: number;
};

const mapComandaDtoToOrder = (c: ComandaDto): Order => ({
  id: c.id,
  date: new Date(c.dataEfectuarii),
  status: "Creată",
  products: c.comandaProduse.map((cp) => ({
    id: cp.id,
    image: cp.produs.imagineProdus || "",
    title: cp.produs.numeProdus,
    category: cp.produs.categorie,
    quantity: cp.cantitate,
    unit: cp.produs.unitateDeMasura,
    supplierRegion: "Cluj",
    supplier: cp.produs.numeProducator,
    price: cp.pretUnitar,
    currency: "RON",
    onAddReview: () => console.log("Review added"),
  })),
  deliveryAddress: {
    name: `${c.client.nume} ${c.client.prenume}`,
    street: "Str. Horea 12",
    city: "Cluj-Napoca",
    region: "Cluj",
    zip: "510789",
    phone: "0701 111 111",
  },
  billingAddress: {
    name: `${c.client.nume} ${c.client.prenume}`,
    street: "Str. Horea 12",
    city: "Cluj-Napoca",
    region: "Cluj",
    zip: "510789",
    phone: "0701 111 111",
  },
  deliveryMethod: "Curier",
  paymentMethod: "Card",
  transportCost: 20,
});

export default function ClientOrderPage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [order, setOrder] = useState<Order>();
  const tr = textResources.orders;

  useEffect(() => {
    const loadOrder = async () => {
      try {
        if (!token) return;

        const decoded = jwtDecode<DecodedJwt>(token);
        const userId = Number(decoded.id);

        const allOrders = await ordersApi.getAllForUser(userId);

        const currentOrderDto = allOrders.find((o) => o.id === Number(id));
        if (!currentOrderDto) return;

        const mappedOrder: Order = mapComandaDtoToOrder(currentOrderDto);

        setOrder(mappedOrder);
      } catch (error) {
        console.error("Eroare la incarcarea comenzii:", error);
      }
    };

    loadOrder();
  }, [id]);

  if (!order) return <Typography>{tr.loadingOrder}</Typography>;

  const subtotal = order.products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0,
  );
  const total = subtotal + order.transportCost;

  const steps = ["Creată", "În procesare", "Pregatită", "Livrată"];
  const activeStep = steps.indexOf(order.status);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "75%",
        margin: "0 auto",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Card
        sx={{
          width: "100%",
          padding: "2rem",
          borderRadius: "1rem",
          backgroundColor: colors.darkGreen2,
        }}
      >
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
        >
          <Typography variant="h2" color={colors.lightGreen2}>
            {tr.order} #{order.id}
          </Typography>
          <Divider />

          <Typography variant="h4">
            {tr.status} {order.status}
          </Typography>

          <Typography variant="h4">
            {tr.date} {order.date.toLocaleDateString()}
          </Typography>

          <Typography variant="h4">
            {tr.paymentMethod} {order.paymentMethod}
          </Typography>

          <Typography variant="h4">
            {tr.deliveryMethod} {order.deliveryMethod}
          </Typography>
        </CardContent>
      </Card>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          "@media (max-width: 48rem)": {
            // 768px ~ 48rem
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Box
          sx={{
            padding: "2rem",
            borderRadius: "1rem",
            backgroundColor: colors.darkGreen2,
          }}
        >
          <Typography variant="h4" color={colors.lightGreen2}>
            {tr.deliveryAddress}
          </Typography>
          <Divider sx={{ my: "0.5rem" }} />

          <Typography variant="body1">{order.deliveryAddress.name}</Typography>
          <Typography variant="body2">
            {order.deliveryAddress.street}
          </Typography>
          <Typography variant="body2">
            {order.deliveryAddress.city}, {order.deliveryAddress.region}
          </Typography>
          <Typography variant="body2">
            {tr.zipCode} {order.deliveryAddress.zip}
          </Typography>
          <Typography variant="body2">
            {tr.phone} {order.deliveryAddress.phone}
          </Typography>
        </Box>

        <Box
          sx={{
            padding: "2rem",
            borderRadius: "1rem",
            backgroundColor: colors.darkGreen2,
          }}
        >
          <Typography variant="h4" color={colors.lightGreen2}>
            {tr.billingAddress}
          </Typography>
          <Divider sx={{ my: "0.5rem" }} />

          <Typography variant="body1">{order.billingAddress.name}</Typography>
          <Typography variant="body2">{order.billingAddress.street}</Typography>
          <Typography variant="body2">
            {order.billingAddress.city}, {order.billingAddress.region}
          </Typography>
          <Typography variant="body2">
            {tr.zipCode} {order.billingAddress.zip}
          </Typography>
          <Typography variant="body2">
            {tr.phone} {order.billingAddress.phone}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          backgroundColor: colors.darkGreen1,
          borderRadius: "1rem",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {order.products.map((prod) => (
          <ClientOrderViewProductCard
            key={prod.id}
            productId={prod.id}
            image={prod.image}
            title={prod.title}
            category={prod.category}
            quantity={prod.quantity}
            unit={prod.unit}
            supplierRegion={prod.supplierRegion}
            supplierLogo={prod.supplierLogo}
            supplier={prod.supplier}
            price={prod.price}
            currency={prod.currency}
            onAddReview={prod.onAddReview}
          />
        ))}

        <Divider sx={{ my: "1rem" }} />

        <Typography variant="h5">
          {tr.subtotal} {subtotal.toFixed(2)} {tr.currency}
        </Typography>
        <Typography variant="h5">
          {tr.delivery} {(order.transportCost || 0).toFixed(2)} {tr.currency}
        </Typography>
        <Typography variant="h3">
          {tr.total} {total.toFixed(2)} {tr.currency}
        </Typography>
      </Box>
    </Box>
  );
}
