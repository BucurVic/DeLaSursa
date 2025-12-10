import React, {useEffect, useState} from "react";
import { Box, Grid, IconButton } from "@mui/material";
import { colors } from "../theme/colors.ts";
import {textResources, textResources as tr} from "../theme/textResources.ts";
import { GridViewRounded, ViewListRounded } from "@mui/icons-material";
import SearchBar from "../components/SearchBar.tsx";
import ProductCardGridView from "../components/ProductCardGridView.tsx";
import ProductCardListView from "../components/ProductCardListView.tsx";
import EditProductModal from "../components/EditProductModal.tsx";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal.tsx";
import {produseApi} from "../api/produseApi.ts";
import type {Produs} from "../types/Produs.ts";

export default function ProductListPage() {
    const [search, setSearch] = useState("");
    const [gridView, setGridView] = useState(true);

    // 📦 Lista de produse
    const [products, setProducts] = useState<Produs[]>([]);

    useEffect(() => {
        produseApi.getAllProducator()
            .then((res) => {
                console.log("Produse primite: ", res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.error("Eroare la incarcarea produselor: ", err);
            })
    }, []);

    // 🔄 Activare/dezactivare produs
    const toggleActiveStatus = (id: number) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
        );
    };

    // ✏️ Editare produs
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Produs | null>(null);

    const handleEditClick = (product: Produs) => {
        setSelectedProduct(product);
        setEditModalOpen(true);
    };

    const handleSaveEdit = (updatedData: any) => {
        if (!selectedProduct) return;
        setProducts((prev) =>
            prev.map((p) =>
                p.produsName === selectedProduct.name
                    ? {
                        ...p,
                        title: updatedData.name,
                        price: parseFloat(updatedData.price),
                    }
                    : p
            )
        );
    };

    // 🗑️ Ștergere produs
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<any | null>(null);

    const handleDeleteClick = (product: any) => {
        setProductToDelete(product);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (!productToDelete) return;
        setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
        setProductToDelete(null);
    };

    // 🔍 Filtrare produse
    const filteredProducts = products.filter((p) =>
        p.produsName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box
            sx={{
                backgroundColor: colors.darkGreen1,
                minHeight: "100vh",
            }}
        >
            {/* 🔳 Secțiune cu fundal */}
            <Box
                sx={{
                    backgroundColor: colors.darkGreen2,
                    borderRadius: "0.8rem",
                    boxShadow: "0 0 20px rgba(0,0,0,0.25)",
                    px: "2rem",
                    py: "2.5rem",
                }}
            >
                {/* 🔍 Căutare + Switch între grid/list */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                        mb: "3rem",
                    }}
                >
                    <SearchBar
                        placeholder={tr.searchBar.placeholderProduse}
                        value={search}
                        onChange={setSearch}
                        fullWidth={false}
                        backgroundColor={colors.darkGreen1}
                        sx={{ width: "41.2rem", maxWidth: "90vw" }}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            gap: "0.8rem",
                            border: `1px solid ${colors.lightGreen1Transparent}`,
                            borderRadius: "1rem",
                            p: "0.3rem",
                        }}
                    >
                        <IconButton
                            onClick={() => setGridView(true)}
                            sx={{
                                color: gridView ? colors.darkGreen2 : colors.lightGreen1,
                                backgroundColor: gridView
                                    ? colors.lightGreen1
                                    : "transparent",
                                borderRadius: "0.75rem",
                                "&:hover": {
                                    backgroundColor: colors.lightGreen1Transparent,
                                },
                            }}
                        >
                            <GridViewRounded />
                        </IconButton>
                        <IconButton
                            onClick={() => setGridView(false)}
                            sx={{
                                color: !gridView ? colors.darkGreen2 : colors.lightGreen1,
                                backgroundColor: !gridView
                                    ? colors.lightGreen1
                                    : "transparent",
                                borderRadius: "0.75rem",
                                "&:hover": {
                                    backgroundColor: colors.lightGreen1Transparent,
                                },
                            }}
                        >
                            <ViewListRounded />
                        </IconButton>
                    </Box>
                </Box>

                {/* 🧩 Afișare produse - Grid sau List View */}
                {gridView ? (
                    <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        alignItems="stretch"
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "1.5rem",
                        }}
                    >
                        {filteredProducts.map((p) => (
                            <Box
                                key={p.id}
                                sx={{
                                    flex: "1 1 calc(25% - 1.5rem)",
                                    maxWidth: "22rem",
                                    minWidth: "18rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <ProductCardGridView
                                    image={p.produsImagine}
                                    title={p.produsName}
                                    category={p.categorie}
                                    price={p.pret}
                                    unit={p.unitate_masura}
                                    active={true}
                                    onEdit={() => handleEditClick(p)}
                                    onDeactivate={() => toggleActiveStatus(p.id)}
                                    onDelete={() => handleDeleteClick(p)}
                                />
                            </Box>
                        ))}
                    </Grid>
                ) : (
                    <ProductCardListView
                        products={filteredProducts}
                        onEdit={(id) =>
                            handleEditClick(products.find((p) => p.id === id)!)
                        }
                        onDeactivate={toggleActiveStatus}
                        onDelete={(id) =>
                            handleDeleteClick(products.find((p) => p.id === id)!)
                        }
                    />
                )}
            </Box>

            {/* 🧾 Modal Edit */}
            {selectedProduct && (
                <EditProductModal
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onSave={handleSaveEdit}
                    initialData={selectedProduct}
                />
            )}

            {/* 🗑️ Modal Ștergere */}
            {productToDelete && (
                <DeleteConfirmationModal
                    open={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    itemName={productToDelete.title}
                />
            )}
        </Box>
    );
}
