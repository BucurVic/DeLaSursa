import React, { useMemo, useState } from "react";
import {
    Box,
    Card,
    Typography,
    IconButton,
    Grid,
    Button,
    Select,
    MenuItem,
    Stack,
    type SelectChangeEvent
} from "@mui/material";
import SearchBar from "../components/SearchBar";
import FilterChip from "../components/FilterChip";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { colors } from "../theme";

import { useCart } from "../context/CartContext";
import SubscriptionBundleCard from "../components/SunscriptionBundleCard.tsx";

interface BundleItem {
    name: string;
    quantity: string;
}

interface BundleData {
    id: string;
    title: string;
    price: number;
    currency: string;
    frequency: string;
    image: string;
    items: BundleItem[];
    producer: string;
}

// --- 2. STILURI ---
const filterInputStyles = {
    backgroundColor: colors.darkGreen1,
    color: colors.white1,
    borderRadius: "1rem",
    border: `1px solid ${colors.lightGreen1Transparent}`,
    fontSize: "1rem",
    "& .MuiSelect-select": {
        padding: "0.75rem 1rem",
        display: 'flex',
        alignItems: 'center',
        minHeight: "1.5rem",
    },
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "&:hover": { border: `1px solid ${colors.lightGreen1}` },
    "&.Mui-focused": { border: `1px solid ${colors.lightGreen1}` },
    "& .MuiSvgIcon-root": { color: colors.lightGreen1, right: "0.5rem" }
};

const labelStyles = {
    color: colors.white2,
    mb: "0.5rem",
    fontSize: "1rem",
    fontWeight: 500,
    textAlign: "left",
    ml: 1
};

// --- 3. DATE MOCK ---
const mockBundles: BundleData[] = [
    {
        id: "101", // Sfat: Folosește ID-uri unice (diferite de produse) pt a nu le încurca în coș
        title: "Coșul Vitaminizant",
        price: 120,
        currency: "RON",
        frequency: "Săptămânal",
        producer: "Ferma Verde",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800",
        items: [
            { name: "Cartofi albi", quantity: "2 kg" },
            { name: "Roșii", quantity: "1 kg" },
            { name: "Castraveți", quantity: "1 kg" },
            { name: "Ceapă verde", quantity: "2 leg" },
        ]
    },
    {
        id: "102",
        title: "Pachet Mic Dejun",
        price: 85,
        currency: "RON",
        frequency: "Săptămânal",
        producer: "Lactate Tradiționale",
        image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800",
        items: [
            { name: "Ouă de țară", quantity: "10 buc" },
            { name: "Lapte", quantity: "2 L" },
            { name: "Unt de casă", quantity: "200 g" },
        ]
    },
    {
        id: "103",
        title: "Mix Conservărie",
        price: 200,
        currency: "RON",
        frequency: "Lunar",
        producer: "Bunătăți din Cămară",
        image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=800",
        items: [
            { name: "Zacuscă", quantity: "2 borcane" },
            { name: "Dulceață", quantity: "1 borcan" },
            { name: "Murături", quantity: "1 borcan" },
        ]
    },
    {
        id: "104",
        title: "Pachet Grill & BBQ",
        price: 350,
        currency: "RON",
        frequency: "Ocazional",
        producer: "Carmangeria Veche",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
        items: [
            { name: "Ceafă porc", quantity: "1 kg" },
            { name: "Mici", quantity: "20 buc" },
            { name: "Cârnați", quantity: "1 kg" },
        ]
    },
    {
        id: "105",
        title: "Fructe de Sezon",
        price: 90,
        currency: "RON",
        frequency: "Săptămânal",
        producer: "Livada Soarelui",
        image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800",
        items: [
            { name: "Mere", quantity: "2 kg" },
            { name: "Pere", quantity: "1 kg" },
            { name: "Struguri", quantity: "1 kg" },
        ]
    }
];

// --- GENERARE OPȚIUNI (DROPDOWNS) ---
const uniqueProducers = Array.from(new Set(mockBundles.map(b => b.producer))).map(p => ({
    value: p,
    label: p
}));
const producerOptions = [{ value: "", label: "-" }, ...uniqueProducers];

