import Typography from "@mui/material/Typography";
import { textResources as tr, textResources, colors } from "../theme";
import SearchBar from "../components/SearchBar.tsx";
import Card from "@mui/material/Card";
import { useEffect, useMemo, useState } from "react";
import { Box, IconButton, Select, MenuItem, type SelectChangeEvent } from "@mui/material";
import CheckBox from "../components/CheckBox.tsx";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FilterChip from "../components/FilterChip.tsx";
import ListViewUserProductCard from "../components/ListViewUserProductCard.tsx";
import GridViewUserProductCard from "../components/GridViewUserProductCard.tsx";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import type { Produs } from "../types/Produs.ts";
import { produseApi } from "../api/produseApi.ts";
import { useCart } from "../context/CartContext.tsx";

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
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    },
    "&:hover": {
        border: `1px solid ${colors.lightGreen1}`,
    },
    "&.Mui-focused": {
        border: `1px solid ${colors.lightGreen1}`,
    },
    "& .MuiSvgIcon-root": {
        color: colors.lightGreen1,
        right: "0.5rem"
    }
};

const labelStyles = {
    color: colors.white2,
    mb: "0.5rem",
    fontSize: "1rem",
    fontWeight: 500,
    textAlign: "left",
    ml: 1
};

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

type Product = {
    id: string;
    name: string;
    category: string;
    region: string;
    price: number;
    rating: number;
    available: boolean;
    bio: boolean;
    isNew: boolean;
    onSale: boolean;
    measureUnit: string;
    owner: string;
    image?: string;
};

const mapProdusToProduct = (p: Produs): Product => ({
    id: p.id.toString(),
    name: p.produsName,
    category: p.categorie,
    region: (p as any).producatorRegion || "Cluj",
    price: p.pret,
    rating: 5,
    available: true,
    bio: false,
    isNew: false,
    onSale: false,
    image: p.produsImagine ? p.produsImagine : "/images/default.jpg",
    measureUnit: p.unitate_masura,
    owner: p.producatorName
});

const ratingsOptions = [
    { value: "", label: "-" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "5", label: "5" },
];

const sortOptions = [
    { value: "", label: "-" },
    { value: "price-asc", label: "Preț ↑" },
    { value: "price-desc", label: "Preț ↓" },
    { value: "rating-desc", label: "Rating ↓" },
    { value: "rating-asc", label: "Rating ↑" },
    { value: "name-asc", label: "Nume A→Z" },
    { value: "name-desc", label: "Nume Z→A" },
];

