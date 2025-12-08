import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography
} from "@mui/material";
import {
    LocationOnOutlined,
    StarOutline,
    Inventory2Outlined,
    CalendarMonthOutlined
} from "@mui/icons-material";
import { colors } from "../theme/colors";
import { useNavigate } from "react-router-dom";

interface ListViewUserProducerCardProps {
    producerId: string;
    coverImage: string;
    name: string;
    location: string;
    category: string;
    rating: number;
    productCount: number;
    description: string;
    since?: string;
}

const ListViewUserProducerCard: React.FC<ListViewUserProducerCardProps> = ({
    producerId,
    coverImage,
    name,
    location,
    category,
    rating,
    productCount,
    description,
    since = "Martie 2023"
}) => {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`/producer/${producerId}`)}
            sx={{
                width: "100%",
                backgroundColor: colors.darkGreen1,
                color: colors.white1,
                borderRadius: "0.8rem",
                border: `0.5px solid ${colors.lightGreen1Transparent}`,
                overflow: "hidden",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }
            }}
        >

            {/* cover image */}
            <CardMedia
                component="img"
                image={coverImage}
                alt={name}
                sx={{
                    width: { xs: "100%", sm: "13rem" },
                    height: { xs: "10rem", sm: "auto" },
                    objectFit: "cover",
                    flexShrink: 0
                }}
            />

            {/* content */}
            <CardContent
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.3rem",
                    p: "0.85rem"
                }}
            >

                {/* name */}
                <Typography
                    variant="h6"
                    sx={{
                        color: colors.white1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}
                >
                    {name}
                </Typography>

                {/* location */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem"
                    }}
                >
                    <LocationOnOutlined
                        sx={{
                            fontSize: "1rem",
                            color: colors.white2
                        }}
                    />
                    <Typography
                        variant="body2"
                        sx={{
                            color: colors.white2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {location}
                    </Typography>
                </Box>

                {/* description */}
                <Typography
                    variant="body2"
                    sx={{
                        color: colors.white2,
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                >
                    {description}
                </Typography>

                {/* category */}
                <Typography
                    variant="body2"
                    sx={{
                        color: colors.lightGreen1
                    }}
                >
                    {category}
                </Typography>

                <Box
                    sx={{
                        mt: "0.5rem",
                        pt: "0.5rem",
                        borderTop: `0.5px solid ${colors.lightGreen1Transparent}`,
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" },
                        justifyContent: "space-between",
                        gap: { xs: "0.8rem", sm: 0 }
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1.2rem",
                            flexWrap: "wrap"
                        }}
                    >

                        {/* rating */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.3rem"
                            }}
                        >
                            <StarOutline
                                sx={{
                                    fontSize: "1rem",
                                    color: colors.lightGreen1
                                }}
                            />
                            <Typography
                                variant="body2"
                            >
                                {rating}
                            </Typography>
                        </Box>

                        {/* product count */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.3rem"
                            }}
                        >
                            <Inventory2Outlined
                                sx={{
                                    fontSize: "1rem",
                                    color: colors.lightGreen1
                                }}
                            />
                            <Typography
                                variant="body2"
                            >
                                {productCount} produse
                            </Typography>
                        </Box>

                        {/* since */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.3rem"
                            }}
                        >
                            <CalendarMonthOutlined
                                sx={{
                                    fontSize: "1rem",
                                    color: colors.white2
                                }}
                            />
                            <Typography
                                variant="body2"
                            >
                                {since}
                            </Typography>
                        </Box>

                    </Box>

                    {/* view profile button */}
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: "0.6rem",
                            paddingX: "1.2rem",
                            color: colors.lightGreen1,
                            borderColor: colors.lightGreen1,
                            whiteSpace: "nowrap",
                            "&:hover": {
                                backgroundColor: colors.lightGreen1Transparent
                            }
                        }}
                    >
                        VIZUALIZEAZĂ PROFILUL
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ListViewUserProducerCard;