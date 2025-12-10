import { Box, Card, CardContent } from "@mui/material";
import { colors, textResources, textResources as tr } from "../theme";
import {
  LocalShipping,
  PendingActions,
  StarRate,
  Wallet,
} from "@mui/icons-material";
import IconComponent from "../components/IconComponent.tsx";
import { useEffect, useState } from "react";
import type { Produs } from "../types/Produs.ts";
import { produseApi } from "../api/produseApi.ts";
import Typography from "@mui/material/Typography";
import IncomeChart from "../components/IncomeChart.tsx";
import ProducerProductCardSimple from "../components/ProducerProductCardSimple.tsx";

const stats = [
  {
    icon: <Wallet />,
    value: "2.450 LEI",
    label: textResources.producerDashboard.income,
  },
  {
    icon: <PendingActions />,
    value: "15",
    label: textResources.producerDashboard.pendingOrders,
  },
  {
    icon: <LocalShipping />,
    value: "8",
    label: textResources.producerDashboard.deliveredOrders,
  },
  {
    icon: <StarRate />,
    value: "4.8",
    label: textResources.producerDashboard.averageRating,
  },
];

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
  const [products, setProducts] = useState<Produs[]>([]);

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
                value={item.value}
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
                produsImagine={p.produsImagine || ""}
                rating={5}
                reviewCount={30}
                price={p.pret}
                unit={p.unitate_masura}
                currency={"LEI"}
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
