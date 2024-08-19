import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Container, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import DialogueBox from './DialogueBox';
import Search from './Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Home, ShoppingCart } from '@mui/icons-material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 2 }} >
      <Container  >
        <Toolbar sx={{ flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography style={{ textDecoration: 'none', color: 'white' }} variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
            Ecommerce
          </Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Search isMobile={isMobile} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/" selected={location.pathname === "/"}>
                <Home /> Home
              </MenuItem>
              {
                localStorage.getItem('token') ?
                  <MenuItem onClick={handleClose} component={Link} to="/cart" selected={location.pathname === "/cart"}>
                    <ShoppingCart /> Cart
                  </MenuItem> :
                  <MenuItem onClick={handleClose} component={Link} to="/login" title='Please Login to access Cart'>
                    <ShoppingCart /> Cart
                  </MenuItem>
              }
              {
                localStorage.getItem('token') ?
                  <MenuItem onClick={handleClose} component={Link} to="/myorders" selected={location.pathname === "/myorders"}>
                    <LocalShippingIcon /> My Orders
                  </MenuItem> :
                  <MenuItem onClick={handleClose} component={Link} to="/login" title='Please Login to access Order History' >
                    <LocalShippingIcon /> My Orders
                  </MenuItem>
              }
            </Menu>
            {!localStorage.getItem('token') ? (
              <Box sx={{ display: 'flex', ml: 2 }}>
                <Button variant="outlined" color="inherit" component={Link} to="/login">Login</Button>
                <Button variant="outlined" color="inherit" sx={{ ml: 2 }} component={Link} to="/signup">Signup</Button>
              </Box>
            ) : (
              <DialogueBox
                text="Logout"
                alert="Are you sure?"
                message="Press agree to Logout from Ecommerce"
                onClickAgree={handleLogout}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
