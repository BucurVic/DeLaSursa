import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
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
import FilterChip from "../components/FilterChip";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { colors } from "../theme";
import { useCart } from "../context/CartContext";

// IMPORTĂM API-ul creat mai sus
import { type PachetDTO, pacheteApi } from "../api/pacheteApi";
import BundleCard from "../components/BundleCard.tsx";
import type { BundleData } from "../types/BundleData.ts";

// --- 2. MAPPER (Backend -> Frontend) ---
const mapBackendToFrontend = (pachet: PachetDTO): BundleData => {
  return {
    id: pachet.id.toString(),
    title: pachet.nume,
    price: pachet.pretTotal,
    currency: "RON",
    producer: pachet.producatorNume || "Producător Local",
    image: pachet.imagine
      ? pachet.imagine
      : "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
    items: pachet.produse
      ? pachet.produse.map((item) => ({
          name: item.numeProdus,
          quantity: `${item.cantitate} ${item.unitateMasura}`, // Ex: "2.0 kg"
        }))
      : [],
  };
};

// --- 3. STILURI ---
const filterInputStyles = {
  backgroundColor: colors.darkGreen1,
  color: colors.white1,
  borderRadius: "1rem",
  border: `1px solid ${colors.lightGreen1Transparent}`,
  fontSize: "1rem",
  "& .MuiSelect-select": {
    padding: "0.75rem 1rem",
    display: "flex",
    alignItems: "center",
    minHeight: "1.5rem",
  },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "&:hover": { border: `1px solid ${colors.lightGreen1}` },
  "&.Mui-focused": { border: `1px solid ${colors.lightGreen1}` },
  "& .MuiSvgIcon-root": { color: colors.lightGreen1, right: "0.5rem" },
};

const labelStyles = {
  color: colors.white2,
  mb: "0.5rem",
  fontSize: "1rem",
  fontWeight: 500,
  textAlign: "left",
  ml: 1,
};

const sortOptions = [
  { value: "", label: "-" },
  { value: "price-asc", label: "Preț Crescător" },
  { value: "price-desc", label: "Preț Descrescător" },
  { value: "name-asc", label: "Nume A→Z" },
  { value: "name-desc", label: "Nume Z→A" },
];

// --- COMPONENTA HELPER ---
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

