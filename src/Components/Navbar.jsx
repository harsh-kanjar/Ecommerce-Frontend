import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import DialogueBox from './DialogueBox';
import Search from './Search';
import useMediaQuery from '@mui/material/useMediaQuery';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login"); // redirect
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar sx={{ flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', mb: isMobile ? 1 : 0 }}>
            Ecommerce
          </Typography>
          <Search isMobile={isMobile} />
          <div>
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
                Home
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/allpages" selected={location.pathname === "/allpages"}>
                Pages
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/admin/addproduct" selected={location.pathname === "/allpages"}>
                Add Product
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/admin/gallery" selected={location.pathname === "/allpages"}>
                Gallery
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/user" selected={location.pathname === "/allpages"}>
                Me
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/cart" selected={location.pathname === "/allpages"}>
                Cart
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/myorders" selected={location.pathname === "/allpages"}>
                All Orders
              </MenuItem>
            </Menu>
          </div>
          {!localStorage.getItem('token') ? (
            <div>
              <Button variant="contained" sx={{ mx: 1 }} component={Link} to="/login">Login</Button>
              <Button variant="contained" sx={{ mx: 1 }} component={Link} to="/signup">Signup</Button>
            </div>
          ) : (
            <DialogueBox 
              text="Logout" 
              alert="Are you sure?" 
              message="Press agree to Logout from Ecommerce"
              onClickAgree={handleLogout} 
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
