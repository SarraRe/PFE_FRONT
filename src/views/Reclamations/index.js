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

const Reclamations = () => {
  const classes = useStyles();
  const [reclamations, setreclamations] = useState([]);
  const [opensnak, setOpensnak] = useState(false);
  const handleClosesnak = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };
  const fetchreclamation = () => {
    axios.get(url + '/reclamations')
      .then((response) => {
        console.log(response);
        setreclamations(response.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  useEffect(() => {
    fetchreclamation();
  }, []);
 function deletereclamation (values) {
  swal({
    title: "êtes-vous sûr de vouloir supprimer cette réclamation ?",
    text: "Une fois supprimé, vous ne pourrez plus récupérer cette reclamation !",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      axios.delete(url+`/reclamations/${values.id}`)
      .then((response) => {
        setOpensnak(true)
        axios.get(url+'/reclamations')
      .then((response) => {
        console.log(response);
        
        setreclamations(response.data);
      })
      })
    
      
      .catch((error) => {
        console.log(error);
      });
    } else {
    
      swal("Suppression annulée");
    }
  });
 }
  const [filteredReseult, setFilteredResult] = useState([]);
  const [filterResearch, setFilterResearch] = useState('');
  const handleCallback = (childData) => {
    setFilterResearch(childData);
  };
  React.useEffect(() => {
    setFilteredResult(reclamations);
    setFilteredResult((reclamation) => reclamation.filter((item) => {
      return item.nom_prénom.toLowerCase().includes(
        filterResearch.toLowerCase()
      );
    }));
  }, [filterResearch, reclamations]);
  return (
    <Page
      title="Reclamations"
      className={classes.root}
    >    <Snackbar  anchorOrigin={{ vertical: 'top',
    horizontal: 'center'}} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
        <Alert onClose={handleClosesnak} severity="success">
        Réclamation supprimée avec succès 
        </Alert>
      </Snackbar>
      <Container maxWidth={false}>
        <Toolbar parentCallback={handleCallback} />
        <Box mt={3}>
          <Results reclamations={filteredReseult} deletereclamation={deletereclamation}/>
        </Box>
      </Container>
    </Page>
  );
};

export default Reclamations;