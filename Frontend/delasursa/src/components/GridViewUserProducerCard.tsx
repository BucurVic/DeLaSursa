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
    Inventory2Outlined
} from "@mui/icons-material";
import { colors } from "../theme/colors";
import { useNavigate } from "react-router-dom";

interface GridViewUserProducerCardProps {
    producerId: string;
    coverImage: string;
    logo: string;
    name: string;
    location: string;
    category: string;
    rating: number;
    productCount: number;
    description: string;
}

const GridViewUserProducerCard: React.FC<GridViewUserProducerCardProps> = ({
    producerId,
    coverImage,
    logo,
    name,
    location,
    category,
    rating,
    productCount,
    description
}) => {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`/producer/${producerId}`)}
            sx={{
                height: "28rem",
                width: "20rem",
                backgroundColor: colors.darkGreen1,
                color: colors.white1,
                borderRadius: "0.8rem",
                border: `0.5px solid ${colors.lightGreen1Transparent}`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
            }}
        >

            {/* cover image */}
            <CardMedia
                component="img"
                image={coverImage}
                alt={name}
                sx={{
                    height: "10rem",
                    backgroundColor: colors.white2,
                    objectFit: "cover"
                }}
            />

            {/* logo */}
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "-2.5rem"
                }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt={name}
                    sx={{
                        width: "5rem",
                        height: "5rem",
                        borderRadius: "50%",
                        border: `3px solid ${colors.darkGreen1}`,
                        objectFit: "cover"
                    }}
                />
            </Box>

            {/* content */}
            <CardContent
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.144rem",
                    "&.MuiCardContent-root": {
                        padding: "0.85rem"
                    },
                    "&.MuiCardContent-root:last-child": {
                        paddingBottom: 0
                    }
                }}
            >

                {/* name */}
                <Box
                    sx={{
                        height: "1.872rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: colors.white1,
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            textAlign: "center"
                        }}
                    >
                        {name}
                    </Typography>
                </Box>

                {/* location */}
                <Box
                    sx={{
                        height: "1.872rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {location}
                    </Typography>
                </Box>

                {/* category */}
                <Box
                    sx={{
                        height: "1.872rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: colors.lightGreen1,
                            textAlign: "center",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {category}
                    </Typography>
                </Box>

                {/* rating and product count */}
                <Box
                    sx={{
                        height: "1.872rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1.5rem"
                    }}
                >
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
                </Box>

                {/* description */}
                <Box
                    sx={{
                        height: "3.744rem",
                        overflow: "hidden"
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: colors.white2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "block",
                            textAlign: "center"
                        }}
                    >
                        {description}
                    </Typography>
                </Box>

                {/* view profile button */}
                <Box
                    sx={{
                        height: "1.872rem"
                    }}
                >
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            height: "100%",
                            borderRadius: "0.6rem",
                            color: colors.lightGreen1,
                            borderColor: colors.lightGreen1,
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

export default GridViewUserProducerCard;