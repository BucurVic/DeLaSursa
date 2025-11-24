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
                    src="data:image/jpeg;base64,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"
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
