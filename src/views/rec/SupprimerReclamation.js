/* eslint-disable eol-last */
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100wh',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SupprimerReclamation = () => {
  const [redirect, setRedirect] = useState(false);
  const classes = useStyles();

  const initialValues = {
    id: '',
  };

  function onSubmit(values) {
    axios.delete(`http://localhost:5000/reclamations/${values.id}`)
      .then((response) => {
        console.log(response);
        setRedirect(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (redirect) return <NavLink to="/app/Reclamations" />;
  return (
    <Page
      className={classes.root}
      title="SupprimerReclamation"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
      >
        <Container maxWidth="sm">
          <Formik
            {...{ initialValues, onSubmit }}
            validationSchema={
              Yup.object().shape({
                id: Yup.number().integer().required('ID de la réclamation est requis'),
              })
            }
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Supprimer reclamation
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.id && errors.id)}
                  fullWidth
                  helperText={touched.id && errors.id}
                  label="ID de la réclamation à supprimer"
                  margin="normal"
                  name="id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.id}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Supprimer reclamation
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default SupprimerReclamation;