// Opțiuni Preț Generate
const maxBundlePrice = Math.max(...mockBundles.map(b => b.price));
const priceStep = 50;
const generatedPriceOptions = [{ value: "", label: "-" }];
for (let i = 0; i <= maxBundlePrice + priceStep; i += priceStep) {
    generatedPriceOptions.push({ value: String(i), label: `${i} RON` });
}

const frequencyOptions = [
    { value: "", label: "-" },
    { value: "Săptămânal", label: "Săptămânal" },
    { value: "Lunar", label: "Lunar" },
    { value: "Ocazional", label: "Ocazional" }
];

const sortOptions = [
    { value: "", label: "-" },
    { value: "price-asc", label: "Preț Crescător" },
    { value: "price-desc", label: "Preț Descrescător" },
    { value: "name-asc", label: "Nume A→Z" },
    { value: "name-desc", label: "Nume Z→A" }
];

// --- 4. COMPONENTA HELPER (FilterSelect) ---
interface FilterSelectProps {
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (event: SelectChangeEvent<string>) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, options, onChange }) => (
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
                            "&.Mui-selected": { bgcolor: colors.darkGreen1, "&:hover": { bgcolor: colors.lightGreen1Transparent } }
                        }
                    }
                }
            }}
        >
            {options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                    {opt.label === "-" ? <span style={{ opacity: 0.5 }}>-</span> : opt.label}
                </MenuItem>
            ))}
        </Select>
    </Box>
);

