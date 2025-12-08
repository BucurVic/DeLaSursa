import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { colors, textResources } from "../theme";
import ProducerOrderViewProductCard from "../components/ProducerOrderViewProductCard";
import Box from "@mui/material/Box";
import { Card, CardContent, Step, StepLabel, Stepper } from "@mui/material";
import Divider from "@mui/material/Divider";
import Dropdown from "../components/Dropdown.tsx";

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
    status: "In procesare",
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

const orderStatusOptions = [
  { value: "Creată", label: textResources.orders.created },
  { value: "În procesare", label: textResources.orders.processing },
  { value: "Pregatită", label: textResources.orders.ready },
  { value: "Livrată", label: textResources.orders.delivered },
  { value: "Anulată", label: textResources.orders.canceled },
];

export default function ProducerOrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order>();

  const tr = textResources.orders;

  useEffect(() => {
    const load = async () => {
      // aici ai apela API-ul: comenziApi.getByIdForProducer(parseInt(id))
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
  const total = subtotal + (order.shippingCost || 0);

  const steps = ["Creată", "În procesare", "Pregatită", "Livrată"];
  const activeStep = steps.indexOf(order.status);

  const handleStatusChange = (e: any) => {
    const newStatus = e.target.value;
    setOrder((prev) => (prev ? { ...prev, status: newStatus } : prev));
  };

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

          <Typography variant="h4">
            {tr.clientEmail} {order.clientEmail}
          </Typography>

          <Dropdown
            label={tr.changeStatus}
            name="orderStatus"
            value={order.status}
            onChange={(e) => handleStatusChange(e)}
            options={orderStatusOptions}
            width="15rem"
          />
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
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          "@media (max-width: 48rem)": {
            // 768px ~ 48rem
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Card
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
        </Card>

        <Card
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
        </Card>
      </Box>

      <Card
        sx={{
          p: "2rem",
          backgroundColor: colors.darkGreen2,
          borderRadius: "1rem",
        }}
      >
        <Typography variant="h4" color={colors.lightGreen2}>
          {tr.deliveryDetails}
        </Typography>
        <Divider sx={{ my: "0.5rem" }} />
        <Typography>{tr.fanCourier}</Typography>
        <Typography>
          {tr.trackingNO} {order.trackingNumber}
        </Typography>
        <Typography>
          {tr.trackingCost} {order.shippingCost} lei
        </Typography>
      </Card>

      <Box
        sx={{
          backgroundColor: colors.darkGreen1,
          borderRadius: "1rem",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {order.products.map((prod) => (
          <ProducerOrderViewProductCard
            key={prod.id}
            productId={prod.id}
            image={prod.image}
            title={prod.title}
            quantity={prod.quantity}
            unit={prod.unit}
            price={prod.price}
            currency={prod.currency}
            rating={prod.rating}
            reviewCount={prod.reviewCount}
          />
        ))}

        <Divider sx={{ my: "1rem" }} />

        <Typography variant="h5">
          {tr.subtotal} {subtotal.toFixed(2)} {tr.currency}
        </Typography>
        <Typography variant="h5">
          {tr.delivery} {(order.shippingCost || 0).toFixed(2)} {tr.currency}
        </Typography>
        <Typography variant="h3">
          {tr.total} {total.toFixed(2)} {tr.currency}
        </Typography>
      </Box>
    </Box>
  );
}
