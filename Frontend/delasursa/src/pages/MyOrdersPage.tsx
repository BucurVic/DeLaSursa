import React, { useContext, useEffect, useState } from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { colors, textResources } from "../theme";
import { useNavigate } from "react-router-dom";

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
    onAddReview: () => console.log("Review added for 1"),
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
    onAddReview: () => console.log("Review added for 2"),
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
    onAddReview: () => console.log("Review added for 3"),
  },
];

const mockOrders: Order[] = [
  {
    id: 1001,
    date: new Date("2024-02-10"),
    status: "Livrată",
    deliveryMethod: "Curier rapid",
    paymentMethod: "Card online",
    transportCost: 19.99,
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
    transportCost: 15,
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

const MyOrdersPage: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  useEffect(() => {
    if (!token) return;
    // fetch backend mai târziu
  }, [token]);

  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 4, px: 2, maxWidth: "900px", mx: "auto" }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        {textResources.orders.allOrders}
      </Typography>

      {orders.length === 0 ? (
        <Typography>{textResources.orders.noOrders}</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {orders.map((order) => (
            <Card
              key={order.id}
              sx={{
                width: "100%",
                backgroundColor: "transparent",
                border: `0.5px solid ${colors.lightGreen1Transparent}`,
                borderRadius: "14px",
                padding: 2,
                boxShadow: "none",
              }}
              onClick={() => {
                //navigate(`/my-orders/1`); am testat pt o comanda a clientului cu id 2
                navigate(`/my-orders/${order.id}`);
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {textResources.orders.order} #{order.id}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Typography>
                  <strong>{textResources.orders.date}</strong>{" "}
                  {order.date.toLocaleDateString()}
                </Typography>
                <Typography>
                  <strong>{textResources.orders.total}</strong>{" "}
                  {(
                    order.products.reduce(
                      (sum, p) => sum + p.price * p.quantity,
                      0,
                    ) + (order.transportCost || 0)
                  ).toFixed(2)}{" "}
                  RON
                </Typography>
                <Typography>
                  <strong>{textResources.orders.status}</strong> {order.status}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MyOrdersPage;