// --- COMPONENTA PRINCIPALĂ ---
export default function SubscriptionPage() {
  const { addItem } = useCart();

  // State pentru date
  const [bundles, setBundles] = useState<BundleData[]>([]);
  const [loading, setLoading] = useState(true);

  // State Filtre
  const [search, setSearch] = useState("");
  const [selectedProducer, setSelectedProducer] = useState("");
  const [selectedMinPrice, setSelectedMinPrice] = useState("");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  // ✅ FETCH DATA DIN BACKEND
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Cerem datele de la server
        const response = await pacheteApi.getAll();

        // Mapăm din DTO Java în structura Frontend-ului
        const mappedData = response.data.content.map(mapBackendToFrontend);

        setBundles(mappedData);
      } catch (error) {
        console.error("Eroare la încărcarea pachetelor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handlers
  const handleBuyBundle = (id: string) => {
    const bundleToAdd = bundles.find((b) => b.id === id);
    if (bundleToAdd) {
      addItem({
        id: "bundle" + bundleToAdd.id.toString(),
        title: bundleToAdd.title,
        price: bundleToAdd.price,
        image: bundleToAdd.image,
        quantity: 1,
      });
    }
  };

  const handleDropdownChange = (
    label: string,
    event: SelectChangeEvent<string>,
  ) => {
    const value = event.target.value;
    if (label === "Sortare") setSelectedSort(value);
    else if (label === "Producător") setSelectedProducer(value);
    else if (label === "Preț Min") setSelectedMinPrice(value);
    else if (label === "Preț Max") setSelectedMaxPrice(value);
  };

  // --- CALCUL OPȚIUNI DINAMICE (Bazat pe datele încărcate) ---
  const producerOptions = useMemo(() => {
    const uniqueProducers = Array.from(
      new Set(bundles.map((b) => b.producer)),
    ).map((p) => ({
      value: p,
      label: p,
    }));
    return [{ value: "", label: "-" }, ...uniqueProducers];
  }, [bundles]);

  const generatedPriceOptions = useMemo(() => {
    if (bundles.length === 0) return [{ value: "", label: "-" }];
    const maxPrice = Math.max(...bundles.map((b) => b.price));
    const options = [{ value: "", label: "-" }];
    for (let i = 0; i <= maxPrice + 10; i += 10) {
      options.push({ value: String(i), label: `${i} RON` });
    }
    return options;
  }, [bundles]);

  // --- FILTRARE CLIENT-SIDE ---
  // Deoarece backend-ul dat are doar 'findAll', facem filtrarea aici
  const activeFilters = useMemo(() => {
    const list: { label: string; onRemove: () => void }[] = [];
    if (selectedProducer)
      list.push({
        label: selectedProducer,
        onRemove: () => setSelectedProducer(""),
      });
    if (selectedMinPrice)
      list.push({
        label: `Min: ${selectedMinPrice} RON`,
        onRemove: () => setSelectedMinPrice(""),
      });
    if (selectedMaxPrice)
      list.push({
        label: `Max: ${selectedMaxPrice} RON`,
        onRemove: () => setSelectedMaxPrice(""),
      });
    return list;
  }, [selectedProducer, selectedMinPrice, selectedMaxPrice]);

  const filteredBundles = useMemo(() => {
    let result = [...bundles];

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter((b) => b.title.toLowerCase().includes(q));
    }
    if (selectedProducer) {
      result = result.filter((b) => b.producer === selectedProducer);
    }

    if (selectedMinPrice) {
      result = result.filter((b) => b.price >= Number(selectedMinPrice));
    }
    if (selectedMaxPrice) {
      result = result.filter((b) => b.price <= Number(selectedMaxPrice));
    }

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
  }, [
    bundles,
    search,
    selectedProducer,
    selectedMinPrice,
    selectedMaxPrice,
    selectedSort,
  ]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: colors.darkGreen2 }}>
      <Typography
        variant="h2"
        align="center"
        pt={5}
        pb={2}
        sx={{ color: colors.white1 }}
      >
        Pachete pregătite de producătorii noștri
      </Typography>
      <Typography
        variant="h6"
        align="center"
        pb={5}
        sx={{ color: colors.white2 }}
      >
        Descoperă coșuri cu produse proaspete, direct de la producători, gândite
        pentru nevoile tale.
      </Typography>

      {/* ZONA FILTRE */}
      <Box sx={{ maxWidth: "1400px", mx: "auto", px: 2 }}>
        <Card
          sx={{
            width: "100%",
            p: "2rem",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            bgcolor: colors.darkGreen2,
            border: `1px solid ${colors.lightGreen1Transparent}`,
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <SearchBar
              placeholder="Caută pachete..."
              value={search}
              onChange={setSearch}
            />
          </Box>

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
              label="Producător"
              value={selectedProducer}
              options={producerOptions}
              onChange={(e) => handleDropdownChange("Producător", e)}
            />
            <FilterSelect
              label="Preț Min"
              value={selectedMinPrice}
              options={generatedPriceOptions}
              onChange={(e) => handleDropdownChange("Preț Min", e)}
            />
            <FilterSelect
              label="Preț Max"
              value={selectedMaxPrice}
              options={generatedPriceOptions}
              onChange={(e) => handleDropdownChange("Preț Max", e)}
            />
            <FilterSelect
              label="Sortare"
              value={selectedSort}
              options={sortOptions}
              onChange={(e) => handleDropdownChange("Sortare", e)}
            />
          </Box>
        </Card>

        {/* CONTROLS BAR */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            {activeFilters.length > 0 && (
              <Box
                sx={{
                  mt: 2,
                  px: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="h6" sx={{ mr: 1, color: colors.white1 }}>
                  Filtre active:
                </Typography>
                {activeFilters.map((af) => (
                  <FilterChip
                    key={af.label}
                    label={af.label}
                    onRemove={af.onRemove}
                  />
                ))}
                <Button
                  size="small"
                  onClick={() => {
                    setSearch("");
                    setSelectedProducer("");
                    setSelectedMinPrice("");
                    setSelectedMaxPrice("");
                    setSelectedSort("");
                  }}
                  sx={{ color: colors.lightGreen1 }}
                >
                  Resetează filtrele
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => setViewType("grid")}
              sx={{
                bgcolor:
                  viewType === "grid" ? colors.lightGreen1 : "transparent",
                color: viewType === "grid" ? colors.darkGreen2 : colors.white2,
                borderRadius: "0.5rem",
                "&:hover": {
                  bgcolor: colors.lightGreen1,
                  color: colors.darkGreen2,
                },
              }}
            >
              <GridViewIcon />
            </IconButton>
            <IconButton
              onClick={() => setViewType("list")}
              sx={{
                bgcolor:
                  viewType === "list" ? colors.lightGreen1 : "transparent",
                color: viewType === "list" ? colors.darkGreen2 : colors.white2,
                borderRadius: "0.5rem",
                "&:hover": {
                  bgcolor: colors.lightGreen1,
                  color: colors.darkGreen2,
                },
              }}
            >
              <ViewListIcon />
            </IconButton>
          </Box>
        </Box>

        {/* REZULTATE */}
        <Box sx={{ mt: 4, mb: 8 }}>
          {loading ? (
            <Typography align="center" sx={{ color: colors.white1, mt: 4 }}>
              Se încarcă pachetele...
            </Typography>
          ) : filteredBundles.length === 0 ? (
            <Typography align="center" sx={{ color: colors.white2, mt: 4 }}>
              Nu am găsit pachete.
            </Typography>
          ) : viewType === "grid" ? (
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="stretch"
            >
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
