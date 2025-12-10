import React from "react";
import { Box } from "@mui/material";
import { colors } from "../../theme/colors";
import RightSide from "./InfoSections/RightSide";
import LeftSide from "./InfoSections/LeftSide";

interface ProducerInfoSectionProps {
  producerName: string;
  description: string;
  experience: number;
  farmSize: number;
  organic: number;
  totalOrders: number;
  activeProducts: number;
  rating: number;
  phone: string;
  email: string;
}

const ProducerInfoSection: React.FC<ProducerInfoSectionProps> = ({
  producerName,
  description,
  experience,
  farmSize,
  organic,
  totalOrders,
  activeProducts,
  rating,
  phone,
  email,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3rem",
        backgroundColor: colors.darkGreen1,
        width: "100%",
        padding: { xs: "2rem 1rem", md: "4rem 2rem", lg: "4rem 8rem" },
      }}
    >
      {/* Main content grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: "2rem",
          width: "100%",
          maxWidth: "75rem",
        }}
      >
        {/* Left side - 2/3 */}
        <LeftSide
          producerName={producerName}
          description={description}
        />

        {/* Right side - 1/3 */}
        <RightSide
          experience={experience}
          farmSize={farmSize}
          organic={organic}
          totalOrders={totalOrders}
          activeProducts={activeProducts}
          rating={rating}
          phone={phone}
          email={email}
        />
      </Box>
    </Box>
  );
};

export default ProducerInfoSection;