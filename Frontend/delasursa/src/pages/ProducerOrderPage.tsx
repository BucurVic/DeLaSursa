import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { colors, textResources } from "../theme";
import ProducerOrderViewProductCard from "../components/ProducerOrderViewProductCard";
import Box from "@mui/material/Box";
import { Card, CardContent, Step, StepLabel, Stepper } from "@mui/material";
import Divider from "@mui/material/Divider";
import Dropdown from "../components/Dropdown.tsx";
import { AuthContext } from "../context/AuthContext.tsx";
import { jwtDecode } from "jwt-decode";
import { type Adresa, ordersApi } from "../api/ordersApi.ts";
import type { ComandaDto } from "../common/types.ts";
import {
  ComandaStatusMap,
  ComandaStatusReverseMap,
  type DecodedJwt,
  MetodaLivrareMap,
  MetodaPlataMap,
} from "../common/utils.ts";

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
  status: string;
  products: ProductInOrder[];
  deliveryAddress: Adresa;
  billingAddress: Adresa;
  deliveryMethod: string;
  paymentMethod: string;
  clientEmail?: string;
  shippingCost: number;
  trackingNumber?: string;
};

const mapComandaDtoToOrder = (c: ComandaDto): Order => ({
  id: c.id,
  date: new Date(c.dataEfectuarii),
  status: ComandaStatusMap[c.statusComanda],
  products: c.comandaProduse.map((cp) => ({
    id: cp.id,
    title: cp.produs.numeProdus,
    category: cp.produs.categorie,
    supplierRegion: "Cluj",
    supplier: cp.produs.numeProducator,
    quantity: cp.cantitate,
    unit: cp.produs.unitateDeMasura,
    price: cp.pretUnitar,
    currency: "RON",
    image: cp.produs.imagineProdus || "",
    rating: 4.9,
    reviewCount: 29,
  })),
  deliveryAddress: c.adresaLivrare,
  billingAddress: c.adresaFacturare,
  deliveryMethod: MetodaLivrareMap[c.metodaLivrare.metodaLivrare],
  paymentMethod: MetodaPlataMap[c.metodaPlata],
  shippingCost: c.metodaLivrare.pret,
  trackingNumber: `AWB${c.adresaLivrare.codPostal}`,
});

const orderStatusOptions = [
  { value: "Creată", label: textResources.orders.created },
  { value: "În procesare", label: textResources.orders.processing },
  { value: "Pregatită", label: textResources.orders.ready },
  { value: "Livrată", label: textResources.orders.delivered },
  { value: "Anulată", label: textResources.orders.canceled },
];

export default function ProducerOrderPage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [order, setOrder] = useState<Order>();

  const isHomeDelivery = order?.deliveryMethod === "Livrare acasă";

  const tr = textResources.orders;

  useEffect(() => {
    const loadOrder = async () => {
      try {
        if (!token) return;

        const decoded = jwtDecode<DecodedJwt>(token);
        const producerId = Number(decoded.id);

        const allOrders = await ordersApi.getAllForProducator(producerId);

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
  const total = subtotal + (order.shippingCost || 0);

  const steps = ["Creată", "În procesare", "Pregatită", "Livrată"];
  const activeStep = steps.indexOf(order.status);

  const handleStatusChange = async (e: any) => {
    const uiStatus = e.target.value;
    console.log("UISTATUS: " + uiStatus);
    const backendStatus = ComandaStatusReverseMap[uiStatus];
    console.log("backendStatus: " + backendStatus);

    if (!backendStatus || !order) return;

    ordersApi
      .updateStatus(order.id, backendStatus)
      .then(() => {
        setOrder((prev) => (prev ? { ...prev, status: uiStatus } : prev));
      })
      .catch((error) => {
        console.log("Eroare la update status ", error);
      });
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

        <Typography variant="body1">
          {order.billingAddress.numeComplet}
        </Typography>
        <Typography variant="body2">
          {order.billingAddress.stradaNumeNumar}
        </Typography>
        <Typography variant="body2">
          {order.billingAddress.localitate}, {order.billingAddress.judet}
        </Typography>
        <Typography variant="body2">
          {tr.zipCode} {order.billingAddress.codPostal}
        </Typography>
        <Typography variant="body2">
          {tr.phone} {order.billingAddress.telefon}
        </Typography>
      </Card>

      {isHomeDelivery && (
        <>
          <Card
            sx={{
              p: "2rem",
              backgroundColor: colors.darkGreen2,
              borderRadius: "1rem",
            }}
          >
            <Typography variant="h4" color={colors.lightGreen2}>
              {tr.deliveryAddress}
            </Typography>
            <Divider sx={{ my: "0.5rem" }} />

            <Typography variant="body1">
              {order.deliveryAddress.numeComplet}
            </Typography>
            <Typography variant="body2">
              {order.deliveryAddress.stradaNumeNumar}
            </Typography>
            <Typography variant="body2">
              {order.deliveryAddress.localitate}, {order.deliveryAddress.judet}
            </Typography>
            <Typography variant="body2">
              {tr.zipCode} {order.deliveryAddress.codPostal}
            </Typography>
            <Typography variant="body2">
              {tr.phone} {order.deliveryAddress.telefon}
            </Typography>
          </Card>
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
              {tr.trackingCost} {order.shippingCost} RON
            </Typography>
          </Card>
        </>
      )}

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
