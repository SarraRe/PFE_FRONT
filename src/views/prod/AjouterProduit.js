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
import { useNavigate   } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {url} from 'src/utils/baseurl'
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100wh',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AjouterProduit = () => {
  const classes = useStyles();
  const initialValues = {
    id: '',
    Nom: '',
    Observation: '',
  };
  const navigation = useNavigate()
  const [opensnak, setOpensnak] = useState(false);
  const handleClosesnak = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };
  function onSubmit(values) {
    axios.post(url+'/produit/add', values)
      .then((response) => {
        setOpensnak(true);
        setTimeout(() => {
          navigation('/app/Produit');
        }, 2000);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Page
      className={classes.root}
      title="AjouterProduit"
    >
             <Snackbar  anchorOrigin={{ vertical: 'center',
    horizontal: 'left'}} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
        <Alert onClose={handleClosesnak} severity="success">
        Produit ajouté avec succès 
        </Alert>
      </Snackbar>
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
                id: Yup.number().integer().required('ID produit est requis'),
                Nom: Yup.string().required('Nom produit est requis'),
                Observation: Yup.string(),
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
                    Ajouter le nouveau produit
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.id && errors.id)}
                  fullWidth
                  helperText={touched.id && errors.id}
                  label="ID produit"
                  margin="normal"
                  name="id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.id}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.Nom && errors.Nom)}
                  fullWidth
                  helperText={touched.Nom && errors.Nom}
                  label="Nom produit"
                  margin="normal"
                  name="Nom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Nom}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.Observation && errors.Observation)}
                  fullWidth
                  helperText={touched.Observation && errors.Observation}
                  label="Observation"
                  margin="normal"
                  name="Observation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Observation}
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
                    Ajouter produit
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
export default AjouterProduit;