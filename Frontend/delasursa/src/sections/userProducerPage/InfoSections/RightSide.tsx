import React from "react";
import { Box } from "@mui/material";
import ProducerStatsCard from "../../../components/ProducerStatsCard";
import ProducerContactCard from "../../../components/ProducerContactCard";

interface RightSideProps {
  experience: number;
  farmSize: number;
  organic: number;
  totalOrders: number;
  activeProducts: number;
  rating: number;
  phone: string;
  email: string;
}

const RightSide: React.FC<RightSideProps> = ({
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
        gap: "1.5rem",
      }}
    >
      <ProducerStatsCard
        experience={experience}
        farmSize={farmSize}
        organic={organic}
        totalOrders={totalOrders}
        activeProducts={activeProducts}
        rating={rating}
      />

      <ProducerContactCard phone={phone} email={email} />
    </Box>
  );
};

export default RightSide;