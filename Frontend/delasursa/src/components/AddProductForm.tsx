import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Button, TextField, Typography} from "@mui/material";
import Dropdown from "./Dropdown.tsx";
import FileUploaderBox from "./FileUploader.tsx";
import {textResources as tr} from "../theme/textResources.ts";

export default function ProductForm() {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        unit: "",
        price: "",
        stock: "",
        region: "",
        description: "",
    });

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | { target: { name: string; value: string } }
    ) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleFiles = (files: FileList) => {
        console.log("Selected files:", files);
    };

    const categoryOptions = [
        {value: "fructe", label: "Fructe"},
        {value: "legume", label: "Legume"},
        {value: "bauturi", label: "Băuturi"},
    ];

    const unitOptions = [
        {value: "kg", label: "Kilogram"},
        {value: "buc", label: "Bucată"},
        {value: "l", label: "Litru"},
    ];

    const regionOptions = [
        {value: "transilvania", label: "Transilvania"},
        {value: "moldova", label: "Moldova"},
        {value: "muntenia", label: "Muntenia"},
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data:", formData);
    };
    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                flexGrow: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                p: 4,
                maxWidth: 900,
                mx: 'auto',
                mt: 4,
            }}


        > <Typography variant="h5" sx={{mb: 3}}>
            {tr.form.title}
        </Typography>
            <Grid container spacing={2}>
                <Grid size={{xs: 12, md: 12}}>
                    <TextField
                        fullWidth
                        required
                        label={tr.form.name}
                        name="name"
                        placeholder={tr.form.placeholderName}
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Dropdown
                        label={tr.form.category}
                        value={formData.category}
                        onChange={handleChange}
                        options={categoryOptions}
                        name="category"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <Dropdown
                        label={tr.form.unit}
                        value={formData.unit}
                        onChange={handleChange}
                        options={unitOptions}
                        name="unit"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <TextField
                        fullWidth
                        required
                        label={tr.form.price}
                        name="price"
                        placeholder={tr.form.placeholderPrice}
                        value={formData.price}
                        onChange={handleChange}
                        type="number"
                        inputProps={{step: "0.50", min: "0"}}
                    />
                </Grid>
                <Grid size={{xs: 12, md: 6}}>
                    <TextField
                        fullWidth
                        required
                        label={tr.form.stock}
                        name="stock"
                        placeholder={tr.form.placeholderStock}
                        value={formData.stock}
                        onChange={handleChange}
                        type="number"
                        inputProps={{step: "1", min: "0"}}
                    />
                </Grid>
                <Grid size={{xs: 12, md: 12}}>
                    <Dropdown
                        label={tr.form.region}
                        value={formData.region}
                        onChange={handleChange}
                        options={regionOptions}
                        name="region"
                        required
                        fullWidth
                    />
                </Grid>
                <Grid size={{xs: 12, md: 12}}>
                    <TextField
                        fullWidth
                        label={tr.form.description}
                        name="description"
                        placeholder={tr.form.placeholderDescription}
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid size={{xs: 12, md: 12}}>
                    <Typography variant="subtitle1" sx={{mb: 1}}>
                        {tr.form.imagesLabel}
                    </Typography>
                    <FileUploaderBox
                        fileTypesDisplay="PNG, JPG"
                        accept="image/png, image/jpeg"
                        multiple
                        onFilesSelected={handleFiles}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                variant={"contained"}
                color={"primary"}
                sx={{mt: 3}}
            >
                {tr.form.addButton}
            </Button>

            <Button
                variant={"outlined"}
                color={"secondary"}
                sx={{mt: 3, ml: 3}}
                type="reset"
            >
                {tr.form.cancelButton}
            </Button>
        </Box>
    );
}
