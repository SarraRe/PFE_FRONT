import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, parentCallback, ...rest }) => {
  const classes = useStyles();

  const handleChange = (event) => {
    parentCallback(event.target.value);
    event.preventDefault();
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/action/AjoutRevendeur"
        >
          Ajouter Revendeur
        </Button>
        &apos;
        {/* <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/action/SupprimerRevendeur"
        >
          supprimer revendeur
        </Button> */}
        &apos;
        {/* <Button
          color="primary"
          variant="contained"
          component={Link}
          to="/action/AccepterRevendeur"
        >
          Accepter revendeur
        </Button> */}
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Chercher revendeur (par nom-pr??nom)"
                variant="outlined"
                onInput={handleChange}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  parentCallback: PropTypes.func
};

export default Toolbar;
