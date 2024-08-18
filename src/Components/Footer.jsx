import React from 'react';
import { Container, Grid, Typography, Box, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '40px 0',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Box>
              <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                About Us
              </Link>
              <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Careers
              </Link>
              <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Press
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Box>
              <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Contact Us
              </Link>
              <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                FAQ
              </Link>
              <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Shipping & Returns
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box>
              <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Terms of Service
              </Link>
              <Link href="#" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Disclaimer
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <IconButton href="#" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="#" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="#" color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="inherit">
            © 2024 Ecommerce. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
