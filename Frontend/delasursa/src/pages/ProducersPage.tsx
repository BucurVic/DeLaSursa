import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Card,
    Typography,
    IconButton,
    Grid,
    Button,
    type SelectChangeEvent
} from "@mui/material";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import FilterChip from "../components/FilterChip";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { colors } from "../theme/colors";
import { textResources } from "../theme/textResources"
import GridViewUserProducerCard from "../components/GridViewUserProducerCard";
import ListViewUserProducerCard from "../components/ListViewUserProducerCard";

type Producer = {
    producerId: string;
    coverImage: string;
    logo: string;
    name: string;
    location: string;
    category: string;
    rating: number;
    productCount: number;
    description: string;
};

// mock data - replace with actual API call
const mockProducers = [
    {
        producerId: '1',
        coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
        logo: 'https://farmland.org/images/2023_collins_farm_0006.jpg',
        name: 'Ferma Verde',
        location: 'Brașov, România',
        category: 'Legume & Fructe',
        rating: 4.9,
        productCount: 24,
        description: 'Fermă organică de familie cu tradiție de peste 30 de ani în cultivarea legumelor și fructelor.'
    },
    {
        producerId: '2',
        coverImage: 'https://hillfarmrealfood.co.uk/cdn/shop/files/30_eggs_1.jpg?v=1749138750&width=1445',
        logo: 'https://media.istockphoto.com/id/1325263673/photo/worker-with-eggs-in-poultry-farm.jpg?s=612x612&w=0&k=20&c=Qssh5kVe4A7G5MgB-cu1H6H5bDc-45DZElwdALe2jvU=',
        name: 'Gospodăria Avicola',
        location: 'Cluj-Napoca, România',
        category: 'Lactate & Ouă',
        rating: 5.0,
        productCount: 15,
        description: 'Ouă proaspete de la găini crescute liber în curte. Grijă și atenție pentru fiecare pasăre.'
    },
    {
        producerId: '3',
        coverImage: 'https://t4.ftcdn.net/jpg/02/21/34/43/360_F_221344370_divU4PPEj49VhfthdlnAxA3rD3TAzuZT.jpg',
        logo: 'https://media.istockphoto.com/id/1297005860/photo/raw-milk-being-poured-into-container.jpg?s=612x612&w=0&k=20&c=5Xumh49_zYs9GjLkGpZXM41tS17K8M-svN9jLMv0JpE=',
        name: 'Lactate Tradiționale',
        location: 'Sibiu, România',
        category: 'Lactate & Ouă',
        rating: 4.8,
        productCount: 32,
        description: 'Iaurt, brânză și lapte de la vaci crescute natural în zona Sibiului.'
    },
    {
        producerId: '4',
        coverImage: 'https://media.istockphoto.com/id/178850019/photo/beekeeper-lifting-a-tray-out-of-a-beehive.jpg?s=612x612&w=0&k=20&c=Zjv053d2Iec5KxpOpITUBCAqvNcapvOYu13tykkcJ58=',
        logo: 'https://images.pexels.com/photos/33260/honey-sweet-syrup-organic.jpg?cs=srgb&dl=pexels-pixabay-33260.jpg&fm=jpg',
        name: 'Apicultura Montana',
        location: 'Bucegi, România',
        category: 'Miere',
        rating: 5.0,
        productCount: 12,
        description: 'Miere pură de munte din Bucegi. Stupine plasate pentru cea mai bună calitate.'
    },
    {
        producerId: '5',
        coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
        logo: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400',
        name: 'Brutăria Artizanală',
        location: 'Timișoara, România',
        category: 'Panificație',
        rating: 4.7,
        productCount: 28,
        description: 'Pâine artizanală făcută manual. Copt proaspăt în fiecare zi.'
    },
    {
        producerId: '6',
        coverImage: 'https://www.camelactive.com/media/f5/a0/ce/1682402635/camel-active_blog-foodforest_09.jpg',
        logo: 'https://cdn.mos.cms.futurecdn.net/v2/t:150,l:0,cw:1600,ch:900,q:80,w:1600/tKQfMYzzgTpJHD2oQY8M9H.jpg',
        name: 'Cules de Munte',
        location: 'Maramureș, România',
        category: 'Fructe & Conserve',
        rating: 4.5,
        productCount: 18,
        description: 'Fructe de pădure și conserve artizanale din Maramureș. Produse naturale 100%.'
    },
    {
        producerId: '7',
        coverImage: 'https://cdn.britannica.com/17/196817-159-9E487F15/vegetables.jpg',
        logo: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?cs=srgb&dl=pexels-nc-farm-bureau-mark-2255935.jpg&fm=jpg',
        name: 'Legume de Câmpie',
        location: 'Timișoara, România',
        category: 'Legume & Fructe',
        rating: 4.6,
        productCount: 22,
        description: 'Legume proaspete cultivate în câmpiile din jurul Timișoarei, fără pesticide.'
    },
    {
        producerId: '8',
        coverImage: 'https://www.ginginbeef.com/wp-content/uploads/2024/12/is-pork-red-meat.jpg',
        logo: 'https://www.thetakeout.com/img/gallery/is-pork-considered-red-or-white-meat-its-more-complicated-than-it-should-be/l-intro-1740066453.jpg',
        name: 'Carnea Bunicii',
        location: 'Timișoara, România',
        category: 'Carne',
        rating: 4.9,
        productCount: 20,
        description: 'Carne de porc și vită de la animale crescute tradițional, hrănite natural.'
    },
    {
        producerId: '9',
        coverImage: 'https://www.lauraadamache.ro/wp-content/uploads/2013/09/poze-retete-6.jpg',
        logo: 'https://retete.unica.ro/wp-content/uploads/2025/04/dulceata-de-cirese-amare.png',
        name: 'Dulcețuri de Țară',
        location: 'Suceava, România',
        category: 'Fructe & Conserve',
        rating: 4.4,
        productCount: 16,
        description: 'Dulcețuri și gemuri făcute după rețete tradiționale, din fructe culese manual.'
    },
    {
        producerId: '10',
        coverImage: 'https://img.freepik.com/free-photo/side-view-fresh-raw-fishes-brown-wooden-cutting-board-dark-mix-colors-table-with-free-space_179666-18208.jpg?semt=ais_hybrid&w=740&q=80',
        logo: 'https://images.unsplash.com/photo-1683405503746-0fcbc47daaa7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmF3JTIwZmlzaHxlbnwwfHwwfHx8MA%3D%3D',
        name: 'Pești de Râu',
        location: 'Brașov, România',
        category: 'Carne',
        rating: 4.8,
        productCount: 14,
        description: 'Pește proaspăt din apele curate ale munților. Crescut în ferme ecologice.'
    }
];

