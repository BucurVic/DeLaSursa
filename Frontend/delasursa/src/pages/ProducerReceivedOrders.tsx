import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colors, textResources } from "../theme";

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
  rating: number;
  reviewCount: number;
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
  clientEmail?: string;
  shippingCost?: number;
  trackingNumber?: string;
};

const mockProducts: ProductInOrder[] = [
  {
    id: 1,
    image: "../../public/images/pea.jpg",
    title: "Mazare",
    category: "Legume",
    quantity: 10,
    unit: "kg",
    supplierRegion: "Cluj-Napoca",
    supplier: "FreshFruits SRL",
    price: 4.5,
    currency: "LEI",
    rating: 5.0,
    reviewCount: 38,
  },
  {
    id: 2,
    image: "../../public/images/cheese.jpg",
    title: "Branza",
    category: "Lactate",
    quantity: 25,
    unit: "kg",
    supplierRegion: "Salaj",
    supplier: "AgroPol",
    price: 1.7,
    currency: "LEI",
    rating: 4.7,
    reviewCount: 20,
  },
  {
    id: 3,
    image: "../../public/images/cheese2.jpg",
    title: "Alta branza",
    category: "Lactate",
    quantity: 12,
    unit: "kg",
    supplierRegion: "Alba",
    supplier: "Supplier",
    price: 2.8,
    currency: "LEI",
    rating: 4.9,
    reviewCount: 57,
  },
];

const mockOrders: Order[] = [
  {
    id: 1001,
    date: new Date("2024-02-10"),
    status: "Livrată",
    deliveryMethod: "Curier rapid",
    paymentMethod: "Card online",
    clientEmail: "ion.popescu@example.com",
    trackingNumber: "FNC-123456789",
    shippingCost: 15,
    deliveryAddress: {
      name: "Ion Popescu",
      street: "Str. Zorilor 15",
      city: "Cluj-Napoca",
      region: "Cluj",
      zip: "400123",
      phone: "0745 123 456",
    },
    billingAddress: {
      name: "Ion Popescu",
      street: "Str. Observatorului 20",
      city: "Cluj-Napoca",
      region: "Cluj",
      zip: "400456",
      phone: "0745 123 456",
    },
    products: [mockProducts[0], mockProducts[1]],
  },
  {
    id: 1002,
    date: new Date("2024-03-01"),
    status: "În procesare",
    deliveryMethod: "Ridicare personală",
    paymentMethod: "Numerar",
    clientEmail: "andreeaion@example.com",
    trackingNumber: "FNC-123456678",
    shippingCost: 15,
    deliveryAddress: {
      name: "Andreea Ionescu",
      street: "Str. Horea 12",
      city: "Alba Iulia",
      region: "Alba",
      zip: "510789",
      phone: "0723 456 789",
    },
    billingAddress: {
      name: "Andreea Ionescu",
      street: "Str. Horea 12",
      city: "Alba Iulia",
      region: "Alba",
      zip: "510789",
      phone: "0723 456 789",
    },
    products: [mockProducts[2]],
  },
];

const ProducerReceivedOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const navigate = useNavigate();

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
                {textResources.orders.order} #{order.id}
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography>
                <strong>{textResources.orders.date}</strong>
                {order.date.toLocaleDateString()}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                <strong>{textResources.orders.status}</strong> {order.status}
              </Typography>

              <Button
                variant="outlined"
                sx={{ mt: 2, textTransform: "none" }}
                onClick={() => {
                  //navigate(`/dashboard-producator/comenzi-primite/3`); am testat cu o comanda catre producatorul cu id 13
                  navigate(`/dashboard-producator/comenzi-primite/${order.id}`);
                }}
              >
                {textResources.orders.details}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProducerReceivedOrders;
