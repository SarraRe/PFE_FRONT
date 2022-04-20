/* eslint-disable eol-last */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import {url} from 'src/utils/baseurl';
import swal from 'sweetalert';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Personnels = () => {
  const classes = useStyles();
  const [personnels, setpersonnels] = useState([]);
  const [opensnak, setOpensnak] = useState(false);
  const handleClosesnak = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };
  const fetchpersonnel = () => {
    axios.get(url+'/personnel')
      .then((response) => {
        console.log(response);
        setpersonnels(response.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  function onSubmit(values) {
    console.log(values);
    swal({
      title: "êtes-vous sure de vouloir supprimer ce personnel?",
      text: "Une fois supprimé, les infos ne peuvent plus êtes récupérées ! ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(url+`/personnel/${values.id_personnel}`)
        .then((response) => {
          console.log(response);
          axios.get(url+'/personnel')
          .then((response) => {
           
            setOpensnak(true)
            setpersonnels(response.data);
          })
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
     
        swal("Suppression annulée !");
      }
    });

  }

  useEffect(() => {
    fetchpersonnel();
  }, []);

  const [filteredReseult, setFilteredResult] = useState([]);
  const [filterResearch, setFilterResearch] = useState('');
  const handleCallback = (childData) => {
    setFilterResearch(childData);
  };
  React.useEffect(() => {
    setFilteredResult(personnels);
    setFilteredResult((personnel) => personnel.filter((item) => {
      return item.nom_prenom.toLowerCase().includes(
        filterResearch.toLowerCase()
      );
    }));
  }, [filterResearch, personnels]);
  return (
    <Page
      title="Personnels"
      className={classes.root}
    >
       <Snackbar  anchorOrigin={{ vertical: 'top',
    horizontal: 'center'}} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
        <Alert onClose={handleClosesnak} severity="success">
        Personnel suprimé avec succès 
        </Alert>
      </Snackbar>
      <Container maxWidth={false}>
        <Toolbar parentCallback={handleCallback} />
        <Box mt={3}>
          <Results  personnels={filteredReseult} deleteuser={ onSubmit} />
        </Box>
      </Container>
    </Page>
  );
};

export default Personnels;