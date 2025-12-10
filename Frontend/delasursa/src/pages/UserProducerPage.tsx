import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { colors } from "../theme/colors";
import HeroSection from "../sections/userProducerPage/HeroSection";
import ProducerInfoSection from "../sections/userProducerPage/InfoSection";

const MOCK_PRODUCER = {
  id: "1",
  name: "Ferma Verde",
  coverImage: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&h=400&fit=crop",
  avatar: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=200&h=200&fit=crop",
  location: "Brașov, România",
  rating: 4.9,
  reviewCount: 187,
  productCount: 24,
  memberSince: "ianuarie 2023",
  categories: ["Legume", "Fructe", "Lactate"],
  description: `Ferma Verde este o afacere de familie cu o tradiție de peste 30 de ani în cultivarea legumelor și fructelor organice. Ne mândrim cu niciodată noastră și cu produsele proaspete pe care le oferim comunității locale și nu numai.

Povestea noastră începe în 1993, când bunicii noștri au plantat primele rănduri de roșii și castraveți pe un teren de 2 hectare în zona Brașovului. De atunci, ferma s-a extins la 15 hectare, păstrând până aceeași filozofie: produse naturale, cultivate cu grijă și respect pentru pământ. Astazi, generația a treia conduce ferma cu aceeași pasiune.`,
  experience: 30,
  farmSize: 15,
  organic: 1993,
  totalOrders: 3420,
  activeProducts: 24,
  phone: "+40 268 123 456",
  email: "contact@fermaverde.ro",
};

const UserProducerPage: React.FC = () => {
  const { producerId } = useParams<{ producerId: string }>();

  return (
    <Box
      sx={{
        backgroundColor: colors.darkGreen1,
        minHeight: "100vh",
      }}
    >
      <HeroSection
        producerName={MOCK_PRODUCER.name}
        location={MOCK_PRODUCER.location}
        coverImage={MOCK_PRODUCER.coverImage}
        avatar={MOCK_PRODUCER.avatar}
        rating={MOCK_PRODUCER.rating}
        reviewCount={MOCK_PRODUCER.reviewCount}
        productCount={MOCK_PRODUCER.productCount}
        memberSince={MOCK_PRODUCER.memberSince}
        categories={MOCK_PRODUCER.categories}
      />

      <ProducerInfoSection
        producerName={MOCK_PRODUCER.name}
        description={MOCK_PRODUCER.description}
        experience={MOCK_PRODUCER.experience}
        farmSize={MOCK_PRODUCER.farmSize}
        organic={MOCK_PRODUCER.organic}
        totalOrders={MOCK_PRODUCER.totalOrders}
        activeProducts={MOCK_PRODUCER.activeProducts}
        rating={MOCK_PRODUCER.rating}
        phone={MOCK_PRODUCER.phone}
        email={MOCK_PRODUCER.email}
      />

      {/* Aici vor veni următoarele secțiuni (Produse, Abonamente, Recenzii, etc.) */}
    </Box>
  );
};

export default UserProducerPage;