import React from "react";
import {
    Box,
    Typography,
    Avatar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { textResources as tr } from "../theme/textResources";

import EditButton from "./buttonsProductView/EditButton";
import DeactivateButton from "./buttonsProductView/DeactivateButton";
import DeleteButton from "./buttonsProductView/DeleteButton";

interface Product {
    id: number;
    image: string;
    title: string;
    category: string;
    price: number;
    unit: string;
    stock: string;
    active: boolean;
}

interface ProductCardListViewProps {
    products: Product[];
    onEdit: (id: number) => void;
    onDeactivate: (id: number) => void;
    onDelete: (id: number) => void;
}

const ProductCardListView: React.FC<ProductCardListViewProps> = ({
                                                                     products,
                                                                     onEdit,
                                                                     onDeactivate,
                                                                     onDelete,
                                                                 }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{
                backgroundColor: colors.darkGreen2,
                borderRadius: "1rem",
                border: `1px solid ${colors.lightGreen1Transparent}`,
                overflow: "hidden",
                boxShadow: "0 0 20px rgba(0,0,0,0.25)",
            }}
        >
            <Table
                sx={{
                    minWidth: "70rem",
                    tableLayout: "fixed",
                }}
            >
                <TableHead>
                    <TableRow
                        sx={{
                            "& th": {
                                color: colors.white2,
                                backgroundColor: colors.darkGreen1,
                                borderBottom: `1px solid ${colors.lightGreen1Transparent}`,
                                ...typography.body2,
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                            },
                        }}
                    >
                        <TableCell sx={{ width: "30%" }}>
                            {tr.productCard.columns.product}
                        </TableCell>
                        <TableCell sx={{ width: "18%" }}>
                            {tr.form.category}
                        </TableCell>
                        <TableCell sx={{ width: "10%" }}>
                            {tr.productCard.columns.price}
                        </TableCell>
                        <TableCell sx={{ width: "10%" }}>
                            {tr.form.stock}
                        </TableCell>
                        <TableCell sx={{ width: "10%" }}>
                            {tr.productCard.columns.status}
                        </TableCell>

                        {/* 🔥 27% spațiu pentru butoane */}
                        <TableCell sx={{ width: "27%" }} align="right">
                            {tr.productCard.columns.actions}
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {products.map((p) => (
                        <TableRow
                            key={p.id}
                            sx={{
                                "&:nth-of-type(odd)": { backgroundColor: colors.darkGreen2 },
                                "&:nth-of-type(even)": { backgroundColor: "#0F1F18" },
                                "&:hover": { backgroundColor: colors.darkGreen1 },
                                "& td": {
                                    color: colors.white1,
                                    borderBottom: "none",
                                    ...typography.body2,
                                    verticalAlign: "middle",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                },
                            }}
                        >
                            {/* Produs + imagine */}
                            <TableCell>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                    }}
                                >
                                    <Avatar
                                        src={p.image}
                                        alt={p.title}
                                        sx={{
                                            width: "4rem",
                                            height: "4rem",
                                            borderRadius: "0.5rem",
                                            flexShrink: 0,
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            ...typography.body1,
                                            color: colors.white1,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {p.title}
                                    </Typography>
                                </Box>
                            </TableCell>

                            <TableCell>{p.category}</TableCell>

                            <TableCell>
                                <Typography sx={{ fontWeight: 600 }}>
                                    {p.price} {tr.productCard.priceSuffix}
                                </Typography>
                            </TableCell>

                            <TableCell>{p.unit}</TableCell>

                            <TableCell>
                                <Box
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        px: "0.7rem",
                                        py: "0.3rem",
                                        borderRadius: "0.75rem",
                                        backgroundColor: p.active
                                            ? colors.lightGreen1Transparent
                                            : colors.redTransparent,
                                        color: p.active
                                            ? colors.lightGreen1
                                            : colors.red1,
                                        fontSize: "0.8rem",
                                        minWidth: "5rem",
                                    }}
                                >
                                    {p.active
                                        ? tr.productCard.status.active
                                        : tr.productCard.inactiveLabel}
                                </Box>
                            </TableCell>

                            {/* 🔥 Acțiuni – ordinea cerută + dimensiuni fixe */}
                            <TableCell align="right">
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        gap: "0.8rem",
                                        flexWrap: "nowrap",
                                    }}
                                >
                                    {/* Edit */}
                                    <Box sx={{ width: "7rem" }}>
                                        <EditButton
                                            fullWidth
                                            onClick={() => onEdit(p.id)}
                                        />
                                    </Box>

                                    {/* Deactivate */}
                                    <Box>
                                        <DeactivateButton
                                            onClick={() => onDeactivate(p.id)}
                                            fullWidth={false}
                                        >
                                            {p.active ? tr.productCard.buttons.deactivate : tr.productCard.buttons.activate}
                                        </DeactivateButton>

                                    </Box>

                                    {/* Delete */}
                                    <Box sx={{ width: "7rem" }}>
                                        <DeleteButton
                                            fullWidth
                                            onClick={() => onDelete(p.id)}
                                        />
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default ProductCardListView;