const categoryOptions = [
    { value: "", label: "-" },
    { value: "Legume & Fructe", label: "Legume & Fructe" },
    { value: "Lactate & Ouă", label: "Lactate & Ouă" },
    { value: "Miere", label: "Miere" },
    { value: "Panificație", label: "Panificație" },
    { value: "Fructe & Conserve", label: "Fructe & Conserve" },
    { value: "Carne", label: "Carne" }
];

const regionOptions = [
    { value: "", label: "-" },
    { value: "Brașov, România", label: "Brașov, România" },
    { value: "Cluj-Napoca, România", label: "Cluj-Napoca, România" },
    { value: "Sibiu, România", label: "Sibiu, România" },
    { value: "Bucegi, România", label: "Bucegi, România" },
    { value: "Timișoara, România", label: "Timișoara, România" },
    { value: "Maramureș, România", label: "Maramureș, România" },
    { value: "Suceava, România", label: "Suceava, România" }
];

const ratingOptions = [
    { value: "", label: "-" },
    { value: "1", label: "1+" },
    { value: "2", label: "2+" },
    { value: "3", label: "3+" },
    { value: "4", label: "4+" },
    { value: "5", label: "5" }
];

const sortOptions = [
    { value: "", label: "-" },
    { value: "rating-desc", label: "Rating ↓" },
    { value: "rating-asc", label: "Rating ↑" },
    { value: "name-asc", label: "Nume A→Z" },
    { value: "name-desc", label: "Nume Z→A" }
];

