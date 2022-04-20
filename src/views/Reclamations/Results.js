/* eslint-disable eol-last */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Row = (props) => {
  const { reclamation, deletereclamation, navigation } = props;
  return (
    <TableBody>
      <TableRow
        hover
      >
        <TableCell>{reclamation.id}</TableCell>
        <TableCell>{new Intl.DateTimeFormat('en-GB').format(new Date(reclamation.date))}</TableCell>
        <TableCell>{reclamation.nom_prénom}</TableCell>
        <TableCell>{reclamation.mail}</TableCell>
        <TableCell>{reclamation.téléphone}</TableCell>
        <TableCell>{reclamation.objet}</TableCell>
        <TableCell>{reclamation.clients_id}</TableCell>
        <TableCell>{reclamation.Types_réclamations_id}</TableCell>
        <TableCell>{reclamation.produits_id}</TableCell>
        <TableCell>{reclamation.etat_rec}</TableCell>
        <TableCell>{reclamation.revendeur_id}</TableCell>
        <TableCell ><Button onClick={() => deletereclamation(reclamation)}>
          <DeleteForeverIcon />
        </Button> {" "} <Button onClick={() => navigation(`/action/UpdateReclamation/${reclamation.id}`)}>
            <CreateIcon />
          </Button> </TableCell>
      </TableRow>
    </TableBody>
  );
};

const Results = ({ className, reclamations, deletereclamation }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const emptyRows = limit - Math.min(limit, reclamations.length - page * limit);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
    // {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Nom et prénom</TableCell>
                <TableCell>Mail</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>objet</TableCell>
                <TableCell>clients ID</TableCell>
                <TableCell>Types réclamations ID</TableCell>
                <TableCell>produits ID</TableCell>
                <TableCell>Etat de la réclamation</TableCell>
                <TableCell>ID du revendeur</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {(limit > 0
              ? reclamations.slice(page * limit, page * limit + limit)
              : reclamations
            ).map((reclamation) => (
              <Row key={reclamation.id} reclamation={reclamation} deletereclamation={deletereclamation} navigation={navigate} />
            ))}
            {emptyRows > 0 && (
              <TableBody>
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              </TableBody>
            )}
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={reclamations.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  reclamations: PropTypes.array.isRequired,
};

export default Results;