import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"; // Asigură-te că calea e corectă (fără .tsx la import)
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { textResources } from "../theme";
import SubscriptionCard from "../components/SubscriptionCard"; // Fără .tsx
import { subscriptiiApi } from "../api/subscriptiiApi";       // Fără .ts
import type { BundleData } from "../types/BundleData";        // Fără .ts
import { jwtDecode } from "jwt-decode";
import type { PachetDTO, SubscriptieDTO } from "../common/types";

// Interfața locală adaptată pentru SubscriptionCard
// (Trebuie să corespundă cu ce așteaptă componenta ta SubscriptionCard)
export interface Subscription {
    id: number;
    clientId: number;
    dataInceput: string;
    frecventa: number; // Corectat din 'freceventa'
    status: string;
    supplier?: string;
    supplierRegion?: string;
    pachet: BundleData;
}

// Helper pentru a transforma PachetDTO (Backend) -> BundleData (Frontend Card)
const mapPachetToBundle = (pachet: PachetDTO): BundleData => ({
    id: pachet.id?.toString() || "0",
    title: pachet.nume,
    // LOGICĂ NOUĂ: Afișăm prețul de abonament (redus) dacă există, altfel prețul total
    price: pachet.pretAbonament ?? pachet.pretTotal,
    currency: "RON",
    producer: pachet.producatorNume || "Producător Local",
    image:
        pachet.imagine && pachet.imagine.trim()
            ? pachet.imagine
            : "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
    items:
        pachet.produse?.map((item) => ({
            name: item.numeProdus || "Produs",
            quantity: `${item.cantitate ?? 0} ${item.unitateMasura ?? "buc"}`,
        })) || [],
});

const MySubscriptionsPage: React.FC = () => {
    const { token } = useContext(AuthContext);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSubs = async () => {
            if (!token) return;

            setLoading(true);
            setError(null);

            try {
                // 1. Decodare ID Client
                const decoded: any = jwtDecode(token);
                const userId = Number(decoded.id);

                // 2. Apel API
                // Nota: getByClient returnează acum un Page<SubscriptieDTO>
                const response = await subscriptiiApi.getByClient(userId, 0, 100);

                // 3. Extragere array din 'content'
                const allSubsBackend: SubscriptieDTO[] = response.data.content;

                // 4. Mapare către formatul pentru UI
                const mapped: Subscription[] = allSubsBackend.map((sub) => ({
                    id: sub.id,
                    clientId: sub.client.id, // Accesam id-ul din obiectul client
                    dataInceput: sub.dataInceput,
                    frecventa: sub.frecventa, // Nume corect
                    status: sub.status,
                    supplier: sub.pachet.producatorNume,
                    supplierRegion: "România", // Sau poți lua din user details dacă ai
                    pachet: mapPachetToBundle(sub.pachet),
                }));

                setSubscriptions(mapped);
            } catch (err) {
                console.error("Eroare la încărcarea abonamentelor:", err);
                setError("Nu am putut încărca lista de abonamente.");
            } finally {
                setLoading(false);
            }
        };

        loadSubs();
    }, [token]);

    return (
        <Box sx={{ mt: 4, px: 2, pb: 6, maxWidth: "900px", mx: "auto" }}>
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 'bold' }}>
                {textResources.subscriptions.mySubscriptions}
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : subscriptions.length === 0 ? (
                <Typography variant="h6" sx={{ opacity: 0.7, textAlign: 'center', mt: 5 }}>
                    {textResources.subscriptions.noSubscriptions}
                </Typography>
            ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {subscriptions.map((sub) => (
                        // Aici trimitem obiectul `sub` adaptat
                        // Asigură-te că SubscriptionCard știe să afișeze și statusul (ACTIV/ANULAT)
                        <SubscriptionCard
                            key={sub.id}
                            subscription={sub}
                            viewMode="list"
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default MySubscriptionsPage;