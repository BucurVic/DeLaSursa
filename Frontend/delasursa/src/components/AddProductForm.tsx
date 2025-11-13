import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Button, TextField, Typography} from "@mui/material";
import Dropdown from "./Dropdown.tsx";
import FileUploaderBox from "./FileUploader.tsx";
import {textResources as tr} from "../theme/textResources.ts";
import {useNotify} from "./NotifyProvider.tsx";
import {type CreateProdusData, produseApi} from "../api/produseApi.ts";

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
const initialFormState = {
    name: "",
    category: "",
    unit: "",
    price: "",
    stock: "",
    description: "",
    images: null as FileList | null,
};

export default function ProductForm() {
    const [formData, setFormData] = useState(initialFormState);


    const notify = useNotify();


    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            | { target: { name: string; value: string } }
    ) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    const handleFiles = (files: FileList) => {
        setFormData(prev => ({
            ...prev,
            images: files
        }));    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newProdus: CreateProdusData = {
                nume: formData.name,
                categorie: formData.category,
                pret: Number(formData.price),
                unitateMasura: formData.unit,
                cantitate: Number(formData.stock),
                imagine: formData.images ? formData.images[0] : null,
            };

            await produseApi.add(newProdus);

            notify("Produs adăugat cu succes!", "success");
            setFormData(initialFormState);

            const fileInput = document.getElementById("product-files") as HTMLInputElement | null;
            if (fileInput) fileInput.value = "";

        } catch (err) {
            console.error(err);
            notify("A apărut o eroare neprevăzută!", "error");
        }
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
                        id="product-files"
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
                onClick={() => setFormData(initialFormState)}
            >
                {tr.form.cancelButton}
            </Button>
        </Box>
    );
}
