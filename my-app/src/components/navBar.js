import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Navbar, NavbarBrand, NavbarToggler, NavbarText, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, 
    DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

function NavBar(){
    return (
      
  <div>
  <Navbar
    color="light"
    expand="md"
    fixed="top"
    light
  >
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar >
      <Nav
        className="me-auto"
        navbar
      >
      
      {/* site name */}
        <NavItem>
          <NavLink href="/components/">
            Grateful Gardens
          </NavLink>
        </NavItem>
      </Nav>

    {/* search bar and icon */}
    <div class="form-container">
        <form class="form">
          <input id="search" type="text" class="input" placeholder="search..."/>
          <SearchIcon fontSize="large"/>
          {/* <img src="https://pngpart.com/images/bt/google-search-icon-11.png" id="clear" class="clear-results"/> */}
        </form>
    </div>

      
      {/* profile icon */}
        {/* <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"/> */}
        <AccountCircleIcon font-size="large"/>

    </Collapse>
  </Navbar>
  </div>
  );
}






export default NavBar;