export default function ProducersPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [selectedSort, setSelectedSort] = useState("");
    const [producers, setProducers] = useState<Producer[]>();
    const [viewType, setViewType] = useState<"grid" | "list">("grid");

    useEffect(() => {
        setProducers(mockProducers);
    }, []);

    const handleDropdownChange = (label: string, event: SelectChangeEvent<string>) => {
        const value = event.target.value;

        if (label === textResources.producers.filters.category) {
            setSelectedCategory(value);
        }
        else if (label === textResources.producers.filters.region) {
            setSelectedRegion(value);
        }
        else if (label === textResources.producers.filters.rating) {
            setSelectedRating(value);
        }
        else if (label === textResources.producers.filters.sort) {
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

        if (selectedRating) {
            list.push({
                label: `${selectedRating}+`,
                onRemove: () => setSelectedRating(""),
            });
        }

        return list;
    }, [
        selectedCategory,
        selectedRegion,
        selectedRating,
        selectedSort,
    ]);

    // mock filtering logic - replace with actual API call with filters
    const filteredProducers = useMemo(() => {
        let result = mockProducers.slice();

        if (search.trim() !== "") {
            const q = search.toLowerCase();
            result = result.filter((p) => p.name.toLowerCase().includes(q));
        }

        if (selectedCategory) {
            result = result.filter((p) => p.category === selectedCategory);
        }

        if (selectedRegion) {
            result = result.filter((p) => p.location === selectedRegion);
        }

        if (selectedRating) {
            const rating = Number(selectedRating);
            if (!Number.isNaN(rating)) {
                result = result.filter((p) => Math.floor(p.rating) >= rating);
            }
        }

        switch (selectedSort) {
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
        selectedRating,
        selectedSort
    ]);

    return (
        <>
            <Typography
                variant="h2"
                align="center"
                pt={5}
                pb={2}
            >
                {textResources.producers.addText.localProducts}
            </Typography>
            <Typography
                variant="h6"
                align="center"
                pb={5}
            >
                {textResources.producers.addText.discoverProducers}
            </Typography>
            <Card
                sx={{
                    width: "100%",
                    p: "2rem",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%"
                    }}
                >
                    <SearchBar
                        placeholder={textResources.searchBar.placeholder}
                        value={search}
                        onChange={setSearch}
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
                    <Dropdown
                        label={textResources.producers.filters.category}
                        value={selectedCategory}
                        options={categoryOptions}
                        onChange={(value) =>
                            handleDropdownChange(textResources.producers.filters.category, value)
                        }
                        sx={{ flex: { xs: "1 1 45%", md: "1 1 auto" } }}

                    />
                    <Dropdown
                        label={textResources.producers.filters.region}
                        value={selectedRegion}
                        options={regionOptions}
                        onChange={(value) =>
                            handleDropdownChange(textResources.producers.filters.region, value)
                        }
                        sx={{ flex: { xs: "1 1 45%", md: "1 1 auto" } }}
                    />
                    <Dropdown
                        label={textResources.producers.filters.rating}
                        value={selectedRating}
                        options={ratingOptions}
                        onChange={(value) =>
                            handleDropdownChange(textResources.producers.filters.rating, value)
                        }
                        sx={{ flex: { xs: "1 1 45%", md: "1 1 auto" } }}
                    />
                    <Dropdown
                        label={textResources.producers.filters.sort}
                        value={selectedSort}
                        options={sortOptions}
                        onChange={(value) =>
                            handleDropdownChange(textResources.producers.filters.sort, value)
                        }
                        sx={{ flex: { xs: "1 1 45%", md: "1 1 auto" } }}
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
                    gap: 1
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap"
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
                                flexWrap: "wrap"
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    mr: 1
                                }}
                            >
                                {textResources.producers.activeFiltersLabel}
                            </Typography>
                            {activeFilters.map((af) => (
                                <FilterChip
                                    label={af.label}
                                    onRemove={af.onRemove}
                                />
                            ))}
                            <Button
                                size="small"
                                onClick={() => {
                                    setSearch("");
                                    setSelectedCategory("");
                                    setSelectedRegion("");
                                    setSelectedRating("");
                                    setSelectedSort("");
                                }}
                            >
                                {textResources.producers.clearAll}
                            </Button>
                        </Box>
                    )}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >
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
                            justifyContent: "center"
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
                            justifyContent: "center"
                        }}
                    >
                        <ViewListIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box
                sx={{
                    mt: 4,
                    mb: 4,
                    px: 2,
                    maxWidth: "1160px",
                    mx: "auto"
                }}
            >
                {filteredProducers.length === 0 ? (
                    <Typography
                        align="center"
                    >
                        {textResources.producers.noResults}
                    </Typography>
                ) : viewType === "grid" ? (
                    <Grid
                        container
                        spacing={2}
                    >
                        {filteredProducers.map((producer) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                key={producer.producerId}
                            >
                                <GridViewUserProducerCard
                                    key={producer.producerId}
                                    producerId={producer.producerId}
                                    coverImage={producer.coverImage}
                                    logo={producer.logo}
                                    name={producer.name}
                                    location={producer.location}
                                    category={producer.category}
                                    rating={producer.rating}
                                    productCount={producer.productCount}
                                    description={producer.description}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2
                        }}
                    >
                        {filteredProducers.map((producer) => (
                            <Box
                                key={producer.producerId}
                                sx={{
                                    minWidth: 300,
                                    flexShrink: 0
                                }}
                            >
                                <ListViewUserProducerCard
                                    key={producer.producerId}
                                    producerId={producer.producerId}
                                    coverImage={producer.coverImage}
                                    name={producer.name}
                                    location={producer.location}
                                    category={producer.category}
                                    rating={producer.rating}
                                    productCount={producer.productCount}
                                    description={producer.description}
                                />
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </>
    );
}