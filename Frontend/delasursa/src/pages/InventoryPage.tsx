import { Box, Typography } from "@mui/material";
import StockCard from "../components/StockCard";
import StockCardAlert from "../components/StockCardAlert";
// import mereImg from "../images/mere.png";
// import rosiiImg from "../images/rosii.png";
// import carotfiImg from "../images/cartofi.png";
// import iaurtImg from "../images/iaurt.png";
import {useEffect, useState} from "react";
import type {Produs} from "../types/Produs.ts";
import {produseApi} from "../api/produseApi.ts";
export default function InventoryPage() {

    const [products, setProducts] = useState<Produs[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const res = await produseApi.getAllProducator();
                const backendData = res.data;
                setProducts(backendData);
            }
            catch (err) {
                console.error("Eroare la incarcarea produselor producatorului:", err);
            }
        };

        fetchProducts();
    }, []);

    const updateStock = (id: number, newQuantity: number) => {
        setProducts(prev =>
            prev.map(p =>
                p.id === id ? { ...p, quantity: newQuantity } : p
            )
        );
    };


    return (
        <Box sx={{ color: "white", maxWidth: 900, mx: "auto" }}>

            <Typography variant="h4" sx={{ mb: 2 }}>
                Alerte stoc
            </Typography>

            {products
                .filter(p => p.cantitate <= 5) // doar produsele cu probleme
                .map(p => (
                    <StockCardAlert
                        key={p.id}
                        productName={p.produsName}
                        quantity={p.cantitate}
                    />
                ))
            }

            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                Inventar complet
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {products.map(p => (
                    <StockCard
                        key={p.id}
                        id={p.id}
                        imageUrl={p.imagine ? p.imagine : "/images/default.jpg"}
                        title={p.produsName}
                        category={p.categorie}
                        quantity={p.cantitate}
                        onQuantityChange={updateStock}
                    />
                ))}

            </Box>

        </Box>
    );
}
