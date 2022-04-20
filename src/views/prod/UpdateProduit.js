/* eslint-disable eol-last */
import React, { useEffect , useState } from 'react';
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
import { useNavigate , useParams  } from 'react-router-dom';
import {url} from 'src/utils/baseurl'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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

const UpdateProduit = () => {
  const navigate = useNavigate()
  const params = useParams();
  const classes = useStyles();
  const [opensnak, setOpensnak] = useState(false);
  const handleClosesnak = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };
  const [stateNom, setstateNom] = useState('')
  const [stateobservation, setstateobservation] = useState('')
useEffect(() => {
  axios.get(url+`/produit/${params.id}`)
  .then((response) => {
    console.log(response)
    if(response.data.length > 0) {
  const Nom = response.data[0].Nom ;
  initialValues.Nom=Nom;
  const Observation =response.data[0].Observation  ;
  initialValues.Observation=Observation;
  setstateNom(Nom)
  setstateobservation(Observation)
    }
  })
 
}, [params])

let initialValues = {
  id: params.id,
  Nom: stateNom,
  Observation: stateobservation,
};
  function onSubmit(values) {
    axios.put(url+'/produit/:id', values)
      .then((response) => {
        setOpensnak(true);
        setTimeout(() => {
          navigate('/app/Produit')
        }, 2000);
        
      
      })
      .catch((error) => {
        console.log(error);
      });
  }
const enableReinitialize = true;

  return (
    <Page
      className={classes.root}
      title="UpdateProduit"
    >
       <Snackbar  anchorOrigin={{ vertical: 'center',
    horizontal: 'left'}} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
        <Alert onClose={handleClosesnak} severity="success">
        Produit mis à jour avec succès 
        </Alert>
      </Snackbar>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
      >
        <Container maxWidth="sm">
          <Formik
       enableReinitialize
            {...{ initialValues,enableReinitialize , onSubmit }}
            validationSchema={
              Yup.object().shape({
                id: Yup.number().required('ID du produit est requis'),
                Nom: Yup.string().required('Le nom du produit est requis'),
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
              resetForm,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Mettez à jour le produit
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.id && errors.id)}
                  fullWidth
                  helperText={touched.id && errors.id}
                  label="ID du produit"
                  margin="normal"
                  name="id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.id}
                  variant="outlined"
                  disabled
                />
                <TextField
                  error={Boolean(touched.Nom && errors.Nom)}
                  fullWidth
                  helperText={touched.Nom && errors.Nom}
                  label="Nom de la nouvelle version"
                  margin="normal"
                  name="Nom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Nom}
                  defaultValue={stateNom}
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
                  defaultValue={stateobservation}
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
                    Mettre à jour produit
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
export default UpdateProduit;