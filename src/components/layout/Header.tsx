// src/components/layout/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../hooks/useAuth';
import { useCartCount } from '../../hooks/useCartCount';
import CartBadge from '../ui/CartBadge';
import LanguageSwitcher from '../LanguageSwitcher';
import { HEADER_NAV_ITEMS, ROUTES } from '../../utils/routes';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const tr = t as unknown as (key: string) => string;
  useTheme();
  const isMobile = useMediaQuery('(max-width:767.95px)');
  const { isAuthenticated, user, logout } = useAuth();
  const { count, isVisible } = useCartCount();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [logoLoadError, setLogoLoadError] = React.useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate(ROUTES.LOGIN);
  };

  const handleNavigate = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const navButtonSx = {
    color: 'text.primary',
    borderBottom: '2px solid transparent',
    borderRadius: 0,
    transition: 'color 220ms ease, border-color 220ms ease',
    '&:hover': {
      borderColor: 'primary.main',
      color: 'primary.main',
      backgroundColor: 'transparent',
    },
  } as const;

  const iconButtonSx = {
    color: 'text.primary',
    transition: 'color 220ms ease, transform 220ms ease, background-color 220ms ease',
    '&:hover': {
      color: 'primary.main',
      transform: 'translateY(-1px)',
      backgroundColor: 'rgba(0, 0, 0, 0.03)',
    },
  } as const;

  return (
    <AppBar position="sticky" className="app-header" color="default" elevation={1}>
      <Toolbar sx={{ gap: 1, justifyContent: 'space-between' }}>
        <Box
          onClick={() => handleNavigate(ROUTES.HOME)}
          sx={{
            minWidth: 160,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          aria-label="Go to homepage"
        >
          {!logoLoadError ? (
            <Box
              component="img"
              src="images/logo_black.png"
              alt="Shop Clothing"
              onError={() => setLogoLoadError(true)}
              sx={{ width: 36, height: 36, mr: 1 }}
            />
          ) : null}
          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
            {tr('shop_name')}
          </Typography>
        </Box>

        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {HEADER_NAV_ITEMS.map((item) => (
              <Button
                key={item.id}
                color="inherit"
                onClick={() => handleNavigate(item.path)}
                className="header-nav-item"
                sx={navButtonSx}
              >
                {tr(`nav.${item.id}`)}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {isMobile && (
            <IconButton
              aria-label="Open navigation menu"
              onClick={() => setMobileMenuOpen(true)}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          )}

          <IconButton
            aria-label="Search"
            onClick={() => handleNavigate(ROUTES.PRODUCTS)}
            size="large"
            className="header-icon-btn"
            sx={iconButtonSx}
          >
            <SearchIcon />
          </IconButton>
          <CartBadge
            count={count}
            isVisible={isVisible}
            onClick={() => handleNavigate(ROUTES.PRODUCTS)}
            className="header-icon-btn"
            sx={iconButtonSx}
          />
          <LanguageSwitcher />
          <IconButton
            aria-label={isAuthenticated ? 'Account menu' : 'Login'}
            onClick={() => (isAuthenticated ? navigate(ROUTES.PRODUCTS) : navigate(ROUTES.LOGIN))}
            size="large"
            className="header-icon-btn"
            sx={iconButtonSx}
          >
            <AccountCircleIcon />
          </IconButton>

          {!isMobile && isAuthenticated ? (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1}}>
                {user?.name || user?.email}
              </Typography>
              <Button color="inherit" onClick={handleLogout} sx={{ ml: 1, minWidth:'100px'}}>
                {tr('logout')}
              </Button>
            </>
          ) : null}

          {!isMobile && !isAuthenticated ? (
            <Button color="inherit" onClick={() => navigate(ROUTES.LOGIN)} sx={{minWidth: '100px'}}>
              {tr('login')}
            </Button>
          ) : null}
        </Box>
      </Toolbar>

      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{ sx: { width: 280 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            {tr('menu')}
          </Typography>
          <List>
            {HEADER_NAV_ITEMS.map((item) => (
              <ListItemButton key={item.id} onClick={() => handleNavigate(item.path)}>
                <ListItemText primary={tr(`nav.${item.id}`)} />
              </ListItemButton>
            ))}

            {isAuthenticated ? (
              <ListItemButton onClick={handleLogout}  >
                <ListItemText primary={tr('logout')} />
              </ListItemButton>
            ) : (
              <ListItemButton onClick={() => handleNavigate(ROUTES.LOGIN)}>
                <ListItemText primary={tr('login')} />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
