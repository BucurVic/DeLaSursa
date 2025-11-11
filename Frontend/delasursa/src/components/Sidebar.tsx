// ...existing code...
import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

import GridViewIcon from "@mui/icons-material/GridView";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';

import { colors } from "../theme/colors.ts";
import { textResources } from "../theme/textResources";

export interface SidebarProps {
  collapsed?: boolean; 
  className?: string;
}

export default function Sidebar({ collapsed = true, className }: SidebarProps) {
  const [isCollapsed, setCollapsed] = React.useState<boolean>(collapsed);
  const [active, setActive] = React.useState<string>("products"); 

  const widthCollapsed = "5rem";
  const widthExpanded = "16rem"; 

  const ITEMS = [
    { key: "dashboard", label: textResources.sidebar.dashboard, icon: <GridViewIcon /> },
    { key: "products", label: textResources.sidebar.products, icon: <Inventory2OutlinedIcon /> },
    { key: "orders", label: textResources.sidebar.orders, icon: <ReceiptLongIcon /> },
    { key: "reviews", label: textResources.sidebar.reviews, icon: <StarBorderIcon /> },
    { key: "stats", label: textResources.sidebar.stats, icon: <InsertChartOutlinedOutlinedIcon /> },
    { key: "messages", label: textResources.sidebar.messages, icon: <ChatBubbleOutlineOutlinedIcon /> },
    { key: "subscriptions", label: textResources.sidebar.subscriptions, icon: <CreditCardIcon /> },
    { key: "settings", label: textResources.sidebar.settings, icon: <SettingsOutlinedIcon /> },
  ];

  const handleClick = (itemKey: string, label: string) => {
    setActive(itemKey);
  };

  return (
    <Box
      className={className}
      component="aside"
      sx={{
        position: "fixed",
        left: 0,
        // top: { xs: "6rem", sm: "6.5rem", md: "6.5rem" },
        height: "calc(100vh - 3.5rem)",
        width: isCollapsed ? widthCollapsed : widthExpanded,
        bgcolor: colors.darkGreen1,
        color: colors.white1,
        display: "flex",
        flexDirection: "column",
        transition: "width 320ms ease",
        borderRight: `1px solid ${colors.lightGreen1Transparent}`,
        borderTop:`1px solid ${colors.lightGreen1Transparent}`
      }}
    >

        <IconButton
          onClick={() => setCollapsed((s) => !s)}
            sx={{
            position: "absolute",
            top: "1.25rem",               
            right: "-0.75rem",            
            width: "1.5rem",
            height: "1.5rem",
            borderRadius: "50%",
            bgcolor: colors.lightGreen2,
            color: colors.darkGreen1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1300,
            transition: "transform 160ms ease, box-shadow 160ms ease",
            "&:hover": { 
                transform: "translateY(-2px)",
                bgcolor: colors.lightGreen2,
             }
          }}
        >
          {isCollapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
        </IconButton>

      <Box sx={{ flex: 1, overflowY: "auto", pt: "0.5rem" }}>
        <List sx={{ p: 0 }}>
          {ITEMS.map((it) => {
            const isActive = it.key === active;
            const activeBg = isActive ? colors.lightGreen2 : "transparent";
            const activeColor = isActive ? colors.darkGreen1 : colors.white2;

            return (
            <ListItem key={it.key} disablePadding sx={{ px: 0 }}>
              <ListItemButton
                onClick={() => handleClick(it.key, it.label)}
                sx={{
                  gap: isCollapsed ? 0 : 1,
                  py: isCollapsed ? "0.45rem" : "0.6rem",
                  px: isCollapsed ? "0.375rem" : "0.5rem",
                  mx: isCollapsed ? "0.25rem" : "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  bgcolor: isActive ? (isCollapsed ? colors.lightGreen1 : colors.lightGreen2) : "transparent",
                  borderRadius: !isCollapsed && isActive ? "0.75rem" : "0.5rem",
                  "&:hover": { bgcolor: !isCollapsed ? (isActive ? colors.lightGreen2 : colors.lightGreen1Transparent) : (isActive ? colors.lightGreen2 : colors.lightGreen1Transparent) },
                }}
                aria-current={isActive ? "true" : undefined}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isCollapsed ? 0 : "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "transparent",
                    color: isCollapsed ? (isActive ? colors.darkGreen1 : colors.white2) : (isActive ? colors.darkGreen1 : colors.white2),
                    width: isCollapsed ? "2rem" : "1.6rem",
                    height: isCollapsed ? "2rem" : "1.6rem",
                    borderRadius: isCollapsed ? "0.6rem" : "0.5rem",
                    transition: "background-color 200ms, color 200ms",
                  }}
                >
                  {React.cloneElement(it.icon as any, { fontSize: "small" })}
                </ListItemIcon>

                {!isCollapsed && (
                  <ListItemText
                    primary={it.label}
                    sx={{
                      color: isActive ? colors.darkGreen1 : colors.white2, 
                      "& .MuiListItemText-primary": { fontSize: "0.8rem", lineHeight: 1.2 },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
            );
          })}
        </List>
      </Box>

    </Box>
  );
}