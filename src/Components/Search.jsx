import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function Search({ isMobile }) {
  return (
    <Paper
      component="form"
      sx={{
        marginRight:isMobile ? '0px':'195px',
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: isMobile ? '100%' : 500,
        height: '50px',
        marginBottom: isMobile ? '10px' : 0,
      }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Products..."
        inputProps={{ 'aria-label': 'Search Products...' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="user">
        <Link to='/user'>
          <BiUser style={{border:'1px solid blue',borderRadius:'25px',padding:'4px',fontSize:'33px'}}/>
        </Link>
      </IconButton>
    </Paper>
  );
}

export default Search;
