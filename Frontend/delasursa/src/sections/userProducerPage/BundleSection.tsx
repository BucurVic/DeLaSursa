import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import SubscriptionBundleCard, {type SubscriptionBundleProps} from "../../components/SunscriptionBundleCard.tsx";
import {colors} from "../../theme";

// Date de test (Mock Data) pentru a vedea cum arată
// eslint-disable-next-line react-refresh/only-export-components
export const MOCK_BUNDLES: Omit<SubscriptionBundleProps, 'onSubscribe'>[] = [
    {
        id: "1",
        title: "Coșul Vitaminizant",
        price: 120,
        currency: "RON",
        frequency: "Săptămânal",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800",
        items: [
            { name: "Cartofi albi", quantity: "2 kg" },
            { name: "Roșii de grădină", quantity: "1 kg" },
            { name: "Castraveți", quantity: "1 kg" },
            { name: "Ceapă verde", quantity: "2 leg" },
            { name: "Morcovi", quantity: "1 kg" },
        ]
    },
    {
        id: "2",
        title: "Pachet Mic Dejun",
        price: 85,
        currency: "RON",
        frequency: "Săptămânal",
        image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800",
        items: [
            { name: "Ouă de țară", quantity: "10 buc" },
            { name: "Lapte proaspăt", quantity: "2 L" },
            { name: "Brânză telemea", quantity: "500 g" },
            { name: "Unt de casă", quantity: "200 g" },
        ]
    },
    {
        id: "3",
        title: "Mix Conservărie",
        price: 200,
        currency: "RON",
        frequency: "Lunar",
        image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=800",
        items: [
            { name: "Zacuscă vinete", quantity: "2 borcane" },
            { name: "Dulceață afine", quantity: "1 borcan" },
            { name: "Castraveți murați", quantity: "1 borcan" },
            { name: "Compot prune", quantity: "1 sticlă" },
        ]
    }
];

const ProducerBundlesSection: React.FC = () => {

    const handleSubscribe = (id: string) => {
        console.log(`Utilizatorul vrea abonamentul cu id: ${id}`);
        // Aici vei adăuga logica de adăugare în coș
    };

    return (
        <Box sx={{ py: 6, px: { xs: 2, md: 4 }, bgcolor: colors.darkGreen2 }}>
            <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
                {/* Header Secțiune */}
                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        color: colors.white1,
                        fontWeight: "bold",
                        mb: 1
                    }}
                >
                    Abonamente & Coșuri
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: colors.white2,
                        mb: 5,
                        maxWidth: "800px"
                    }}
                >
                    Abonează-te la coșurile noastre recurente și primește produse proaspete direct la ușa ta, cu frecvența dorită. Susține producătorul pe termen lung!
                </Typography>

                {/* Grila de Carduri */}
                <Grid container spacing={4} justifyContent="flex-start">
                    {MOCK_BUNDLES.map((bundle) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            lg={4}
                            key={bundle.id}  // <--- AICI ERA PROBLEMA (trebuie .id)
                            sx={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <SubscriptionBundleCard
                                {...bundle}
                                onSubscribe={handleSubscribe}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default ProducerBundlesSection;