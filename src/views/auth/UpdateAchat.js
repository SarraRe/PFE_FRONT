import React, { useEffect , useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { url } from '../../utils/baseurl';
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

const UpdateAchat = () => {
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
  const [stateProduits_id, setstateProduits_id] = useState('')
  const [statenbrDePostes, setstatenbrDePostes] = useState('')
  const [stateNuméro_de_série, setstateNuméro_de_série] = useState('')
  const [stateObservations, setstateObservations] = useState('')
useEffect(() => {
  axios.get(url+`/produitClient/produits_client/${params.clients_Code}`)
  .then((response) => {
    console.log(response)
    if(response.data.length > 0) {
  const Produits_id = response.data[0].Produits_id ;
  initialValues.Produits_id=Produits_id;
  const nbrDePostes = response.data[0].nbrDePostes ;
  initialValues.nbrDePostes=nbrDePostes;
  const Numéro_de_série = response.data[0].Numéro_de_série ;
  initialValues.Numéro_de_série=Numéro_de_série;
  const Observations =response.data[0].Observations  ;
  initialValues.Observations=Observations;
  setstateProduits_id(Produits_id)
  setstatenbrDePostes(nbrDePostes)
  stateNuméro_de_série(Numéro_de_série)
  setstateObservations(Observations)
    }
  })
 
}, [params])

let initialValues = {
  clients_Code: params.clients_Code,
  Produits_id: stateProduits_id,
  nbrDePostes: statenbrDePostes,
  Numéro_de_série : stateNuméro_de_série,
  Observations: stateObservations,
};

  function onSubmit(values) {
    axios.put(url+'/produitClient/:clients_Code', values)
    .then((response) => {
      setOpensnak(true);
      setTimeout(() => {
        navigate('/app/customers')
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
      title="UpdateAchat"
    >
      <Snackbar  anchorOrigin={{ vertical: 'center',
    horizontal: 'left'}} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
        <Alert onClose={handleClosesnak} severity="success">
        Achat mis à jour avec succès 
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
            {...{ initialValues,enableReinitialize, onSubmit }}
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
              resetForm,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Mettez à jour achat
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.clients_Code && errors.clients_Code)}
                  fullWidth
                  helperText={touched.clients_Code && errors.clients_Code}
                  label="Code du client"
                  margin="normal"
                  name="clients_Code"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.clients_Code}
                  variant="outlined"
                  disabled
                />
                <TextField
                  error={Boolean(touched.Produits_id && errors.Produits_id)}
                  fullWidth
                  helperText={touched.Produits_id && errors.Produits_id}
                  label="ID du produit"
                  margin="normal"
                  name="Produits_id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Produits_id}
                  defaultValue={stateProduits_id}
                  variant="outlined"
                />
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
                  defaultValue={statenbrDePostes}
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
                  defaultValue={stateNuméro_de_série}
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
                  defaultValue={stateObservations}
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
                    Mettre à jour achat
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
export default UpdateAchat;
