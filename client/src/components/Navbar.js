// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <nav>
//       <Link to="/home">Home</Link>
//       <Link to="/login">Login</Link>
//       <Link to="/register">Register</Link>
//     </nav>
//   );
// }

// export default Navbar;

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MERN Blog
        </Typography>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/register">Register</Button>
        <Button color="inherit" component={Link} to="/home">Home</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
