import React, { useState, useEffect } from 'react';
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
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { url } from '../../utils/baseurl';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100wh',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AjoutAchat = () => {
  const navigate = useNavigate()
  const [stateproduit, setstateproduit] = useState([])
  const [stateclient, setstateclient] = useState([])
  const classes = useStyles();
  const initialValues = {
    clients_Code: '',
    Produits_id: '',
    Nombre_de_postes: '',
    Numéro_de_série: '',
    Observations: '',
  };

  useEffect(() => {
    axios.get(url + '/produit')
      .then(res => {
        console.log(res);
        setstateproduit(res.data)
      })
      .catch(err => console.log(err))
      axios.get(url + '/client')
      .then(res => {
        console.log(res);
        setstateclient(res.data)
      })
      .catch(err => console.log(err))
    }, [])

  function onSubmit(values) {
    axios.post(url+'/produitClient/add', values)
      .then((response) => {
        console.log(response);
        navigate('/app/customers')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Page
      className={classes.root}
      title="AjoutAchat"
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
                clients_Code: Yup.string().required('Code Client est requis'),
                Produits_id: Yup.number().required('Produit ID est requis'),
                Nombre_de_postes: Yup.number().required('Le nombre de poste est requis'),
                Numéro_de_série: Yup.string().required('Le numéro de série est requis'),
                Observations: Yup.string(),
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
                    Ajouter le nouveau achat
                  </Typography>
                </Box>
                <FormControl style={{ width: '550px', marginBottom: '10px' }}>
                  <InputLabel >Code client</InputLabel>
                  <Select
                    error={Boolean(touched.clients_Code && errors.clients_Code)}
                    fullWidth
                    helperText={touched.clients_Code && errors.clients_Code}
                    label="Code client"
                    margin="normal"
                    name="clients_Code"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.clients_Code}
                    variant="outlined"
                  >
                    <option value=''></option>
                    {
                      stateclient.map((el, index) => {
                        return (
                          <option key={index} value={el.Code}>{el.Code}</option>)
                      })

                    }
                  </Select>
                </FormControl>
                <FormControl style={{ width: '550px', marginBottom: '10px' }}>
                  <InputLabel >Produits</InputLabel>
                  <Select
                    error={Boolean(touched.Produits_id && errors.Produits_id)}
                    fullWidth
                    helperText={touched.Produits_id && errors.Produits_id}
                    label="Produits"
                    margin="normal"
                    name="Produits_id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.Produits_id}
                    variant="outlined"
                  >
                    <option value=''></option>
                    {
                      stateproduit.map((el, index) => {
                        return (
                          <option key={index} value={el.id}>{el.Nom}</option>)
                      })

                    }
                  </Select>
                </FormControl>
                <TextField
                  error={Boolean(touched.Nombre_de_postes && errors.Nombre_de_postes)}
                  fullWidth
                  helperText={touched.Nombre_de_postes && errors.Nombre_de_postes}
                  label="Nombre de postes"
                  margin="normal"
                  name="Nombre_de_postes"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Nombre_de_postes}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.Numéro_de_série && errors.Numéro_de_série)}
                  fullWidth
                  helperText={touched.Numéro_de_série && errors.Numéro_de_série}
                  label="Numéro de série du produit"
                  margin="normal"
                  name="Numéro_de_série"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Numéro_de_série}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.Observations && errors.Observations)}
                  fullWidth
                  helperText={touched.Observations && errors.Observations}
                  label="Observations"
                  margin="normal"
                  name="Observations"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Observations}
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
                    Ajouter Achat
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
export default AjoutAchat;
