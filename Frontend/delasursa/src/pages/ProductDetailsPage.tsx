import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { produseApi } from "../api/produseApi";
import { colors } from "../theme/colors";
import { useCart } from "../context/CartContext";
import {textResources} from "../theme";
const reviews = [
    {
        id: 1,
        user: "Maria Pop",
        rating: 5,
        date: "2024-12-01",
        comment: "Produse foarte gustoase și proaspete! Recomand cu drag.",
    },
    {
        id: 2,
        user: "Ionel David",
        rating: 4,
        date: "2024-11-20",
        comment: "Mere bune, dar câteva erau mai mici. Per total ok!",
    },
    {
        id: 3,
        user: "Andreea C.",
        rating: 5,
        date: "2024-10-14",
        comment: "Calitate excelentă și livrare rapidă. Producător de încredere!",
    },
];

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { addItem } = useCart();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            const res = await produseApi.getById(parseInt(id));
            setProduct(res.data);
        };
        load();
    }, [id]);

    if (!product) return <Typography>{textResources.productDetailsPage.loadingText}</Typography>;

    return (
        <Box
            sx={{
                width: "100%",
                maxWidth: "1200px",
                mx: "auto",
                px: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                py: { xs: "1.5rem", md: "3rem" },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                    alignItems: { xs: "center", md: "flex-start" },
                }}
            >
                {/* IMAGINEA */}
                <Box
                    component="img"
                    src={product.image}
                    sx={{
                        width: { xs: "100%", sm: "80%", md: "420px" },
                        borderRadius: "1rem",
                        objectFit: "cover",
                        boxShadow: "0 0 18px rgba(0,0,0,0.25)",
                    }}
                />

                {/* DETALII */}
                <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: { xs: 1, md: 2 },
                            fontSize: { xs: "1.8rem", sm: "2rem" },
                        }}
                    >
                        {product.produsName}
                    </Typography>

                    <Typography sx={{ opacity: 0.8, mb: 2 }}>
                        {product.categorie} • {product.unitate_masura}
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            color: colors.lightGreen2,
                            fontWeight: 600,
                            mb: { xs: 2, md: 3 },
                            fontSize: { xs: "1.8rem", sm: "2rem" },
                        }}
                    >
                        {product.pret} lei
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Producător: <b>{product.producatorName}</b>
                    </Typography>

                    {product.descriere && (
                        <Typography
                            sx={{
                                opacity: 0.9,
                                lineHeight: "1.6",
                                mb: { xs: 3, md: 4 },
                                fontSize: { xs: "0.9rem", sm: "1rem" },
                            }}
                        >
                            {product.descriere}
                        </Typography>
                    )}

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: colors.lightGreen2,
                            color: colors.darkGreen1,
                            fontWeight: 600,
                            px: { xs: 3, md: 4 },
                            py: 1.2,
                            fontSize: "1rem",
                            textTransform: "none",
                            borderRadius: "0.7rem",
                            "&:hover": {
                                backgroundColor: colors.lightGreen1,
                            },
                        }}
                        onClick={() =>
                            addItem({
                                id: product.id.toString(),
                                title: product.produsName,
                                price: product.pret,
                                image: product.produsImagine ?? "/images/default.jpg",
                                quantity: 1,
                            })
                        }
                    >
                        {textResources.productDetailsPage.addToCartButton}
                    </Button>
                </Box>
            </Box>
            {/* SECTION: REVIEWS */}
            <Box sx={{ mt: "4rem", maxWidth: "1200px", mx: "auto", px: "1rem" }}>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, mb: "1.5rem", textAlign: { xs: "center", md: "left" } }}
                >
                    {textResources.productDetailsPage.reviewsTile}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {reviews.map((r) => (
                        <Box
                            key={r.id}
                            sx={{
                                backgroundColor: colors.darkGreen2,
                                padding: "1.5rem",
                                borderRadius: "0.8rem",
                                border: `1px solid ${colors.lightGreen1Transparent}`,
                            }}
                        >
                            {/* HEADER: user + rating + date */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    justifyContent: "space-between",
                                    alignItems: { xs: "flex-start", sm: "center" },
                                    mb: "0.8rem",
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {r.user}
                                </Typography>

                                <Typography sx={{ opacity: 0.7, fontSize: "0.9rem" }}>
                                    {new Date(r.date).toLocaleDateString("ro-RO")}
                                </Typography>
                            </Box>

                            {/* RATING */}
                            <Box sx={{ mb: "0.8rem" }}>
                                {"★".repeat(r.rating)}
                                {"☆".repeat(5 - r.rating)}
                            </Box>

                            {/* COMMENT */}
                            <Typography sx={{ lineHeight: 1.6 }}>{r.comment}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

        </Box>



    );
};

export default ProductDetailsPage;
