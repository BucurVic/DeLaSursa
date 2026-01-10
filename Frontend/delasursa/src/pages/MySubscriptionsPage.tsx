import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import { jwtDecode } from "jwt-decode";
import type { DecodedJwt } from "../common/utils.ts";
import { Box, Typography } from "@mui/material";
import { textResources } from "../theme";
import SubscriptionCard from "../components/SubscriptionCard.tsx";
import type { Produs } from "../types/Produs.ts";
import { produseApi } from "../api/produseApi.ts";

interface Subscription {
  id: number;
  product: Produs;
  supplierRegion: string;
  totalPrice: number;
  currency: string;
  duration: number;
}

const productMock = await produseApi.getById(1);

const allSubs: Subscription[] = [
  {
    id: 1,
    product: productMock.data,
    supplierRegion: "Cluj",
    totalPrice: 30,
    currency: "Lei",
    duration: 11,
  },
  {
    id: 1,
    product: productMock.data,
    supplierRegion: "Arad",
    totalPrice: 35,
    currency: "Lei",
    duration: 10,
  },
];

const MySubscriptionsPage: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const loadSubs = async () => {
      try {
        if (!token) return;

        const decoded = jwtDecode<DecodedJwt>(token);
        const userId = Number(decoded.id);

        //const allSubs = await subscriptionsApi.getAllForUser(userId);
        setSubscriptions(allSubs);
      } catch (error) {
        console.error("Eroare la incarcarea abonamentelor", error);
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
            <SubscriptionCard
              key={sub.id}
              productId={sub.product.id}
              image={sub.product.produsImagine || ""}
              title={sub.product.produsName}
              category={sub.product.categorie}
              supplierRegion={sub.supplierRegion}
              supplier={sub.product.producatorName}
              totalPrice={sub.totalPrice}
              currency={sub.currency}
              duration={sub.duration}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MySubscriptionsPage;
