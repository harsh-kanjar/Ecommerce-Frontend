import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function Search({ isMobile, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    if (onSearch && searchQuery.trim() !== '') {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '4px 8px',
        display: 'flex',
        alignItems: 'center',
        width: isMobile ? '100%' : 500,
        height: '45px',
        borderRadius: 2,
        boxShadow: 1,
        marginBottom: isMobile ? '10px' : 0,
      }}
    >
      <InputBase
        sx={{ flex: 1, ml: 1 }}
        placeholder="Search Products..."
        inputProps={{ 'aria-label': 'Search Products...' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton sx={{ p: '10px' }} aria-label="user">
        {
          localStorage.getItem('token') ?
            <Link to='/user' title='My profile'>
              <BiUser style={{ border: '1px solid blue', borderRadius: '25px', padding: '4px', fontSize: '25px' }} />
            </Link> :
            <Link to='/login' title='Login required'>
              <BiUser style={{ border: '1px solid blue', borderRadius: '25px', padding: '4px', fontSize: '25px' }}/>
            </Link>
        }
      </IconButton>
    </Paper>
  );
}

export default Search;
