/* eslint-disable eol-last */
import React, { useState  , useEffect} from 'react';
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
import {url} from 'src/utils/baseurl'
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

const UpdatePersonnel = () => {
  const params = useParams();
  const navigation = useNavigate()
  const classes = useStyles();

  const [opensnak, setOpensnak] = useState(false);
  const [initdata, setdata] = useState({
    id_personnel: params.id,
    nom_prenom: '',
    mail: '',
    tel: '',
  });
  const handleClosesnak = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };
useEffect(() => {
  axios.get(url+`/personnel/${params.id}`)
  .then((response) => {
    console.log(response)
    if(response.data.length > 0) {
   
  const Nom = response.data[0].nom_prenom ;
  const mail =response.data[0].Mail  ;
  const tel =response.data[0].tel  ;
  setdata({...initdata,tel:tel,mail:mail,nom_prenom:Nom})
    }
  })
}, [params.id])


 
  const initialValues = initdata ;
  const enableReinitialize = true;
  function onSubmit(values) {
    axios.put(url+'/personnel/:id_personnel', values)
      .then((response) => {
        setOpensnak(true);
        setTimeout(() => {
          navigation('/app/Personnels');
        }, 2000);
     
     
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  return (
    <Page
      className={classes.root}
      title="UpdatePersonnel"
    >
          <Snackbar  anchorOrigin={{ vertical: 'center',
    horizontal: 'left'}} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
        <Alert onClose={handleClosesnak} severity="success">
        Personnel mis à jour 
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
                id_personnel: Yup.number().required('ID du personnel est requis'),
                nom_prenom: Yup.string().required('Le nom et le prénom sont requis'),
                mail: Yup.string().email('Email doit etre valide').required('Email est requis'),
                tel: Yup.string().required('Le numéro de téléphone est requis'),
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
                    Mettez à jour le personnel
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.id_personnel && errors.id_personnel)}
                  fullWidth
                  helperText={touched.id_personnel && errors.id_personnel}
                  label="ID du personnel"
                  margin="normal"
                  name="id_personnel"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.id_personnel}
                  variant="outlined"
                  disabled
                />
                <TextField
                  error={Boolean(touched.nom_prenom && errors.nom_prenom)}
                  fullWidth
                  helperText={touched.nom_prenom && errors.nom_prenom}
                  label="Nom et prénom"
                  margin="normal"
                  name="nom_prenom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nom_prenom}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.mail && errors.mail)}
                  fullWidth
                  helperText={touched.mail && errors.mail}
                  label="Email"
                  margin="normal"
                  name="mail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mail}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.tel && errors.tel)}
                  fullWidth
                  helperText={touched.tel && errors.tel}
                  label="Numéro de téléphone"
                  margin="normal"
                  name="tel"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tel}
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
                    Mettre à jour personnel
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
export default UpdatePersonnel;