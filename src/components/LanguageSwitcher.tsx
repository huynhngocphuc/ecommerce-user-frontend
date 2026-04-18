import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useLanguage } from '../hooks/useLanguage';
import ukFlag from '../assets/images/flag/flag-united-kingdom.svg';
import vnFlag from '../assets/images/flag/flag-vietnam.svg';

type LanguageCode = 'en' | 'vi';

interface LanguageOption {
  code: LanguageCode;
  label: string;
  flag: string;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'en',
    label: 'English (UK)',
    flag: ukFlag,
  },
  {
    code: 'vi',
    label: 'Việt Nam (Vi)',
    flag: vnFlag,
  },
];

export const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (language === 'vi' || language === 'en') {
      setSelectedLanguage(language);
    }
  }, [language]);

  const open = Boolean(anchorEl);

  const selectedOption = useMemo(
    () => LANGUAGE_OPTIONS.find((option) => option.code === selectedLanguage) ?? LANGUAGE_OPTIONS[0],
    [selectedLanguage]
  );

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLanguage = (code: LanguageCode) => {
    setSelectedLanguage(code);
    changeLanguage(code);
    handleClose();
  };

  return (
    <Box className="language-switcher">
      <Button
        id="language-switcher-trigger"
        aria-controls={open ? 'language-switcher-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
        sx={{
          borderRadius: '12px',
          px: 0,
          py: 0,
          borderColor: 'divider',
          color: 'text.primary',
          textTransform: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'action.hover',
          },
        }}
      >
        <Box
          component="img"
          src={selectedOption.flag}
          alt={selectedOption.label}
          sx={{ width: 35, height: 35, objectFit: 'cover' }}
        />
      </Button>

      <Menu
        id="language-switcher-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'language-switcher-trigger',
            dense: true,
            sx: { p: 0.75 },
          },
          paper: {
            elevation: 0,
            sx: {
              mt: 1,
              borderRadius: '14px',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 12px 28px rgba(16, 24, 40, 0.12)',
              minWidth: 200,
            },
          },
        }}
      >
        {LANGUAGE_OPTIONS.map((option) => {
          const isSelected = option.code === selectedLanguage;

          return (
            <MenuItem
              key={option.code}
              selected={isSelected}
              onClick={() => handleSelectLanguage(option.code)}
              sx={{
                borderRadius: '10px',
                px: 1.25,
                py: 1,
                gap: 0.5,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 30 }}>
                <Box
                  component="img"
                  src={option.flag}
                  alt={option.label}
                  sx={{ width: 18, height: 18, borderRadius: '50%', objectFit: 'cover' }}
                />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">{option.label}</Typography>}
                sx={{ m: 0 }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
