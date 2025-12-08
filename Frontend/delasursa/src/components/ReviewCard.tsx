import React from "react";
import { Box, Typography, Rating, Avatar } from "@mui/material";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";
import { colors } from "../theme/colors";
import { Divider } from "@mui/material";

interface ReviewCardProps {
    rating: number;
    text: string;
    author: string;
    status: string;
    avatar: string;
    productImage: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
    rating,
    text,
    author,
    status,
    avatar,
    productImage,
}) => {
    return (
        <Box
            sx={{
                backgroundColor: colors.darkGreen1,
                borderRadius: "1rem",
                border: `1px solid ${colors.lightGreen1Transparent}`,
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                height: "100%",
            }}
        >
            {/* quote icon and rating */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                }}
            >
                <FormatQuoteOutlinedIcon
                    sx={{
                        fontSize: "2rem",
                        color: colors.white1,
                    }}
                />
                <Rating
                    value={rating}
                    readOnly
                    size="small"
                    sx={{
                        "& .MuiRating-iconFilled": {
                            color: colors.lightGreen2,
                        },
                        "& .MuiRating-iconEmpty": {
                            color: `${colors.lightGreen1Transparent}`,
                        },
                    }}
                />
            </Box>

            {/* review text */}
            <Box
                sx={{
                    minHeight: "4rem",
                    maxHeight: "4rem",
                }}
            >
                <Typography
                    variant="body2"
                    sx={{
                        color: colors.white2,
                    }}
                >
                    {text}
                </Typography>
            </Box>

            {/* spacer to push divider to bottom */}
            <Box sx={{ flexGrow: 1 }} />
            
            {/* divider */}
            <Divider
                sx={{
                    backgroundColor: colors.lightGreen1Transparent,
                    border: "none",
                    height: "1px",
                }}
            />
            {/* author and product */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "auto",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <Avatar src={avatar} alt={author} sx={{ width: 40, height: 40 }} />
                    <Box>
                        <Typography
                            variant="body2"
                            sx={{
                                color: colors.white1,
                            }}
                        >
                            {author}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: colors.white2,
                            }}
                        >
                            {status}
                        </Typography>
                    </Box>
                </Box>
                <Avatar src={productImage} alt="product" sx={{ width: 40, height: 40 }} />
            </Box>
        </Box>
    );
};

export default ReviewCard;