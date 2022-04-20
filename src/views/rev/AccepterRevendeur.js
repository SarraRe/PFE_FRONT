/* eslint-disable eol-last */
import React, { useState , useEffect } from 'react';
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
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
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
 
const AccepterRevendeur = () => {
  const [stateetat_rev, setstateetat_rev] = useState('')
  const params = useParams();
const navigate = useNavigate()
  const classes = useStyles();
  let initialValues = {
    id: params.id,
    etat_rev: stateetat_rev,
  };
  const [opensnak, setOpensnak] = useState(false);
  const handleClosesnak = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };
 useEffect(() => {
  axios.get('http://localhost:5000/revendeur/' + params.id)
  .then( response => { console.log(response.data[0].etat_rev) ; 
 
    setstateetat_rev(response.data[0].etat_rev)
    initialValues.etat_rev=response.data[0].etat_rev
  })

 }, [params])
  function onSubmit(values) {
    axios.put('http://localhost:5000/revendeur/put/:id', values)
      .then((response) => {
        setOpensnak(true);
        setTimeout(() => {
          navigate('/app/candidat_revendeur')
       
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
      title="AccepterRevendeurs"
    >
         <Snackbar  anchorOrigin={{ vertical: 'center',
    horizontal: 'left'}} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
        <Alert onClose={handleClosesnak} severity="success">
         Revendeur accepté 
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
                id: Yup.number().required('ID de la réclamation est requis'),
                etat_rev: Yup.string().required('Le nouveau état du revendeur est requis'),
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
                    Acceptez le revendeur
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.etat_rev && errors.etat_rev)}
                  fullWidth
                  helperText={touched.etat_rev && errors.etat_rev}
                  label="Le nouveau état du revendeur"
                  margin="normal"
                  name="etat_rev"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.etat_rev}
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
                    Accepter revendeur
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
export default AccepterRevendeur;
