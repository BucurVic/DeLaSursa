import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

type Order = {
    id: string;
    date: string;
    total: number;
    status: string;
};

const mockOrders: Order[] = [
    { id: "1", date: "2025-11-25", total: 120, status: "În curs" },
    { id: "2", date: "2025-11-20", total: 80, status: "Livrat" },
    { id: "3", date: "2025-11-18", total: 50, status: "Anulat" },
    { id: "4", date: "2025-11-15", total: 200, status: "Livrat" },
    { id: "5", date: "2025-11-14", total: 200, status: "Livrat" },
    { id: "6", date: "2025-11-10", total: 200, status: "Livrat" },
    { id: "7", date: "2025-10-12", total: 200, status: "Livrat" },
];

const MyOrdersPage: React.FC = () => {
    const { token } = useContext(AuthContext);
    const [orders, setOrders] = useState<Order[]>(mockOrders);

    useEffect(() => {
        if (!token) return;
        // fetch backend mai târziu
    }, [token]);

    return (
        <Box sx={{ mt: 4, px: 2, maxWidth: "900px", mx: "auto" }}>
            <Typography variant="h3" sx={{ mb: 3 }}>Toate comenzile mele</Typography>

            {orders.length === 0 ? (
                <Typography>Nu ai nicio comandă.</Typography>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {orders.map(order => (
                        <Card
                            key={order.id}
                            sx={{
                                width: "100%",
                                backgroundColor: "transparent",
                                border: "2px solid #006400",
                                borderRadius: "14px",
                                padding: 2,
                                boxShadow: "none",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" sx={{ mb: 1 }}>
                                    Comanda #{order.id}
                                </Typography>

                                <Divider sx={{ mb: 2 }} />

                                <Typography><strong>Data:</strong> {order.date}</Typography>
                                <Typography><strong>Total:</strong> {order.total} RON</Typography>
                                <Typography><strong>Status:</strong> {order.status}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default MyOrdersPage;
