import Typography from "@mui/material/Typography";
import {colors, textResources} from "../theme";
import SearchBarProducts from "../components/SearchBarProducts.tsx";
import Card from "@mui/material/Card";
import {useMemo, useState} from "react";
import {Box, CardMedia, IconButton, type SelectChangeEvent} from "@mui/material";
import Dropdown from "../components/Dropdown.tsx";
import CheckBox from "../components/CheckBox.tsx";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import FilterChip from "../components/FilterChip.tsx";
import ListViewUserProductCard from "../components/ListViewUserProductCard.tsx";
import GridViewUserProductCard from "../components/GridViewUserProductCard.tsx";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";


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
    image?: string;
};
const demoProducts: Product[] = [
    {
        id: "1",
        name: "Mazăre proaspătă",
        category: "Legume",
        region: "Bihor",
        price: 120,
        rating: 4,
        available: true,
        bio: false,
        isNew: true,
        onSale: false,
        image: "/images/pea.jpg",
    },
    {
        id: "2",
        name: "Mere Ionatan",
        category: "Fructe",
        region: "Cluj",
        price: 80,
        rating: 5,
        available: true,
        bio: true,
        isNew: false,
        onSale: true,
        image: "/images/mere_ionatan.jpg",
    },
    {
        id: "3",
        name: "Brânză de oi",
        category: "Lactate",
        region: "Sălaj",
        price: 130,
        rating: 3,
        available: false,
        bio: true,
        isNew: false,
        onSale: false,
        image: "/images/cheese.jpg",
    },
    {
        id: "4",
        name: "Carne de vită",
        category: "Carne",
        region: "Cluj",
        price: 200,
        rating: 5,
        available: true,
        bio: false,
        isNew: true,
        onSale: true,
        image: "/images/meat.jpg",
    },
    {
        id: "5",
        name: "Castraveți murați",
        category: "Legume",
        region: "Sălaj",
        price: 60,
        rating: 4,
        available: true,
        bio: false,
        isNew: false,
        onSale: true,
        image: "/images/muraturi.jpg",
    },
    {
        id: "6",
        name: "Lapte proaspăt",
        category: "Lactate",
        region: "Bihor",
        price: 50,
        rating: 5,
        available: true,
        bio: true,
        isNew: true,
        onSale: false,
        image: "/images/milk.jpg",
    },
    {
        id: "7",
        name: "Ouă de țară",
        category: "Lactate",
        region: "Cluj",
        price: 40,
        rating: 4,
        available: true,
        bio: true,
        isNew: false,
        onSale: false,
        image: "/images/eggs.jpg",
    },
    {
        id: "8",
        name: "Roșii cherry",
        category: "Legume",
        region: "Bihor",
        price: 90,
        rating: 5,
        available: true,
        bio: true,
        isNew: true,
        onSale: false,
        image: "/images/tomatoes.jpg",
    },
    {
        id: "9",
        name: "Cireșe dulci",
        category: "Fructe",
        region: "Sălaj",
        price: 150,
        rating: 5,
        available: true,
        bio: false,
        isNew: true,
        onSale: false,
        image: "/images/cherries.jpg",
    },
    {
        id: "10",
        name: "Cașcaval afumat",
        category: "Lactate",
        region: "Cluj",
        price: 110,
        rating: 4,
        available: true,
        bio: false,
        isNew: false,
        onSale: true,
        image: "/images/cheese2.jpg",
    },
];


const categoriesOptions = [
    { value: "", label: "-" },
    { value: "Legume", label: "Legume" },
    { value: "Fructe", label: "Fructe" },
    { value: "Carne", label: "Carne" },
    { value: "Lactate", label: "Lactate" },
];

const regionsOptions = [
    { value: "", label: "-" },
    { value: "Bihor", label: "Bihor" },
    { value: "Cluj", label: "Cluj" },
    { value: "Sălaj", label: "Sălaj" },
];