export default function SubscriptionPage() {
    const { addItem } = useCart();

    const [search, setSearch] = useState("");
    const [selectedProducer, setSelectedProducer] = useState("");
    const [selectedMinPrice, setSelectedMinPrice] = useState("");
    const [selectedMaxPrice, setSelectedMaxPrice] = useState("");
    const [selectedFrequency, setSelectedFrequency] = useState("");
    const [selectedSort, setSelectedSort] = useState("");

    const [viewType, setViewType] = useState<"grid" | "list">("grid");

    const handleSubscribe = (id: string) => {
        // Găsim pachetul complet bazat pe ID
        const bundleToAdd = mockBundles.find(b => b.id === id);

        if (bundleToAdd) {
            addItem({
                id: Number(bundleToAdd.id), // Convertim la number dacă CartContext cere number
                title: bundleToAdd.title,
                price: bundleToAdd.price,
                image: bundleToAdd.image,
                quantity: 1,
                // Opțional, poți adăuga frecvența în titlu sau ca proprietate extra dacă suportă coșul
                // description: `Abonament ${bundleToAdd.frequency}`
            });
            console.log(`Adăugat în coș: ${bundleToAdd.title}`);
        }
    };

    const handleDropdownChange = (label: string, event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        if (label === "Frecvență") setSelectedFrequency(value);
        else if (label === "Sortare") setSelectedSort(value);
        else if (label === "Producător") setSelectedProducer(value);
        else if (label === "Preț Min") setSelectedMinPrice(value);
        else if (label === "Preț Max") setSelectedMaxPrice(value);
    };

    // Filtre Active (Chips)
    const activeFilters = useMemo(() => {
        const list: { label: string; onRemove: () => void }[] = [];

        if (selectedProducer) {
            list.push({ label: selectedProducer, onRemove: () => setSelectedProducer("") });
        }
        if (selectedFrequency) {
            list.push({ label: selectedFrequency, onRemove: () => setSelectedFrequency("") });
        }
        if (selectedMinPrice) {
            list.push({ label: `Min: ${selectedMinPrice} RON`, onRemove: () => setSelectedMinPrice("") });
        }
        if (selectedMaxPrice) {
            list.push({ label: `Max: ${selectedMaxPrice} RON`, onRemove: () => setSelectedMaxPrice("") });
        }

        return list;
    }, [selectedProducer, selectedFrequency, selectedMinPrice, selectedMaxPrice]);

    // Logica de Filtrare
    const filteredBundles = useMemo(() => {
        let result = [...mockBundles];

        // 1. Căutare
        if (search.trim() !== "") {
            const q = search.toLowerCase();
            result = result.filter((b) => b.title.toLowerCase().includes(q));
        }

        // 2. Producător
        if (selectedProducer) {
            result = result.filter((b) => b.producer === selectedProducer);
        }

        // 3. Frecvență
        if (selectedFrequency) {
            result = result.filter((b) => b.frequency === selectedFrequency);
        }

        // 4. Preț
        if (selectedMinPrice) {
            result = result.filter(b => b.price >= Number(selectedMinPrice));
        }
        if (selectedMaxPrice) {
            result = result.filter(b => b.price <= Number(selectedMaxPrice));
        }

        // 5. Sortare
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
            default:
                break;
        }

        return result;
    }, [search, selectedProducer, selectedFrequency, selectedMinPrice, selectedMaxPrice, selectedSort]);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: colors.darkGreen2 }}>

            {/* Header */}
            <Typography variant="h2" align="center" pt={5} pb={2} sx={{ color: colors.white1 }}>
                Abonamente & Pachete
            </Typography>
            <Typography variant="h6" align="center" pb={5} sx={{ color: colors.white2 }}>
                Descoperă coșuri cu produse proaspete, livrate recurent.
            </Typography>

            {/* --- ZONA FILTRE --- */}
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
                        border: `1px solid ${colors.lightGreen1Transparent}`
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        }}
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
                            flexWrap: "wrap"
                        }}
                    >
                        <FilterSelect
                            label="Frecvență"
                            value={selectedFrequency}
                            options={frequencyOptions}
                            onChange={(e) => handleDropdownChange("Frecvență", e)}
                        />
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

                {/* --- CONTROLS BAR (Active Filters + View Toggle) --- */}
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
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                        {activeFilters.length > 0 && (
                            <Box sx={{ mt: 2, px: 2, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
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
                                        setSelectedFrequency("");
                                        setSelectedMinPrice("");
                                        setSelectedMaxPrice("");
                                        setSelectedSort("");
                                    }}
                                    sx={{ color: colors.lightGreen1 }}
                                >
                                    Șterge tot
                                </Button>
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton
                            onClick={() => setViewType("grid")}
                            sx={{
                                bgcolor: viewType === "grid" ? colors.lightGreen1 : "transparent",
                                color: viewType === "grid" ? colors.darkGreen2 : colors.white2,
                                borderRadius: "0.5rem",
                                "&:hover": { bgcolor: colors.lightGreen1, color: colors.darkGreen2 },
                            }}
                        >
                            <GridViewIcon />
                        </IconButton>

                        <IconButton
                            onClick={() => setViewType("list")}
                            sx={{
                                bgcolor: viewType === "list" ? colors.lightGreen1 : "transparent",
                                color: viewType === "list" ? colors.darkGreen2 : colors.white2,
                                borderRadius: "0.5rem",
                                "&:hover": { bgcolor: colors.lightGreen1, color: colors.darkGreen2 },
                            }}
                        >
                            <ViewListIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* --- RESULTS AREA --- */}
                <Box sx={{ mt: 4, mb: 8 }}>
                    {filteredBundles.length === 0 ? (
                        <Typography align="center" sx={{ color: colors.white2, mt: 4 }}>
                            Nu am găsit pachete care să corespundă criteriilor.
                        </Typography>
                    ) : viewType === "grid" ? (
                        // Grid View
                        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
                            {filteredBundles.map((bundle) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={bundle.id}
                                    sx={{ display: 'flex', justifyContent: 'center' }}
                                >
                                    <SubscriptionBundleCard
                                        {...bundle}
                                        onSubscribe={handleSubscribe}
                                        viewMode="grid"
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        // List View
                        <Stack spacing={3} alignItems="center">
                            {filteredBundles.map((bundle) => (
                                <Box key={bundle.id} sx={{ width: '100%', maxWidth: '900px' }}>
                                    <SubscriptionBundleCard
                                        {...bundle}
                                        onSubscribe={handleSubscribe}
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