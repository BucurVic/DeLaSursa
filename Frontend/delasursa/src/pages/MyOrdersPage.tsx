import React, { useContext, useEffect, useState } from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { colors, textResources } from "../theme";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { DecodedJwt } from "../common/utils.ts";
import { ordersApi } from "../api/ordersApi.ts";
import type { ComandaDto } from "../common/types.ts";

interface Order extends ComandaDto {
  status: string;
  transportCost: number;
}

const mapOrdersWithRandomStatus = (orders: ComandaDto[]): Order[] => {
  const statuses = [
    "Creată",
    "În procesare",
    "Pregatită",
    "Livrată",
    "Anulată",
  ];

  return orders.map((order) => ({
    ...order,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    transportCost: 20,
  }));
};

const MyOrdersPage: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState<Order[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadOrder = async () => {
      try {
        if (!token) return;

        const decoded = jwtDecode<DecodedJwt>(token);
        const userId = Number(decoded.id);

        const allOrders = await ordersApi.getAllForUser(userId);

        const ordersWithStatus = mapOrdersWithRandomStatus(allOrders);
        setOrders(ordersWithStatus);
      } catch (error) {
        console.error("Eroare la incarcarea comenzii:", error);
      }
    };

    loadOrder();
  }, [token]);

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
                  {order.dataEfectuarii}
                </Typography>
                <Typography>
                  <strong>{textResources.orders.total}</strong>{" "}
                  {(
                    order.comandaProduse.reduce(
                      (sum, p) => sum + p.pretUnitar * p.cantitate,
                      0,
                    ) + (order.transportCost || 0)
                  ).toFixed(2)}{" "}
                  RON
                </Typography>
                {/*<Typography>*/}
                {/*  <strong>{textResources.orders.status}</strong> {order.status}*/}
                {/*</Typography>*/}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MyOrdersPage;
