import React, { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../context/AuthContext.tsx";
import { jwtDecode } from "jwt-decode";
import { ComandaStatusMap, type DecodedJwt } from "../common/utils.ts";
import { ordersApi } from "../api/ordersApi.ts";
import type { ComandaDto } from "../common/types.ts";

interface Order extends ComandaDto {
  status: string;
  transportCost: number;
}

const mapOrdersWithEnumValues = (orders: ComandaDto[]): Order[] => {
  return orders.map((order) => {
    return {
      ...order,
      status: ComandaStatusMap[order.statusComanda],
      transportCost: order.metodaLivrare.pret,
    };
  });
};

const ProducerReceivedOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        if (!token) return;

        const decoded = jwtDecode<DecodedJwt>(token);
        const prodId = Number(decoded.id);

        const allOrders = await ordersApi.getAllForProducator(prodId);

        const ordersWithStatus = mapOrdersWithEnumValues(allOrders);
        setOrders(ordersWithStatus);
      } catch (error) {
        console.error("Eroare la incarcarea comenzii:", error);
      }
    };

    loadOrder();
  }, [token]);

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
              <Typography variant="h3" sx={{ mb: 1 }}>
                {textResources.orders.order} #{order.id}
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="h5" sx={{ mb: 1 }}>
                <strong>{textResources.orders.total}</strong>
                {(
                  order.comandaProduse.reduce(
                    (sum, p) => sum + p.pretUnitar * p.cantitate,
                    0,
                  ) +
                  order.comandaPachete.reduce(
                    (sum, p) => sum + p.pachet.pretTotal * p.cantitate,
                    0,
                  )
                ).toFixed(2)}{" "}
                RON
              </Typography>

              <Typography>
                <strong>{textResources.orders.date}</strong>
                {order.dataEfectuarii}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                <strong>{textResources.orders.status}</strong> {order.status}
              </Typography>

              <Button
                variant="outlined"
                sx={{ mt: 2, textTransform: "none" }}
                onClick={() => {
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
