import { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { colors, textResources as tr } from "../theme";
import { AuthContext } from "../context/AuthContext.tsx";
import { jwtDecode } from "jwt-decode";
import type { DecodedJwt } from "../common/utils.ts";

import { type PachetDTO, pacheteApi } from "../api/pacheteApi";
import type { BundleData } from "../types/BundleData.ts";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal.tsx";
import ProducerBundleCard from "../components/ProducerBundleCard.tsx";

const mapBackendToFrontend = (pachet: PachetDTO): BundleData => ({
  id: pachet.id.toString(),
  title: pachet.nume,
  price: pachet.pretTotal,
  currency: "RON",
  producer: pachet.producatorNume,
  image: pachet.imagine
    ? pachet.imagine
    : "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
  items: pachet.produse
    ? pachet.produse.map((item) => ({
        name: item.numeProdus,
        quantity: `${item.cantitate} ${item.unitateMasura}`,
      }))
    : [],
});

export default function BundleProducerListPage() {
  const { token } = useContext(AuthContext);

  const [bundles, setBundles] = useState<BundleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const producerId = token ? Number(jwtDecode<DecodedJwt>(token).id) : null;

  useEffect(() => {
    const fetchBundles = async () => {
      if (!producerId) return;
      try {
        setLoading(true);
        const response = await pacheteApi.getByProducator(producerId);
        const mappedData = response.data.content.map(mapBackendToFrontend);
        setBundles(mappedData);
      } catch (error) {
        console.error("Eroare la încărcarea pachetelor producătorului:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, [producerId]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bundleToDelete, setBundleToDelete] = useState<any | null>(null);

  const handleDeleteClick = (product: any) => {
    setBundleToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!bundleToDelete) return;

    pacheteApi
      .delete(Number(bundleToDelete.id))
      .then(() => {
        setBundles((prev) => prev.filter((b) => b.id !== bundleToDelete.id));
      })
      .catch((error) => {
        console.error("Eroare la ștergerea pachetului:", error);
      })
      .finally(() => {
        setDeleteModalOpen(false);
        setBundleToDelete(null);
      });
  };

  const filteredBundles = bundles.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box
      sx={{
        backgroundColor: colors.darkGreen1,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: colors.darkGreen2,
          borderRadius: "0.8rem",
          boxShadow: "0 0 20px rgba(0,0,0,0.25)",
          px: "2rem",
          py: "2.5rem",
        }}
      >
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
        </Box>
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
          {filteredBundles.map((b) => (
            <Box
              key={b.id}
              sx={{
                flex: "1 1 calc(25% - 1.5rem)",
                maxWidth: "22rem",
                minWidth: "18rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ProducerBundleCard
                id={b.id}
                title={b.title}
                image={
                  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800"
                }
                items={b.items}
                onDelete={() => handleDeleteClick(b)}
              />
            </Box>
          ))}
        </Grid>
      </Box>

      {bundleToDelete && (
        <DeleteConfirmationModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          itemName={bundleToDelete.title}
        />
      )}
    </Box>
  );
}
