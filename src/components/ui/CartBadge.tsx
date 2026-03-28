import React from 'react';
import { Badge, IconButton, SxProps, Theme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface CartBadgeProps {
  count: number;
  isVisible: boolean;
  onClick?: () => void;
  className?: string;
  sx?: SxProps<Theme>;
}

const CartBadge: React.FC<CartBadgeProps> = ({ count, isVisible, onClick, className, sx }) => {
  const badgeText = count > 99 ? '99+' : count.toString();

  return (
    <IconButton aria-label="Cart" onClick={onClick} size="large" className={className} sx={sx}>
      <Badge
        badgeContent={badgeText}
        color="error"
        invisible={!isVisible}
        max={99}
      >
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartBadge;