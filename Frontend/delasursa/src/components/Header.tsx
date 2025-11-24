import React, { useContext } from "react"; // Am păstrat 'useContext'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import PersonOutline from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; 

// --- IMPORTURILE CORECTE COMBINATE ---
import { colors } from "../theme/colors.ts";
import { textResources } from "../theme/textResources";
// Am păstrat importul 'AuthContext' (din HEAD)
import { AuthContext } from "../context/AuthContext.tsx"; 
// Am păstrat importul 'logoSrc' (din 'cezar')
import logoSrc from '../assets/logo.png';
import {useCart} from "../context/CartContext.tsx";
import {Badge} from "@mui/material";

export interface Props {
  variant?: "full" | "compact";
  className?: string;
}

const Header: React.FC<Props> = ({ variant = "full", className }) => {
  
  // --- AM PĂSTRAT VERSIUNEA 'HEAD' (useContext) ---
  const { isAuthenticated, role, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook pentru navigare
  
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [profileAnchor, setProfileAnchor] = React.useState<null | HTMLElement>(
    null
  );
  const [scrollbarGap, setScrollbarGap] = React.useState<number>(0);
  const { items } = useCart();
  const total = items.reduce((acc, item) => acc + item.quantity, 0);



  React.useEffect(() => {
    const updateGap = () => {
      const gap = Math.max(
        0,
        window.innerWidth - document.documentElement.clientWidth
      );
      setScrollbarGap(gap);
    };
    updateGap();
    window.addEventListener("resize", updateGap, { passive: true });
    return () => window.removeEventListener("resize", updateGap);
  }, []);

  // --- MODIFICAREA 1: Lista de navigare actualizată ---
  const navLinks = [
    { text: textResources.navbar.home, path: "./pages/HomePage" },
    { text: textResources.navbar.products, path: "/products" },
    { text: textResources.navbar.producers, path: "/dashboard-producator/produse/lista" },
    { text: textResources.navbar.subscriptions, path: "/abonamente" },
    { text: textResources.navbar.support, path: "/suport" },
    { type: "cart", path: "/cart" },



  ];

  const profileMenuItems = [
    textResources.navbar.myOrders,
    textResources.navbar.myAccount,
    textResources.navbar.myReviews,
    textResources.navbar.deliveryAddresses,
    textResources.navbar.mySubscriptions,
  ];

  const showPanelButton = role === "PRODUCER" || role === "ADMIN";
  const panelLabel =
    role === "PRODUCER"
      ? textResources.navbar.producerPanel
      : textResources.navbar.adminPanel;

  const logoSizeXs = "2.125rem";
  const logoSizeSm = "2.5rem";
  const toolbarPy: any =
    variant === "compact" ? "1.25rem" : { xs: "1.25rem", md: "1.25rem" };
  const navGap = { md: "1rem", lg: "1.5rem" };
  const smallGap = "0.5rem";
  const drawerTop = { xs: "3.5rem", md: "4rem" };
  const menuMinWidth = "13.75rem";
  const btnTypography: any = "body2";

  const handleDrawerOpen = () => {
    const gap = Math.max(
      0,
      window.innerWidth - document.documentElement.clientWidth
    );
    setScrollbarGap(gap);
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => setDrawerOpen(false);

  const handleProfileOpen = (e: React.MouseEvent<HTMLElement>) =>
    setProfileAnchor(e.currentTarget);
  const handleProfileClose = () => setProfileAnchor(null);

  // --- AM PĂSTRAT VERSIUNEA 'HEAD' (cu verificare de siguranță) ---
  const handleLogout = () => {
    handleProfileClose(); 
    if (!logout) return; // Verificare adăugată de colegul tău
    logout(); 
  };

  const navigateTo = (path: string) => {
    handleDrawerClose();
    navigate(path);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: colors.darkGreen1,
        color: colors.white1,
        boxShadow: "none",
        border: "none",
        width: "100%",
        borderBottom: `1px solid ${colors.lightGreen1Transparent}`,
      }}
      className={className}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: smallGap,
            py: toolbarPy,
            px: 0,
          }}
        >
          {/* left side (Logo) - AM COMBINAT LOGICA DE NAVIGARE ('HEAD') CU LOGO-UL ('cezar') */}
          <Box 
            sx={{ display: "flex", alignItems: "center", gap: smallGap, minWidth: 0, cursor: 'pointer' }}
            onClick={() => navigateTo('/')} 
          >
            <Box
              component="img"
              src={logoSrc}
              alt="DeLaSursa Logo"
              sx={{
                width: { xs: logoSizeXs, sm: logoSizeSm },
                height: { xs: logoSizeXs, sm: logoSizeSm },
                flexShrink: 0,
                mr: 1, 
              }}
            />
            <Typography
              variant="h6"
              component="span"
              noWrap
              sx={{ color: colors.white1 }}
            >
              {textResources.brand.name}
            </Typography>
          </Box>

          {/* --- MODIFICAREA 2: Meniul Desktop actualizat --- */}
          {isMdUp && variant === "full" ? (
            <Box
              sx={{
                display: "flex",
                gap: navGap,
                alignItems: "center",
                flex: 1,
                justifyContent: "center",
              }}
            >
              {navLinks.map((link, idx) => (
                  <React.Fragment key={link.text ?? `nav-${idx}`}>
                    {link.type === "cart" ? (
                        <IconButton
                            color="inherit"
                            onClick={() => navigateTo("/cart")}
                        >
                          <Badge badgeContent={total} color="success">
                            <ShoppingCartOutlinedIcon fontSize="small" />
                          </Badge>
                        </IconButton>
                    ) : (
                        <Button
                            color="inherit"
                            disableRipple
                            sx={{
                              textTransform: "none",
                              color: colors.white1,
                              px: "0.25rem",
                              minWidth: "auto",
                              opacity: 0.9,
                              typography: btnTypography
                            }}
                            onClick={() => navigateTo(link.path)}
                        >
                          {link.text}
                        </Button>
                    )}
                  </React.Fragment>
              ))}

            </Box>
          ) : (
            <Box sx={{ flex: 1 }} />
          )}

          <Box sx={{ display: "flex", gap: smallGap, alignItems: "center" }}>
            {isMdUp ? (
              <>
                {!isAuthenticated ? (
                  <>
                    <Button 
                      sx={{ color: colors.white2, typography: btnTypography }}
                      onClick={() => navigateTo('/login')} 
                    >
                      {textResources.navbar.login}
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: colors.lightGreen2,
                        color: colors.darkGreen1,
                      }}
                      onClick={() => navigateTo('/inregistrare')} 
                    >
                      {textResources.navbar.register}
                    </Button>
                  </>
                ) : (
                  <>
                    {showPanelButton && (
                      <Button
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          bgcolor: colors.lightGreen2,
                          color: colors.darkGreen1,
                          ml: "0.5rem",
                          typography: btnTypography,
                        }}
                        onClick={() =>
                          navigateTo(
                            role === "PRODUCER"
                              ? "/dashboard-producator"
                              : "/admin"
                          )
                        }
                      >
                        {panelLabel}
                      </Button>
                    )}
                    <IconButton
                      color="inherit"
                      aria-label="profile"
                      size="large"
                      onClick={handleProfileOpen}
                    >
                      <PersonOutline fontSize="small" />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      aria-label="favorites"
                      size="large"
                      sx={{ color: colors.white1 }}
                    >
                      <FavoriteBorderIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="cart"
                        size="large"
                        sx={{ color: colors.white1 }}
                        onClick={() => navigate("/cart")}   // 🟢 Navigare spre coș
                    >
                      <Badge
                          badgeContent={total}              // 🟢 numărul de produse
                          color="success"
                          overlap="circular"
                      >
                        <ShoppingCartOutlinedIcon fontSize="small" />
                      </Badge>
                    </IconButton>


                    <Menu
                      anchorEl={profileAnchor}
                      open={Boolean(profileAnchor)}
                      onClose={handleProfileClose}
                      PaperProps={{
                        sx: {
                          bgcolor: colors.darkGreen1,
                          color: colors.white1,
                          mt: "0.25rem",
                          minWidth: menuMinWidth,
                          "& .MuiMenuItem-root": {
                            color: colors.white1,
                            typography: btnTypography,
                          },
                        },
                      }}
                    >
                      {profileMenuItems.map((mi) => (
                        <MenuItem key={mi} onClick={handleProfileClose}>
                          {mi}
                        </MenuItem>
                      ))}
                      <MenuItem
                        sx={{
                          borderTop: `1px solid ${colors.lightGreen1Transparent}`,
                          pt: 2,
                          mt: 1,
                        }}
                        onClick={handleLogout} 
                      >
                        {textResources.navbar.logout}
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </>
            ) : (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawerOpen}
                  size="large"
                >
                  <MenuIcon fontSize="small" />
                </IconButton>
                <Drawer
                  anchor="top"
                  open={drawerOpen}
                  onClose={handleDrawerClose}
                  ModalProps={{ keepMounted: true }}
                  sx={{
                    "& .MuiDrawer-paper": {
                      width: `calc(100% - ${scrollbarGap}px)`,
                      right: `${scrollbarGap}px`,
                      left: 0,
                      maxWidth: "100%",
                      position: "fixed",
                      top: drawerTop,
                      height: "auto",
                      maxHeight: "70vh",
                      borderRadius: "1rem",
                      backgroundColor: colors.darkGreen1,
                      color: colors.white1,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                      border: "none",
                      overflow: "auto",
                      boxSizing: "border-box",
                      overflowX: "hidden",
                      px: 0,
                    },
                  }}
                >
                  <Container maxWidth="lg" sx={{ px: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        p: "1rem",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    >
                      {/* --- MODIFICAREA 3: Meniul Mobil actualizat --- */}
                      <List
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          alignItems: "center",
                        }}
                      >
                        {navLinks.map((link, idx) => (
                            <ListItem key={link.text ?? `nav-mobile-${idx}`} disablePadding sx={{ width: "100%", boxSizing: "border-box" }}>
                              <ListItemButton
                                  onClick={() => navigateTo(link.path)}
                                  sx={{
                                    py: "0.25rem",
                                    width: "100%",
                                    justifyContent: "center",
                                  }}
                              >
                                <ListItemText
                                    primary={link.type === "cart" ? "Coș de cumpărături" : link.text}
                                    primaryTypographyProps={{
                                      sx: {
                                        color: colors.white1,
                                        typography: btnTypography,
                                        textAlign: "center",
                                        width: "100%",
                                      },
                                    }}
                                />
                              </ListItemButton>
                            </ListItem>
                        ))}


                        {showPanelButton && (
                          <ListItem disablePadding sx={{ width: "100%", pt: 1 }}>
                            <Box sx={{ width: "100%", px: 0 }}>
                              <Button
                                variant="contained"
                                fullWidth
                                onClick={() =>
                                  navigateTo(
                                    role === "PRODUCER"
                                      ? "/dashboard-producator"
                                      : "/admin"
                                  )
                                }
                                sx={{
                                  textTransform: "none",
                                  bgcolor: colors.lightGreen2,
                                  color: colors.darkGreen1,
                                  justifyContent: "center",
                                  px: 0,
                                  typography: btnTypography,
                                  borderRadius: "0.5rem",
                                }}
                              >
                                {panelLabel}
                              </Button>
                            </Box>
                          </ListItem>
                        )}
                      </List>

                      <Divider
                        sx={{
                          borderColor: colors.lightGreen1Transparent,
                          my: "0.5rem",
                          width: "100%",
                        }}
                      />

                      {!isAuthenticated ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            width: "100%",
                            px: "0.5rem",
                          }}
                        >
                          <Button
                            onClick={() => navigateTo("/login")}
                            fullWidth
                            sx={{
                              textTransform: "none",
                              color: colors.white2,
                              justifyContent: "center",
                              px: 0,
                              typography: btnTypography,
                            }}
                          >
                            {textResources.navbar.login}
                          </Button>

                          <Button
                            onClick={() => navigateTo("/inregistrare")}
                            variant="contained"
                            fullWidth
                            sx={{
                              bgcolor: colors.lightGreen2,
                              color: colors.darkGreen1,
                              textTransform: "none",
                              borderRadius: "0.5rem",
                              py: "0.75rem",
                              typography: btnTypography,
                            }}
                          >
                            {textResources.navbar.register}
                          </Button>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            width: "100%",
                            px: "0.5rem",
                          }}
                        >
                          {profileMenuItems.map((mi) => (
                            <Button
                              key={mi}
                              onClick={handleDrawerClose}
                              fullWidth
                              sx={{
                                textTransform: "none",
                                color: colors.white1,
                                justifyContent: "center",
                                px: 0,
                                typography: btnTypography,
                              }}
                            >
                              {mi}
                            </Button>
                          ))}

                          <Divider
                            sx={{
                              borderColor: colors.lightGreen1Transparent,
                              my: "0.5rem",
                              width: "100%",
                            }}
                          />

                          <Button
                            onClick={handleLogout} // <-- APELARE LOGOUT MOBIL
                            variant="contained"
                            fullWidth
                            sx={{
                              textTransform: "none",
                              bgcolor: colors.lightGreen2,
                              color: colors.darkGreen1,
                              justifyContent: "center",
                              px: 0,
                              typography: btnTypography,
                              borderRadius: "0.5rem",
                            }}
                          >
                            {textResources.navbar.logout}
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Container>
                </Drawer>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;