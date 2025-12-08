import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { colors, textResources } from "../theme";
import ClientOrderViewProductCard from "../components/ClientOrderViewProductCard.tsx";
import Box from "@mui/material/Box";
import { Card, CardContent, Step, StepLabel, Stepper } from "@mui/material";
import Divider from "@mui/material/Divider";

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
    status: "In procesare",
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

// select * from comenzi where id_client=?
// select * from comanda_produs where id_comanda=?

export default function ClientOrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order>();
  const tr = textResources.orders;

  useEffect(() => {
    const load = async () => {
      //const res = await comenziApi.getById(parseInt(id));
      const res = mockOrders.find((o) => o.id === Number(id));
      setOrder(res);
    };
    load();
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