export default function ProductsPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedMinPrice, setSelectedMinPrice] = useState("");
    const [selectedMaxPrice, setSelectedMaxPrice] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [selectedSort, setSelectedSort] = useState("");

    const [availableOnly, setAvailableOnly] = useState(false);
    const [bioOnly, setBioOnly] = useState(false);
    const [newOnly, setNewOnly] = useState(false);
    const [saleOnly, setSaleOnly] = useState(false);

    const [recomendedProducts, setRecomendedProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    const [categoriesOptions, setCategoriesOptions] = useState<{value: string, label: string}[]>([{ value: "", label: "-" }]);
    const [regionsOptions, setRegionsOptions] = useState<{value: string, label: string}[]>([{ value: "", label: "-" }]);
    const [pricesOptions, setPricesOptions] = useState<{value: string, label: string}[]>([{ value: "", label: "-" }]);

    const { addItem } = useCart();
    const [viewType, setViewType] = useState<"grid" | "list">("grid");

    useEffect(() => {
        const initPage = async () => {
            try {
                const resRec = await produseApi.getRecommended(0, 5);
                const dataRec = Array.isArray(resRec.data) ? resRec.data : resRec.data.content;
                setRecomendedProducts(dataRec.map(mapProdusToProduct));

                const resAll = await produseApi.getFiltered({ page: 0, size: 1000 });
                const allDataRaw = Array.isArray(resAll.data) ? resAll.data : resAll.data.content;

                const uniqueCategories = Array.from(new Set(allDataRaw.map((p: Produs) => p.categorie))).filter(Boolean).sort();
                setCategoriesOptions([{ value: "", label: "-" }, ...uniqueCategories.map((c: string) => ({ value: c, label: c }))]);

                const uniqueRegions = Array.from(new Set(allDataRaw.map((p: any) => p.producatorRegion || "Cluj"))).filter(Boolean).sort();
                setRegionsOptions([{ value: "", label: "-" }, ...uniqueRegions.map((r: any) => ({ value: r, label: r }))]);

                const prices = allDataRaw.map((p: Produs) => p.pret);
                if (prices.length > 0) {
                    const minP = Math.floor(Math.min(...prices));
                    const maxP = Math.ceil(Math.max(...prices));
                    const step = Math.ceil((maxP - minP) / 5) || 10;
                    const priceSteps = [];
                    for(let i = minP; i <= maxP; i += step) {
                        priceSteps.push({ value: i.toString(), label: i.toString() });
                    }
                    if (!priceSteps.find(p => p.value === maxP.toString())) {
                        priceSteps.push({ value: maxP.toString(), label: maxP.toString() });
                    }
                    setPricesOptions([{ value: "", label: "-" }, ...priceSteps]);
                }

            } catch (err) {
                console.error("Eroare init:", err);
            }
        };
        initPage();
    }, []);

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            try {
                let sortParam = "pret,asc";
                if (selectedSort === "price-desc") sortParam = "pret,desc";
                if (selectedSort === "name-asc") sortParam = "produsName,asc";
                if (selectedSort === "name-desc") sortParam = "produsName,desc";

                const params = {
                    categorie: selectedCategory || undefined,
                    regiune: selectedRegion || undefined,
                    pretMin: selectedMinPrice ? Number(selectedMinPrice) : undefined,
                    pretMax: selectedMaxPrice ? Number(selectedMaxPrice) : undefined,
                    doarDisponibile: availableOnly || undefined,
                    search: search || undefined,
                    page: 0,
                    size: 20,
                    sort: sortParam,
                };

                const res = await produseApi.getFiltered(params);
                const backendData = Array.isArray(res.data) ? res.data : res.data.content;
                let mapped = backendData.map(mapProdusToProduct);

                if (search) {
                    mapped = mapped.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
                }

                setFilteredProducts(mapped);
            } catch (err) {
                console.error("Eroare filtrare:", err);
                setFilteredProducts([]);
            }
        };

        const timeoutId = setTimeout(fetchFilteredProducts, 300);
        return () => clearTimeout(timeoutId);

    }, [search, selectedCategory, selectedRegion, selectedMinPrice, selectedMaxPrice, availableOnly, selectedSort]);

    const handleDropdownChange = (label: string, event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        if (label === textResources.products.filters.category) setSelectedCategory(value);
        else if (label === textResources.products.filters.region) setSelectedRegion(value);
        else if (label === textResources.products.filters.minimumPrice) setSelectedMinPrice(value);
        else if (label === textResources.products.filters.maximumPrice) setSelectedMaxPrice(value);
        else if (label === textResources.products.filters.rating) setSelectedRating(value);
        else if (label === textResources.products.filters.sort) setSelectedSort(value);
    };

    const handleCheckboxChange = (label: string, checked: boolean) => {
        if (label === textResources.products.checks.available) setAvailableOnly(checked);
        else if (label === textResources.products.checks.bio) setBioOnly(checked);
        else if (label === textResources.products.checks.new) setNewOnly(checked);
        else if (label === textResources.products.checks.sale) setSaleOnly(checked);
    };

    const activeFilters = useMemo(() => {
        const list: { label: string; onRemove: () => void }[] = [];
        if (selectedCategory) list.push({ label: selectedCategory, onRemove: () => setSelectedCategory("") });
        if (selectedRegion) list.push({ label: selectedRegion, onRemove: () => setSelectedRegion("") });
        if (selectedMinPrice) list.push({ label: `Min: ${selectedMinPrice}`, onRemove: () => setSelectedMinPrice("") });
        if (selectedMaxPrice) list.push({ label: `Max: ${selectedMaxPrice}`, onRemove: () => setSelectedMaxPrice("") });
        if (selectedRating) list.push({ label: `${selectedRating}+ ⭐`, onRemove: () => setSelectedRating("") });
        return list;
    }, [selectedCategory, selectedRegion, selectedMinPrice, selectedMaxPrice, selectedRating]);

    return (
        <>
            <Typography variant="h2" align="center" pt={5} pb={2}>
                {textResources.products.addText.localProducts}
            </Typography>
            <Typography variant="h6" align="center" pb={5}>
                {textResources.products.addText.discoverProducts}
            </Typography>

            <Card
                sx={{
                    width: "100%",
                    p: "2rem",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width:"100%",
                    }}
                >
                    <SearchBar placeholder={tr.searchBar.placeholderProduse} value={search} onChange={setSearch} />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        gap: 2
                    }}
                >
                    <FilterSelect
                        label={textResources.products.filters.category}
                        value={selectedCategory}
                        options={categoriesOptions}
                        onChange={(e) => handleDropdownChange(textResources.products.filters.category, e)}
                    />
                    <FilterSelect
                        label={textResources.products.filters.region}
                        value={selectedRegion}
                        options={regionsOptions}
                        onChange={(e) => handleDropdownChange(textResources.products.filters.region, e)}
                    />
                    <FilterSelect
                        label={textResources.products.filters.minimumPrice}
                        value={selectedMinPrice}
                        options={pricesOptions}
                        onChange={(e) => handleDropdownChange(textResources.products.filters.minimumPrice, e)}
                    />
                    <FilterSelect
                        label={textResources.products.filters.maximumPrice}
                        value={selectedMaxPrice}
                        options={pricesOptions}
                        onChange={(e) => handleDropdownChange(textResources.products.filters.maximumPrice, e)}
                    />
                    <FilterSelect
                        label={textResources.products.filters.rating}
                        value={selectedRating}
                        options={ratingsOptions}
                        onChange={(e) => handleDropdownChange(textResources.products.filters.rating, e)}
                    />
                    <FilterSelect
                        label={textResources.products.filters.sort}
                        value={selectedSort}
                        options={sortOptions}
                        onChange={(e) => handleDropdownChange(textResources.products.filters.sort, e)}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <CheckBox text={textResources.products.checks.available} onChange={(c) => handleCheckboxChange(textResources.products.checks.available, c)} />
                    <CheckBox text={textResources.products.checks.bio} onChange={(c) => handleCheckboxChange(textResources.products.checks.bio, c)} />
                    <CheckBox text={textResources.products.checks.new} onChange={(c) => handleCheckboxChange(textResources.products.checks.new, c)} />
                    <CheckBox text={textResources.products.checks.sale} onChange={(c) => handleCheckboxChange(textResources.products.checks.sale, c)} />
                </Box>
            </Card>

            <Box
                sx={{
                    mt: 2,
                    px: 2,
                    maxWidth: "1160px",
                    mx: "auto",
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
                            <Typography variant="h6" sx={{ mr: 1 }}>{textResources.products.activeFiltersLabel}</Typography>
                            {activeFilters.map((af) => (
                                <FilterChip key={af.label} label={af.label} onRemove={af.onRemove} />
                            ))}
                            <Button
                                size="small"
                                onClick={() => {
                                    setSearch(""); setSelectedCategory(""); setSelectedRegion("");
                                    setSelectedMinPrice(""); setSelectedMaxPrice(""); setSelectedRating("");
                                    setSelectedSort(""); setAvailableOnly(false); setBioOnly(false);
                                    setNewOnly(false); setSaleOnly(false);
                                }}
                            >
                                {textResources.products.clearAll}
                            </Button>
                        </Box>
                    )}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                        onClick={() => setViewType("grid")}
                        sx={{
                            bgcolor: viewType === "grid" ? colors.lightGreen2 : "transparent",
                            color: viewType === "grid" ? colors.darkGreen1 : colors.white2,
                            borderRadius: "0.5rem",
                            transition: "background-color 200ms, color 200ms",
                            "&:hover": { bgcolor: colors.lightGreen2, color: colors.darkGreen1 },
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <GridViewIcon />
                    </IconButton>

                    <IconButton
                        onClick={() => setViewType("list")}
                        sx={{
                            bgcolor: viewType === "list" ? colors.lightGreen2 : "transparent",
                            color: viewType === "list" ? colors.darkGreen1 : colors.white2,
                            borderRadius: "0.5rem",
                            transition: "background-color 200ms, color 200ms",
                            "&:hover": { bgcolor: colors.lightGreen2, color: colors.darkGreen1 },
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ViewListIcon />
                    </IconButton>
                </Box>
            </Box>

            <Box sx={{ mt: 4, px: 2, maxWidth: "1160px", mx: "auto" }}>
                {filteredProducts.length === 0 ? (
                    <Typography align="center">{textResources.products.noResults}</Typography>
                ) : viewType === "grid" ? (
                    <Grid container spacing={2} justifyContent="center">
                        {filteredProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                <GridViewUserProductCard
                                    productId={product.id.toString()}
                                    image={product.image ?? "/images/default.jpg"}
                                    title={product.name}
                                    category={product.category}
                                    unit={product.measureUnit}
                                    supplier={product.owner}
                                    rating={product.rating}
                                    reviewCount={12}
                                    price={product.price}
                                    onAddToCart={() => addItem({ id: Number(product.id), title: product.name, price: product.price, image: product.image, quantity: 1 })}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                        {filteredProducts.map((product) => (
                            <Box key={product.id} sx={{ minWidth: 300, flexShrink: 0 }}>
                                <ListViewUserProductCard
                                    productId={product.id.toString()}
                                    image={product.image ?? "/images/default.jpg"}
                                    title={product.name}
                                    category={product.category}
                                    unit={product.measureUnit}
                                    supplierRegion={product.region}
                                    supplier={product.owner}
                                    rating={product.rating}
                                    reviewCount={12}
                                    price={product.price}
                                    onAddToCart={() => addItem({ id: Number(product.id), title: product.name, price: product.price, image: product.image, quantity: 1 })}
                                />
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>

            <Box sx={{ mt: 8, px: 2, maxWidth: "1160px", mx: "auto" }}>
                <Typography variant="h3" align="center" sx={{ mb: 2 }}>
                    PRODUSE RECOMANDATE PENTRU TINE
                </Typography>
                <Typography variant="h5" align="center" sx={{ mb: 2 }}>
                    Selecție personalizată bazată pe preferințele tale
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {recomendedProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <GridViewUserProductCard
                                productId={product.id.toString()}
                                image={product.image ?? "/images/default.jpg"}
                                title={product.name}
                                category={product.category}
                                unit={product.measureUnit}
                                supplier={product.owner}
                                rating={product.rating}
                                reviewCount={15}
                                price={product.price}
                                onAddToCart={() => addItem({ id: Number(product.id), title: product.name, price: product.price, image: product.image, quantity: 1 })}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}