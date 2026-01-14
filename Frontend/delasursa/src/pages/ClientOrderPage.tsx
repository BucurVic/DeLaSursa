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
import {
  ComandaStatusMap,
  type DecodedJwt,
  MetodaLivrareMap,
  MetodaPlataMap,
} from "../common/utils.ts";
import { ordersApi } from "../api/ordersApi.ts";
import type { ComandaDto } from "../common/types.ts";
import ClientOrderViewBundleCard, {
  type OrderBundleItem,
} from "../components/ClientOrderViewBundleCard.tsx";
import type { PachetProdusItemDTO } from "../api/pacheteApi.ts";

interface Order extends ComandaDto {
  date: Date;
  status: string;
  transportCost: number;
  plata: string;
  livrare: string;
}

const mapOrderWithEnumValues = (order: ComandaDto): Order => {
  return {
    ...order,
    date: new Date(order.dataEfectuarii),
    status: ComandaStatusMap[order.statusComanda],
    transportCost: order.metodaLivrare.pret,
    plata: MetodaPlataMap[order.metodaPlata],
    livrare: MetodaLivrareMap[order.metodaLivrare.metodaLivrare],
  };
};

const mapItemToBundleItem = (item: PachetProdusItemDTO): OrderBundleItem => {
  return {
    name: item.numeProdus,
    quantity: item.cantitate,
    unit: item.unitateMasura,
  };
};

export default function ClientOrderPage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [order, setOrder] = useState<Order>();
  const isHomeDelivery = order?.livrare === "Livrare acasă";

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

        const mappedOrder: Order = mapOrderWithEnumValues(currentOrderDto);

        setOrder(mappedOrder);
      } catch (error) {
        console.error("Eroare la incarcarea comenzii:", error);
      }
    };

    loadOrder();
  }, [id]);

  if (!order) return <Typography>{tr.loadingOrder}</Typography>;

  const subtotal =
    order.comandaProduse.reduce(
      (sum, p) => sum + p.pretUnitar * p.cantitate,
      0,
    ) +
    order.comandaPachete.reduce(
      (sum, p) => sum + p.pachet.pretTotal * p.cantitate,
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
            {tr.paymentMethod} {order.plata}
          </Typography>

          <Typography variant="h4">
            {tr.deliveryMethod} {order.livrare}
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
          {order.adresaFacturare.numeComplet}
        </Typography>
        <Typography variant="body2">
          {order.adresaFacturare.stradaNumeNumar}
        </Typography>
        <Typography variant="body2">
          {order.adresaFacturare.localitate}, {order.adresaFacturare.judet}
        </Typography>
        <Typography variant="body2">
          {tr.zipCode} {order.adresaFacturare.codPostal}
        </Typography>
        <Typography variant="body2">
          {tr.phone} {order.adresaFacturare.telefon}
        </Typography>
      </Card>

      {isHomeDelivery && (
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

          <Typography variant="body1">
            {order.adresaLivrare.numeComplet}
          </Typography>
          <Typography variant="body2">
            {order.adresaLivrare.stradaNumeNumar}
          </Typography>
          <Typography variant="body2">
            {order.adresaLivrare.localitate}, {order.adresaLivrare.judet}
          </Typography>
          <Typography variant="body2">
            {tr.zipCode} {order.adresaLivrare.codPostal}
          </Typography>
          <Typography variant="body2">
            {tr.phone} {order.adresaLivrare.telefon}
          </Typography>
        </Card>
      )}

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
        {order.comandaProduse.map((prod) => (
          <ClientOrderViewProductCard
            key={prod.id}
            productId={prod.id}
            image={prod.produs.imagineProdus}
            title={prod.produs.numeProdus}
            category={prod.produs.categorie}
            quantity={prod.cantitate}
            unit={prod.produs.unitateDeMasura}
            supplierRegion={"Cluj"}
            supplier={prod.produs.numeProducator}
            price={prod.pretUnitar}
            currency={"RON"}
            onAddReview={() => console.log("Review added")}
          />
        ))}

        {order.comandaPachete.map((b) => (
          <ClientOrderViewBundleCard
            key={b.id}
            bundleId={b.id.toString()}
            image={
              "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
            }
            title={b.pachet.nume}
            items={b.pachet.produse.map((p) => mapItemToBundleItem(p))}
            price={b.pachet.pretTotal}
            currency={"RON"}
            onAddReview={() => console.log("Review added")}
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
