import React, { useContext, useState } from "react";
import {
    Box, Typography, Card, CardContent, Grid, Button, Divider, Avatar
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type Order = {
    id: string;
    date: string;
    total: number;
    status: string;
};

type User = {
    name: string;
    email: string;
    phone: string;
    avatar?: string; // poza din backend
};

// MOCK USER (fara avatar si se pune default)
const mockUser: User = {
    name: "Nume Prenume",
    email: "client1@example.com",
    phone: "0722 123 456",
    avatar: undefined,  //lipsa poza
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

const MyAccountPage: React.FC = () => {
    const navigate = useNavigate();
    const { email } = useContext(AuthContext);
    const [orders] = useState<Order[]>(mockOrders);

    const hasAvatar = mockUser.avatar && mockUser.avatar.trim() !== "";

    return (
        <Box sx={{ mt: 4, px: 2, maxWidth: "1000px", mx: "auto" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h3">Contul Meu</Typography>
            </Box>

            {/* Date utilizator */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 1 }}>Date utilizator</Typography>
                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                        <Avatar
                            src={hasAvatar ? mockUser.avatar : undefined}
                            sx={{
                                width: 80,
                                height: 80,
                                bgcolor: "#ddd",
                                fontSize: 40
                            }}
                        >
                            {!hasAvatar && <PersonIcon fontSize="inherit" />}
                        </Avatar>

                        <Box>
                            <Typography><strong>Nume:</strong> {mockUser.name}</Typography>
                            <Typography><strong>Email:</strong> {mockUser.email}</Typography>
                            <Typography><strong>Telefon:</strong> {mockUser.phone}</Typography>
                        </Box>
                    </Box>

                    <Button sx={{ mt: 2 }} variant="contained" onClick={() =>  navigate("/edit-account")}>
                        Editează datele
                    </Button>
                </CardContent>
            </Card>

            {/* Comenzi utilizator */}
            <Card>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 1 }}>Comenzile mele</Typography>
                    <Divider sx={{ mb: 2 }} />
                    {orders.length === 0 ? (
                        <Typography>Nu ai nicio comandă.</Typography>
                    ) : (
                        <>
                            <Grid container spacing={2}>
                                {orders.slice(0, 4).map(order => (
                                    <Grid item xs={12} md={6} key={order.id}>
                                        <Card
                                            sx={{
                                                backgroundColor: "transparent",
                                                border: "2px solid #006400",
                                                borderRadius: "12px",
                                                boxShadow: "none",
                                                padding: 1
                                            }}
                                        >

                                            <CardContent>
                                                <Typography><strong>ID comandă:</strong> {order.id}</Typography>
                                                <Typography><strong>Data:</strong> {order.date}</Typography>
                                                <Typography><strong>Total:</strong> {order.total} RON</Typography>
                                                <Typography><strong>Status:</strong> {order.status}</Typography>
                                                <Button
                                                    sx={{ mt: 1 }}
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => alert(`Vezi detalii comandă ${order.id} (mock)`)}
                                                >
                                                    Vezi detalii
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            <Button
                                sx={{ mt: 3 }}
                                variant="contained"
                                onClick={() => navigate("/my-orders")}
                            >
                                Vezi toate comenzile
                            </Button>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default MyAccountPage;
