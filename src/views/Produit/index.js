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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Produit = () => {
  const classes = useStyles();
  const [produits, setproduit] = useState([]);
  const fetchproduit = () => {
    axios.get('http://localhost:5000/produit')
      .then((response) => {
        console.log(response);
        setproduit(response.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  useEffect(() => {
    fetchproduit();
  }, []);

  const [filteredReseult, setFilteredResult] = useState([]);
  const [filterResearch, setFilterResearch] = useState('');
  const handleCallback = (childData) => {
    setFilterResearch(childData);
  };
  React.useEffect(() => {
    setFilteredResult(produits);
    setFilteredResult((produit) => produit.filter((item) => {
      return item.Nom.toLowerCase().includes(
        filterResearch.toLowerCase()
      );
    }));
  }, [filterResearch, produits]);
  return (
    <Page
      title="Produits"
      className={classes.root}
    >
      <Container maxWidth={false}>
        <Toolbar parentCallback={handleCallback} />
        <Box mt={3}>
          <Results produits={filteredReseult} />
        </Box>
      </Container>
    </Page>
  );
};

export default Produit;