const pricesOptions = [
    { value: "", label: "-" },
    { value: "50", label: "50" },
    { value: "80", label: "80" },
    { value: "100", label: "100" },
    { value: "120", label: "120" },
    { value: "130", label: "130" },
    { value: "150", label: "150" },
    { value: "200", label: "200" },
];

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
    const [selectedCategory, setSelectedCategory]=useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedMinPrice, setSelectedMinPrice] = useState("");
    const [selectedMaxPrice, setSelectedMaxPrice] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [selectedSort, setSelectedSort] = useState("");

    const [availableOnly, setAvailableOnly] = useState(false);
    const [bioOnly, setBioOnly] = useState(false);
    const [newOnly, setNewOnly] = useState(false);
    const [saleOnly, setSaleOnly] = useState(false);


    const [viewType, setViewType] = useState<"grid" | "list">("grid"); // state pentru toggle

    const handleDropdownChange = (label: string,event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        if (label === textResources.products.filters.category){
            setSelectedCategory(value);
        }
        else if (label === textResources.products.filters.region){
            setSelectedRegion(value);
        }
        else if (label === textResources.products.filters.minimumPrice){
            setSelectedMinPrice(value);
        }
        else if (label === textResources.products.filters.maximumPrice){
            setSelectedMaxPrice(value);
        }
        else if (label === textResources.products.filters.rating){
            setSelectedRating(value);
        }
        else if (label === textResources.products.filters.sort){
            setSelectedSort(value);
        }
    };

    const activeFilters = useMemo(() => {
        const list: { label: string; onRemove: () => void }[] = [];
        if (selectedCategory) {
            list.push({
                label: `${selectedCategory}`,
                onRemove: () => setSelectedCategory(""),
            });
        }
        if (selectedRegion) {
            list.push({
                label: `${selectedRegion}`,
                onRemove: () => setSelectedRegion(""),
            });
        }
        if (selectedMinPrice) {
            list.push({
                label: `${selectedMinPrice}`,
                onRemove: () => setSelectedMinPrice(""),
            });
        }
        if (selectedMaxPrice) {
            list.push({
                label: `${selectedMaxPrice}`,
                onRemove: () => setSelectedMaxPrice(""),
            });
        }
        if (selectedRating) {
            list.push({
                label: `${selectedRating}+`,
                onRemove: () => setSelectedRating(""),
            });
        }
        return list;
    },[
        selectedCategory,
        selectedRegion,
        selectedMinPrice,
        selectedMaxPrice,
        selectedRating,
        selectedSort,
    ]);

    const handleCheckboxChange = (label: string, checked: boolean) => {
        if (label === textResources.products.checks.available)
            setAvailableOnly(checked);
        else if (label === textResources.products.checks.bio)
            setBioOnly(checked);
        else if (label === textResources.products.checks.new)
            setNewOnly(checked);
        else if (label === textResources.products.checks.sale)
            setSaleOnly(checked);
    };

    const filteredProducts = useMemo(() => {
        let result = demoProducts.slice();

        if (search.trim() !== "") {
            const q = search.toLowerCase();
            result = result.filter((p) => p.name.toLowerCase().includes(q));
        }

        if (selectedCategory) {
            result = result.filter((p) => p.category === selectedCategory);
        }

        if (selectedRegion) {
            result = result.filter((p) => p.region === selectedRegion);
        }

        const min = selectedMinPrice ? Number(selectedMinPrice) : NaN;
        const max = selectedMaxPrice ? Number(selectedMaxPrice) : NaN;
        if (!Number.isNaN(min)) result = result.filter((p) => p.price >= min);
        if (!Number.isNaN(max)) result = result.filter((p) => p.price <= max);

        if (selectedRating) {
            const rating = Number(selectedRating);
            if (!Number.isNaN(rating)) {
                result = result.filter((p) => Math.floor(p.rating) >= rating);
            }
        }

        if (availableOnly) result = result.filter((p) => p.available);
        if (bioOnly) result = result.filter((p) => p.bio);
        if (newOnly) result = result.filter((p) => p.isNew);
        if (saleOnly) result = result.filter((p) => p.onSale);

        switch (selectedSort) {
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "rating-desc":
                result.sort((a, b) => b.rating - a.rating);
                break;
            case "rating-asc":
                result.sort((a, b) => a.rating - b.rating);
                break;
            case "name-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        return result;
    }, [
        search,
        selectedCategory,
        selectedRegion,
        selectedMinPrice,
        selectedMaxPrice,
        selectedRating,
        selectedSort,
        availableOnly,
        bioOnly,
        newOnly,
        saleOnly,
    ]);

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
                    <SearchBarProducts value={search} onChange={setSearch} />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap:2,
                        width: "100%",
                        maxWidth: "1120px",
                        mx: "auto",
                        flexWrap: { xs: "wrap", md: "nowrap" },
                    }}
                >
                    <Dropdown
                        label={textResources.products.filters.category}
                        value={selectedCategory}
                        options={categoriesOptions}
                        onChange={(value) =>
                            handleDropdownChange(textResources.products.filters.category, value)
                        }
                        sx={{ flex: { xs: "1 1 45%", md: "1 1 auto" } }}

                    />
                    <Dropdown
                        label={textResources.products.filters.region}
                        value={selectedRegion}
                        options={regionsOptions}
                        onChange={(value) =>
                            handleDropdownChange(textResources.products.filters.region, value)
                        }
                        sx={{ flex: { xs: "1 1 45%", md: "1 1 auto" } }}
                    />
                    <Dropdown
                        label={textResources.products.filters.minimumPrice}
                        value={selectedMinPrice}
                        options={pricesOptions}
                        onChange={(value) =>
                            handleDropdownChange(
                                textResources.products.filters.minimumPrice,
                                value
                            )
                        }
                        sx={{ flex: { xs: "1 1 45%", md: "1 1 auto" } }}
                    />
                    <Dropdown
                        label={textResources.products.filters.maximumPrice}
                        value={selectedMaxPrice}
                        options={pricesOptions}
                        onChange={(value) =>
                            handleDropdownChange(
                                textResources.products.filters.maximumPrice,
                                value
                            )
                        }
                        sx={{ flex: { xs: "1 1 45%", md: "1 1 auto" } }}
                    />
                    <Dropdown
                        label={textResources.products.filters.rating}
                        value={selectedRating}
                        options={ratingsOptions}
                        onChange={(value) =>
                            handleDropdownChange(textResources.products.filters.rating, value)
                        }
                        sx={{ flex: { xs: "1 1 45%", md: "1 1 auto" } }}
                    />
                    <Dropdown
                        label={textResources.products.filters.sort}
                        value={selectedSort}
                        options={sortOptions}
                        onChange={(value) =>
                            handleDropdownChange(textResources.products.filters.sort, value)
                        }
                        sx={{ flex: { xs: "1 1 45%", md: "1 1 auto" } }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap:2
                    }}
                >
                    <CheckBox
                        text={textResources.products.checks.available}
                        onChange={(checked) =>
                            handleCheckboxChange(textResources.products.checks.available, checked)
                        }
                    />
                    <CheckBox
                        text={textResources.products.checks.bio}
                        onChange={(checked) =>
                            handleCheckboxChange(textResources.products.checks.bio, checked)
                        }
                    />
                    <CheckBox
                        text={textResources.products.checks.new}
                        onChange={(checked) =>
                            handleCheckboxChange(textResources.products.checks.new, checked)
                        }
                    />
                    <CheckBox
                        text={textResources.products.checks.sale}
                        onChange={(checked) =>
                            handleCheckboxChange(textResources.products.checks.sale, checked)
                        }
                    />
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
                    <Typography variant="h6" sx={{ mr: 1 }}>
                        {textResources.products.activeFiltersLabel}
                    </Typography>
                    {activeFilters.map((af) => (
                        <FilterChip label={af.label} onRemove={af.onRemove} />
                    ))}
                    <Button
                        size="small"
                        onClick={() => {
                            setSearch("");
                            setSelectedCategory("");
                            setSelectedRegion("");
                            setSelectedMinPrice("");
                            setSelectedMaxPrice("");
                            setSelectedRating("");
                            setSelectedSort("");
                            setAvailableOnly(false);
                            setBioOnly(false);
                            setNewOnly(false);
                            setSaleOnly(false);
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

                <Box  sx={{
                mt: 4,
                px: 2,
                maxWidth: "1160px",
                mx: "auto",
            }}
            >
                {filteredProducts.length === 0 ? (
                    <Typography align="center">{textResources.products.noResults}</Typography>
                ) : viewType === "grid" ? (
                    <Grid container spacing={2}>
                        {filteredProducts.map((product) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={product.id}
                            >
                                <GridViewUserProductCard
                                    image={product.image ?? "/images/default.jpg"}
                                    title={product.name}
                                    category={product.category}
                                    unit="kg"
                                    supplier="Fermier local"
                                    rating={product.rating}
                                    reviewCount={Math.floor(Math.random() * 50) + 5}
                                    price={product.price}
                                    onAddToCart={() => console.log("Adăugat în coș:", product.name)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {filteredProducts.map((product) => (
                            <Box key={product.id} sx={{ minWidth: 300, flexShrink: 0 }}>
                                <ListViewUserProductCard
                                    image={product.image ?? "/images/default.jpg"}
                                    title={product.name}
                                    category={product.category}
                                    unit="kg"
                                    supplierRegion={product.region}
                                    supplier="Fermier local"
                                    rating={product.rating}
                                    reviewCount={Math.floor(Math.random() * 50) + 5}
                                    price={product.price}
                                    onAddToCart={() => console.log("Adăugat în coș:", product.name)}
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
                    {demoProducts
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 4)
                        .map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={`rec-${product.id}`}>
                                <GridViewUserProductCard
                                    image={product.image ?? "/images/default.jpg"}
                                    title={product.name}
                                    category={product.category}
                                    unit="kg"
                                    supplier="Fermier local"
                                    rating={product.rating}
                                    reviewCount={Math.floor(Math.random() * 100)}
                                    price={product.price}
                                    onAddToCart={() => console.log("Recomandat:", product.name)}
                                />
                            </Grid>
                        ))}
                </Grid>
            </Box>


        </>
    );
}