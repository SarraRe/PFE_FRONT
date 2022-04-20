import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@material-ui/core';


const NotFoundView = () => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <Typography
          align="center"
          color="textPrimary"
          variant="h1"
        >
          404: La page à laquelle vous essayez d'accéder est introuvable
          </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="subtitle2"
        >
          Vous etes arrivé ici par erreur ssayez de vous assurer
          que vous avez saisi le bon chemin
          </Typography>
      </Container>
    </Box>
  );
};

export default NotFoundView;
