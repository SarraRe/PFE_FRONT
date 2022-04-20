import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import {url} from '../../../utils/baseurl'
import axios from 'axios';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
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

const CustomerListView = () => {
  const classes = useStyles();
  const [clientsProducts, setClientsProducts] = useState([]);
  const [opensnak, setOpensnak] = useState(false);
  const handleClosesnak = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpensnak(false);
  };
  
  const fetchClientsProducts = () => {
    axios.get(url+'/produitClient/produits_client')
      .then((response) => {
        console.log(response);
        setClientsProducts(response.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  useEffect(() => {
    fetchClientsProducts();
  }, []);

  const [filteredReseult, setFilteredResult] = useState([]);
  const [filterResearch, setFilterResearch] = useState('');
  const handleCallback = (childData) => {
    setFilterResearch(childData);
  };
  React.useEffect(() => {
    setFilteredResult(clientsProducts);
    setFilteredResult((client) => client.filter((item) => {
      return item.Code.toLowerCase().includes(
        filterResearch.toLowerCase()
      );
    }));
  }, [filterResearch, clientsProducts]);
  return (
    <Page
      title="Customers"
      className={classes.root}
    >
      <Container maxWidth={false}>
        <Toolbar parentCallback={handleCallback} />
        <Box mt={3} >
          <div>
          <Results customers={filteredReseult} />
          </div>
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
