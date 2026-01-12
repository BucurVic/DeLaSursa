import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import SearchBar from "../components/SearchBar";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { colors } from "../theme";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext.tsx";
import { jwtDecode } from "jwt-decode";
import type { DecodedJwt } from "../common/utils.ts";

import { type PachetDTO, pacheteApi } from "../api/pacheteApi";
import BundleCard from "../components/BundleCard.tsx";
import type { BundleData } from "../types/BundleData.ts";

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

const filterInputStyles = {
  backgroundColor: colors.darkGreen1,
  color: colors.white1,
  borderRadius: "1rem",
  border: `1px solid ${colors.lightGreen1Transparent}`,
  fontSize: "1rem",
  "& .MuiSelect-select": { padding: "0.75rem 1rem", minHeight: "1.5rem" },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "&:hover": { border: `1px solid ${colors.lightGreen1}` },
  "&.Mui-focused": { border: `1px solid ${colors.lightGreen1}` },
  "& .MuiSvgIcon-root": { color: colors.lightGreen1, right: "0.5rem" },
};

const labelStyles = {
  color: colors.white2,
  mb: "0.5rem",
  fontSize: "1rem",
  ml: 1,
};

const sortOptions = [
  { value: "", label: "-" },
  { value: "price-asc", label: "Preț Crescător" },
  { value: "price-desc", label: "Preț Descrescător" },
  { value: "name-asc", label: "Nume A→Z" },
  { value: "name-desc", label: "Nume Z→A" },
];

interface FilterSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (event: SelectChangeEvent<string>) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  options,
  onChange,
}) => (
  <Box sx={{ flex: { xs: "1 1 45%", md: "1 1 auto" }, minWidth: 150 }}>
    <Typography sx={labelStyles}>{label}</Typography>
    <Select
      fullWidth
      value={value}
      onChange={onChange}
      displayEmpty
      sx={filterInputStyles}
      MenuProps={{
        PaperProps: {
          sx: {
            bgcolor: colors.darkGreen2,
            color: colors.white1,
            borderRadius: "1rem",
            mt: 1,
            "& .MuiMenuItem-root": {
              "&:hover": { bgcolor: colors.lightGreen1Transparent },
              "&.Mui-selected": {
                bgcolor: colors.darkGreen1,
                "&:hover": { bgcolor: colors.lightGreen1Transparent },
              },
            },
          },
        },
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt.value}>
          {opt.label === "-" ? (
            <span style={{ opacity: 0.5 }}>-</span>
          ) : (
            opt.label
          )}
        </MenuItem>
      ))}
    </Select>
  </Box>
);

export default function ProducerBundlesPage() {
  const { addItem } = useCart();
  const { token } = useContext(AuthContext);

  const [bundles, setBundles] = useState<BundleData[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedMinPrice, setSelectedMinPrice] = useState("");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const producerId = token ? Number(jwtDecode<DecodedJwt>(token).id) : null;

  useEffect(() => {
    const fetchBundles = async () => {
      if (!producerId) return;
      try {
        setLoading(true);
        // Dacă backend are endpoint getByProducer:
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

  const handleBuyBundle = (id: string) => {
    const bundle = bundles.find((b) => b.id === id);
    if (bundle) {
      addItem({
        id: bundle.id,
        title: bundle.title,
        price: bundle.price,
        image: bundle.image,
        quantity: 1,
      });
    }
  };

  const filteredBundles = useMemo(() => {
    let result = [...bundles];
    if (search.trim())
      result = result.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase()),
      );
    if (selectedMinPrice)
      result = result.filter((b) => b.price >= Number(selectedMinPrice));
    if (selectedMaxPrice)
      result = result.filter((b) => b.price <= Number(selectedMaxPrice));

    switch (selectedSort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [bundles, search, selectedMinPrice, selectedMaxPrice, selectedSort]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: colors.darkGreen2 }}>
      <Typography
        variant="h2"
        align="center"
        pt={5}
        pb={2}
        sx={{ color: colors.white1 }}
      >
        Pachetele mele
      </Typography>
      <Typography
        variant="h6"
        align="center"
        pb={5}
        sx={{ color: colors.white2 }}
      >
        Vezi și gestionează toate pachetele pe care le-ai creat.
      </Typography>

      {/* Search + filtre */}
      <Box sx={{ maxWidth: "1400px", mx: "auto", px: 2 }}>
        <Card
          sx={{
            width: "100%",
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            bgcolor: colors.darkGreen2,
            border: `1px solid ${colors.lightGreen1Transparent}`,
          }}
        >
          <SearchBar
            placeholder="Caută pachete..."
            value={search}
            onChange={setSearch}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <FilterSelect
              label="Preț Min"
              value={selectedMinPrice}
              options={[
                {
                  value: "",
                  label: "-",
                },
                ...Array.from({ length: 20 }, (_, i) => ({
                  value: String(i * 10),
                  label: `${i * 10} RON`,
                })),
              ]}
              onChange={(e) => setSelectedMinPrice(e.target.value)}
            />
            <FilterSelect
              label="Preț Max"
              value={selectedMaxPrice}
              options={[
                {
                  value: "",
                  label: "-",
                },
                ...Array.from({ length: 20 }, (_, i) => ({
                  value: String(i * 10),
                  label: `${i * 10} RON`,
                })),
              ]}
              onChange={(e) => setSelectedMaxPrice(e.target.value)}
            />
            <FilterSelect
              label="Sortare"
              value={selectedSort}
              options={sortOptions}
              onChange={(e) => setSelectedSort(e.target.value)}
            />
          </Box>
        </Card>

        <Box
          sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <IconButton
            onClick={() => setViewType("grid")}
            sx={{
              bgcolor: viewType === "grid" ? colors.lightGreen1 : "transparent",
              color: viewType === "grid" ? colors.darkGreen2 : colors.white2,
            }}
          >
            <GridViewIcon />
          </IconButton>
          <IconButton
            onClick={() => setViewType("list")}
            sx={{
              bgcolor: viewType === "list" ? colors.lightGreen1 : "transparent",
              color: viewType === "list" ? colors.darkGreen2 : colors.white2,
            }}
          >
            <ViewListIcon />
          </IconButton>
        </Box>

        <Box sx={{ mt: 4, mb: 8 }}>
          {loading ? (
            <Typography align="center" sx={{ color: colors.white1, mt: 4 }}>
              Se încarcă pachetele...
            </Typography>
          ) : filteredBundles.length === 0 ? (
            <Typography align="center" sx={{ color: colors.white2, mt: 4 }}>
              Nu ai pachete.
            </Typography>
          ) : viewType === "grid" ? (
            <Grid container spacing={4} justifyContent="center">
              {filteredBundles.map((bundle) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={bundle.id}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <BundleCard
                    {...bundle}
                    onAddToCart={handleBuyBundle}
                    viewMode="grid"
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Stack spacing={3} alignItems="center">
              {filteredBundles.map((bundle) => (
                <Box key={bundle.id} sx={{ width: "100%", maxWidth: "900px" }}>
                  <BundleCard
                    {...bundle}
                    onAddToCart={handleBuyBundle}
                    viewMode="list"
                  />
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
}
