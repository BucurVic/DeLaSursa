import { Box, Card, CardContent } from "@mui/material";
import { colors, textResources as tr } from "../theme";
import {
  LocalShipping,
  PendingActions,
  StarRate,
  Wallet,
} from "@mui/icons-material";
import IconComponent from "../components/IconComponent.tsx";
import { useContext, useEffect, useState } from "react";
import type { Produs } from "../types/Produs.ts";
import { produseApi } from "../api/produseApi.ts";
import Typography from "@mui/material/Typography";
import IncomeChart from "../components/IncomeChart.tsx";
import ProducerProductCardSimple from "../components/ProducerProductCardSimple.tsx";
import { AuthContext } from "../context/AuthContext.tsx";
import { jwtDecode } from "jwt-decode";
import { type DecodedJwt } from "../common/utils.ts";
import { ComandaStatus, ordersApi } from "../api/ordersApi.ts";

// eslint-disable-next-line react-refresh/only-export-components
export const incomeData = [
  { date: "2025-01-10", income: 220 },
  { date: "2025-01-11", income: 180 },
  { date: "2025-01-12", income: 260 },
  { date: "2025-01-13", income: 240 },
  { date: "2025-01-14", income: 300 },
  { date: "2025-01-15", income: 280 },
  { date: "2025-01-16", income: 310 },
  { date: "2025-01-17", income: 290 },
  { date: "2025-01-18", income: 330 },
  { date: "2025-01-19", income: 350 },
  { date: "2025-01-20", income: 370 },
  { date: "2025-01-21", income: 340 },
  { date: "2025-01-22", income: 360 },
  { date: "2025-01-23", income: 390 },
  { date: "2025-01-24", income: 420 },
  { date: "2025-01-25", income: 410 },
  { date: "2025-01-26", income: 450 },
  { date: "2025-01-27", income: 470 },
  { date: "2025-01-28", income: 430 },
  { date: "2025-01-29", income: 480 },
  { date: "2025-01-30", income: 500 },
  { date: "2025-01-31", income: 520 },
  { date: "2025-02-01", income: 540 },
  { date: "2025-02-02", income: 560 },
  { date: "2025-02-03", income: 580 },
  { date: "2025-02-04", income: 610 },
  { date: "2025-02-05", income: 630 },
  { date: "2025-02-06", income: 600 },
  { date: "2025-02-07", income: 650 },
  { date: "2025-02-08", income: 670 },
];

export default function ProducerDashboardMain() {
  const { token } = useContext(AuthContext);

  const [pendingOrders, setPendingOrders] = useState<number>(0);
  const [deliveredOrders, setDeliveredOrders] = useState<number>(0);
  const [products, setProducts] = useState<Produs[]>([]);
  const [venit, setVenit] = useState<number>(0);
  const [incomeData, setIncomeData] = useState<
    { date: string; income: number }[]
  >([]);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        if (!token) return;

        const decoded = jwtDecode<DecodedJwt>(token);
        const producerId = Number(decoded.id);

        const allOrders = await ordersApi.getAllForProducator(producerId);
        const data = await ordersApi.getVenitPeZiProducator(producerId);
        setIncomeData(data);

        const pending = allOrders.filter(
          (o) =>
            o.statusComanda === ComandaStatus.CREATED ||
            o.statusComanda === ComandaStatus.PROCESSING ||
            o.statusComanda === ComandaStatus.READY_TO_DELIVER,
        ).length;
        const delivered = allOrders.filter(
          (o) => o.statusComanda === ComandaStatus.DELIVERED,
        ).length;

        setPendingOrders(pending);
        setDeliveredOrders(delivered);

        const newVenit = await ordersApi.getVenitPeAnProducator(producerId);
        setVenit(newVenit);
      } catch (error) {
        console.error("Eroare la incarcarea comenzii:", error);
      }
    };

    loadOrder();
  }, [token]);
  useEffect(() => {
    produseApi
      .getAllProducator()
      .then((res) => {
        console.log("Produse primite: ", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Eroare la incarcarea produselor: ", err);
      });
  }, []);

  const stats = [
    {
      icon: <Wallet />,
      value: venit + " RON",
      label: tr.producerDashboard.income,
    },
    {
      icon: <PendingActions />,
      value: pendingOrders,
      label: tr.producerDashboard.pendingOrders,
    },
    {
      icon: <LocalShipping />,
      value: deliveredOrders,
      label: tr.producerDashboard.deliveredOrders,
    },
    {
      icon: <StarRate />,
      value: "4.8",
      label: tr.producerDashboard.averageRating,
    },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <h1 style={{ color: colors.white1 }}>{tr.producerDashboard.title}</h1>
      <Card
        sx={{ backgroundColor: colors.darkGreen2, borderRadius: "3rem", p: 2 }}
      >
        <CardContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            {stats.map((item) => (
              <IconComponent
                icon={item.icon}
                value={item.value.toString()}
                label={item.label}
                sx={{ flex: 1 }}
              />
            ))}
          </Box>
          <Typography variant="h3">
            {tr.producerDashboard.mostLikedProducts}
          </Typography>
          <Card
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              backgroundColor: colors.darkGreen1,
              borderRadius: "1rem",
              border: "0.5px solid",
              borderColor: `${colors.lightGreen1Transparent}`,
              gap: "1rem",
            }}
          >
            {products.map((p) => (
              <ProducerProductCardSimple
                title={p.produsName}
                produsImagine={p.produsImagine ?? ""}
                rating={5}
                reviewCount={30}
                price={p.pret}
                unit={p.unitate_masura}
                currency={"RON"}
              />
            ))}
          </Card>

          <Typography variant="h3">{tr.producerDashboard.salePlot}</Typography>
          <Card
            sx={{
              alignItems: "center",
              padding: 2,
              backgroundColor: colors.darkGreen1,
              borderRadius: "2rem",
              border: "0.5px solid",
              borderColor: `${colors.lightGreen1Transparent}`,
            }}
          >
            <IncomeChart data={incomeData} />
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
}
