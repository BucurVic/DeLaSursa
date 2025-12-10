import { Card } from "@mui/material";
import type { ReactElement } from "react";
import { colors } from "../theme";
import Typography from "@mui/material/Typography";

interface IconComponentProps {
  icon: ReactElement;
  value: string;
  label: string;
}

export default function IconComponent(props: IconComponentProps) {
  return (
    <Card
      key={props.label}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        backgroundColor: colors.darkGreen1,
        borderRadius: "2rem",
        border: "0.5px solid",
        borderColor: `${colors.lightGreen1Transparent}`,
      }}
    >
      <props.icon sx={{ fontSize: 40, mb: 1 }} />
      <Typography variant="h3">{props.value}</Typography>
      <Typography variant="body1">{props.label}</Typography>
    </Card>
  );
}
