import React, { useEffect , useState} from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {decodetoken} from 'src/utils/baseurl'
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  ShoppingBag as ShoppingBagIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';




const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Clients'
  },
  {
    href: '/app/candidat_revendeur',
    icon: UsersIcon,
    title: 'Revendeurs'
  },

  {
    href: '/app/Reclamations',
    icon: ShoppingBagIcon,
    title: 'Les réclamations'
  },

];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const token = decodetoken();
  const [isconnected, setisconnected] = useState(token);
  let  user = {
    avatar: '',
    Mail: ''
  }
  if(token) {
     user = {
      avatar: '',
      Mail: token.Mail,
    };
  }
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/"
        />
          <Typography
          color="textSecondary"
          variant="h5"
        >
          Bienvenue
        </Typography>
        <Typography
          color="textSecondary"
          variant="h5"
        >
          {user.Mail}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          {console.log('token',token)}
         { token && token.role=="admin"  &&  <NavItem
              href='/app/Personnels'
              title={'Personnel'}
              icon="UsersIcon"
            />}
            
           {  token && token.role=="admin"  && <NavItem
              href='/app/Produit'
              title='Produits: Logiciel'
              icon='ShoppingBagIcon'
            /> }
             
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <> {isconnected && 
      <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
      </>
         }
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
