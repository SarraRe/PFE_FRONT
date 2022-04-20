import React, { useState, useEffect } from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import 'src/App.css';
import { CSSTransition } from 'react-transition-group';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {decodetoken} from 'src/utils/baseurl'



const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  sectionDesktopRight: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionDesktopLeft: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Navbar(props) {
  const [isTransparent, setIsTransparent] = useState(true);
  const [scroll, setScroll] = useState(0);
 const navigation = useNavigate()
  useEffect(() => {
    function updatePosition() {
      setScroll(window.pageYOffset);
    }
    window.addEventListener('scroll', updatePosition);
    if (scroll > 10) setIsTransparent(false)
    else setIsTransparent(true);
    return () => window.removeEventListener('scroll', updatePosition);
  }, [scroll]);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const logout = () => {
    localStorage.clear();
    navigation('/')
  }
  const goto_mysace = () => {
    const tokenparser = decodetoken();
    if (tokenparser.role=="client")
    navigation('/interface1')
    if (tokenparser.role=="revendeur")
    navigation('/interface2')
    if (tokenparser.role=="admin" ||tokenparser.role=="personnel" )
    navigation('/app/dashboard')
  }



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/*<MenuItem onClick={handleMenuClose}>revendeur</MenuItem>
      <MenuItem onClick={handleMenuClose}>réclamations</MenuItem>*/}
    </Menu>
  );


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          style={{ color: "black" }} component={RouterLink} to="/revendeur">Revendeur
        <AccountCircle />
        </IconButton>
        
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          style={{ color: "black" }} component={RouterLink} to="/auth1">Se connecter
          <AccountCircle />
        </IconButton>
      </MenuItem>
   
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          style={{ color: "black" }} component={RouterLink} to="/services">Services
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.grow}>
        <CSSTransition
          in={isTransparent}
          timeout={3000}
          classNames="navScroll"
        >
          <div className="navbar">
            <Toolbar>
              <Button style={{ color: "white" }} component={RouterLink} to="/">Home</Button>
              <div className={classes.sectionDesktopRight}>
                <Button style={{ color: "white" }} component={RouterLink} to="/services">Services</Button>
                {localStorage.getItem('user_connected')? <Button style={{ color: "white" }} onClick={goto_mysace}>Mon espace </Button>:<Button style={{ color: "white" }} component={RouterLink} to="/revendeur">Revendeur</Button> }
                {/* <Button style={{ color: "white" }} component={RouterLink} to="/réclamations">Réclamations</Button> */}
               {localStorage.getItem('user_connected')? <Button style={{ color: "white" }} onClick={logout}>Se deconnecter</Button> : <Button style={{ color: "white" }} component={RouterLink} to="/auth1">Se connecter</Button>}
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktopLeft}>
                {/*<IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  style={{ color: "white" }}
                >
                  <AccountCircle />
                </IconButton> */}
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  style={{ color: "white" }}
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </div>
        </CSSTransition>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </ThemeProvider>
  );
}
