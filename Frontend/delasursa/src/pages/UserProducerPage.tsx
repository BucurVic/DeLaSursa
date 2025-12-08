import React from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { colors } from "../theme/colors";
import ProducerHeroSection from "../sections/userProducerPage/HeroSection.tsx";

// mock data
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
      <ProducerHeroSection
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

      {/* Aici vor veni următoarele secțiuni */}
    </Box>
  );
};

export default UserProducerPage;