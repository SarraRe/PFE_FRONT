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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {url} from 'src/utils/baseurl'
import swal from 'sweetalert';

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

const RevendeurListView = () => {
  const classes = useStyles();
  const [revendeurs, setrevendeur] = useState([]);
  const [opensnak, setOpensnak] = useState(false);
  const handleClosesnak = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };
  const fetchrevendeur = () => {
    axios.get(url+'/revendeur')
      .then((response) => {
        setrevendeur(response.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  useEffect(() => {
    fetchrevendeur();
  }, []);
  function ondelete(values) {
    console.log(values);
    swal({
      title: "Êtes-vous sûr de vouloir supprimer ce revendeur ?",
      text: "Une fois supprimé, les infos ne peuvent plus etre récupérées !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(url +`/revendeur/${values.id}`)
       
        .then((response) => {
         
          setOpensnak(true)
  axios.get(url+'/revendeur')
          .then((response) => {
            setrevendeur(response.data);
          })
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
       
        swal("Suppression annulées");
      }
    });
  
  }
  const [filteredReseult, setFilteredResult] = useState([]);
  const [filterResearch, setFilterResearch] = useState('');
  const handleCallback = (childData) => {
    setFilterResearch(childData);
  };
  React.useEffect(() => {
    setFilteredResult(revendeurs);
    setFilteredResult((revendeur) => revendeur.filter((item) => {
      return item.nomPrenom.toLowerCase().includes(
        filterResearch.toLowerCase()
      );
    }));
  }, [filterResearch, revendeurs]);
  return (
    <Page
      title="Revendeurs"
      className={classes.root}
    >
      <Snackbar  anchorOrigin={{ vertical: 'top',
    horizontal: 'center'}} open={opensnak} autoHideDuration={6000} onClose={handleClosesnak}>
        <Alert onClose={handleClosesnak} severity="success">
          Revendeur supprimé
        </Alert>
      </Snackbar>
      <Container maxWidth={false}>
        <Toolbar parentCallback={handleCallback} />
        <Box mt={3}>
          <Results revendeurs={filteredReseult}  deleterevendeur={ondelete}/>
        </Box>
      </Container>
    </Page>
  );
};

export default RevendeurListView;
