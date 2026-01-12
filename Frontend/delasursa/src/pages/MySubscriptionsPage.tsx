import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import { Box, Typography } from "@mui/material";
import { textResources } from "../theme";
import SubscriptionCard from "../components/SubscriptionCard.tsx";
import { type SubscriptieDTO, subscriptiiApi } from "../api/subscriptiiApi.ts";
import type { BundleData } from "../types/BundleData.ts";
import type { PachetDTO } from "../api/pacheteApi.ts";
import { jwtDecode } from "jwt-decode";

interface Subscription {
  id: number;
  clientId: number;
  dataInceput: string;
  freceventa: number;
  status: string;
  supplier?: string;
  supplierRegion?: string;
  pachet: BundleData;
}

const mapBackendToFrontend = (pachet: PachetDTO): BundleData => ({
  id: pachet.id.toString(),
  title: pachet.nume,
  price: pachet.pretTotal ?? 0,
  currency: "RON",
  producer: pachet.producatorNume,
  image:
    pachet.imagine && pachet.imagine.trim()
      ? pachet.imagine
      : "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
  items:
    pachet.produse?.map((item) => ({
      name: item.numeProdus,
      quantity: `${item.cantitate ?? 0} ${item.unitateMasura ?? ""}`,
    })) || [],
});

const mapSubscriptions = (subs: SubscriptieDTO[]): Subscription[] =>
  subs.map((sub) => ({
    id: sub.id,
    clientId: sub.clientId,
    dataInceput: sub.dataInceput,
    freceventa: sub.freceventa,
    status: sub.status,
    supplier: sub.pachet?.producatorNume,
    supplierRegion: "Cluj",
    pachet: mapBackendToFrontend(sub.pachet!),
  }));

const MySubscriptionsPage: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const loadSubs = async () => {
      if (!token) return;

      try {
        const decoded = jwtDecode<{ id: string }>(token);
        const userId = Number(decoded.id);

        const allSubs: SubscriptieDTO[] =
          await subscriptiiApi.getAllForUser(userId);
        const mapped: Subscription[] = mapSubscriptions(allSubs);
        setSubscriptions(mapped);
      } catch (err) {
        console.error("Eroare la încărcarea abonamentelor:", err);
      }
    };

    loadSubs();
  }, [token]);

  return (
    <Box sx={{ mt: 4, px: 2, pb: 6, maxWidth: "900px", mx: "auto" }}>
      <Typography variant="h3" sx={{ mb: 3 }}>
        {textResources.subscriptions.mySubscriptions}
      </Typography>

      {subscriptions.length === 0 ? (
        <Typography>{textResources.subscriptions.noSubscriptions}</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {subscriptions.map((sub) => (
            <SubscriptionCard key={sub.id} subscription={sub} viewMode="list" />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MySubscriptionsPage;
