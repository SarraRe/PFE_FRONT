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
 
const UpdateReclamation = () => {
  const [stateetat_rec, setstateetat_rec] = useState('')
  const params = useParams();
const navigate = useNavigate()
  const classes = useStyles();
  let initialValues = {
    id: params.id,
    etat_rec: stateetat_rec,
  };
  const [opensnak, setOpensnak] = useState(false);
  const handleClosesnak = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };
 useEffect(() => {
  axios.get('http://localhost:5000/reclamations/' + params.id)
  .then( response => { console.log(response.data[0].etat_rec) ; 
 
    setstateetat_rec(response.data[0].etat_rec)
    initialValues.etat_rec=response.data[0].etat_rec
  })

 }, [params])
  function onSubmit(values) {
    axios.put('http://localhost:5000/reclamations/put/:id', values)
      .then((response) => {
        setOpensnak(true);
        setTimeout(() => {
          navigate('/app/Reclamations')
       
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
      title="UpdateReclamation"
    >
         <Snackbar  anchorOrigin={{ vertical: 'center',
    horizontal: 'left'}} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
        <Alert onClose={handleClosesnak} severity="success">
         Réclamation mise à jour avec succès 
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
                etat_rec: Yup.string().required('Le nouveau état de la réclamation est requis'),
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
                    Mettez à jour la réclamation
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.etat_rec && errors.etat_rec)}
                  fullWidth
                  helperText={touched.etat_rec && errors.etat_rec}
                  label="Le nouveau état de la réclamation"
                  margin="normal"
                  name="etat_rec"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.etat_rec}
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
                    Mettre à jour reclamation
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
export default UpdateReclamation;