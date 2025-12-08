import React from "react";
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { colors } from "../../theme/colors";

const FAQ_DATA = [
    {
        id: "faq-1",
        question: "Cum funcționează DeLaSursă?",
        answer:
            "DeLaSursă conectează direct producătorii locali cu consumatorii, eliminând intermediarii. Poți căuta produse organice, plasa comenzi online și le vei primi direct de la fermieri verificați.",
    },
    {
        id: "faq-2",
        question: "Sunt produsele cu adevărat organice și verificate?",
        answer:
            "Da, toți producătorii noștri sunt verificați și certificați. Colaborăm doar cu producători care respectă standardele de producție organică și tradițională. Fiecare producător are un profil transparent cu certificările necesare.",
    },
    {
        id: "faq-3",
        question: "Cum se face livrarea produselor?",
        answer:
            "Livrarea se poate face prin curier partener sau ridicare personală de la producător, în funcție de distanță și preferințe. Produsele sunt ambalate corespunzător pentru a menține prospețimea.",
    },
    {
        id: "faq-4",
        question: "Pot deveni producător pe platformă?",
        answer:
            "Da! Dacă ești producător local și respecti standardele de calitate, te poți înregistra pe platformă. Vei trece printr-un proces de verificare pentru a-ți confirma certificările și calitatea produselor.",
    },
    {
        id: "faq-5",
        question: "Ce metode de plată acceptați?",
        answer:
            "Acceptăm card bancar, transfer bancar și plată la livrare (în anumite zone). Toate tranzacțiile sunt securizate prin procesatori de plăți certificați.",
    },
    {
        id: "faq-6",
        question: "Care este politica de returnare?",
        answer:
            "Dacă produsele nu corespund descrierii sau sunt deteriorate, poți solicita returnare în termen de 48 de ore de la livrare. Vom analiza cazul și vom oferi rambursare sau înlocuire.",
    },
];

const FaqSection: React.FC = () => {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const leftColumn = FAQ_DATA.filter((_, i) => i % 2 === 0);
    const rightColumn = FAQ_DATA.filter((_, i) => i % 2 === 1);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3rem",
                backgroundColor: colors.darkGreen1,
                width: "100%",
                padding: "4rem 8rem",
            }}
        >
            {/* title and subtitle */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        color: colors.white1,
                        textAlign: "center",
                    }}
                >
                    ÎNTREBĂRI FRECVENTE
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: colors.white2,
                        textAlign: "center",
                    }}
                >
                    Răspunsuri rapide pentru cumpărători și producători.
                </Typography>
            </Box>

            {/* faq grid - 2 independent columns */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "1fr",
                        md: "1fr 1fr",
                    },
                    gap: "1.5rem",
                    width: "120%",
                    maxWidth: "75rem",
                }}
            >
                {/* LEFT COLUMN */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {leftColumn.map((faq) => (
                        <Accordion
                            key={faq.id}
                            expanded={expanded === faq.id}
                            onChange={handleChange(faq.id)}
                            disableGutters
                            sx={{
                                backgroundColor: colors.darkGreen2,
                                color: colors.white1,
                                borderRadius: "1rem !important",
                                border: `1px solid ${colors.lightGreen1Transparent}`,
                                overflow: "hidden",
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: colors.lightGreen1 }} />}
                                sx={{
                                    px: "1.5rem",
                                    py: "1.5rem",
                                    "& .MuiAccordionSummary-content": {
                                        margin: 0,
                                    },
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: colors.white1,
                                    }}
                                >
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            {expanded === faq.id && (
                                <Divider
                                    sx={{
                                        backgroundColor: colors.lightGreen1Transparent,
                                        border: "none",
                                        height: "1px",
                                    }}
                                />
                            )}
                            <AccordionDetails
                                sx={{
                                    px: "1.5rem",
                                    py: "1rem",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: colors.white2,
                                    }}
                                >
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>

                {/* RIGHT COLUMN */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    {rightColumn.map((faq) => (
                        <Accordion
                            key={faq.id}
                            expanded={expanded === faq.id}
                            onChange={handleChange(faq.id)}
                            disableGutters
                            sx={{
                                backgroundColor: colors.darkGreen2,
                                color: colors.white1,
                                borderRadius: "1rem !important",
                                border: `1px solid ${colors.lightGreen1Transparent}`,
                                overflow: "hidden",
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: colors.lightGreen1 }} />}
                                sx={{
                                    px: "1.5rem",
                                    py: "1.5rem",
                                    "& .MuiAccordionSummary-content": {
                                        margin: 0,
                                    },
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: colors.white1,
                                    }}
                                >
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            {expanded === faq.id && (
                                <Divider
                                    sx={{
                                        backgroundColor: colors.lightGreen1Transparent,
                                        border: "none",
                                        height: "1px",
                                    }}
                                />
                            )}
                            <AccordionDetails
                                sx={{
                                    px: "1.5rem",
                                    py: "1rem",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: colors.white2,
                                    }}
                                >
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default FaqSection;