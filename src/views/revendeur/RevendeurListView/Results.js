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
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Row = (props) => {
  const { revendeur, deleterevendeur, navigation } = props;
  return (
    <TableBody>
      <TableRow
        hover
      >
        <TableCell>{revendeur.id}</TableCell>
        <TableCell>{revendeur.nomPrenom}</TableCell>
        <TableCell>{revendeur.societe}</TableCell>
        <TableCell>{revendeur.adresse}</TableCell>
        <TableCell>{revendeur.tel}</TableCell>
        <TableCell>{revendeur.Mail}</TableCell>
        <TableCell>{revendeur.Observations}</TableCell>
        <TableCell>{revendeur.etat_rev}</TableCell>
        <TableCell><Button onClick={() => deleterevendeur(revendeur)}>
          <DeleteForeverIcon />
        </Button> {" "} <Button onClick={() => navigation(`/action/UpdateRevendeur/${revendeur.id}`)}>
            <CreateIcon />
          </Button></TableCell>
      </TableRow>
    </TableBody>
  );
};

const Results = ({ className, revendeurs, deleterevendeur }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const emptyRows = limit - Math.min(limit, revendeurs.length - page * limit);
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
                <TableCell>ID revendeur</TableCell>
                <TableCell>nomPrenom</TableCell>
                <TableCell>Société</TableCell>
                <TableCell>Adresse</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Observations</TableCell>
                <TableCell>état revendeur</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {(limit > 0
              ? revendeurs.slice(page * limit, page * limit + limit)
              : revendeurs
            ).map((revendeur) => (
              <Row key={revendeur.id} revendeur={revendeur} deleterevendeur={deleterevendeur} navigation={navigate} />
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
        count={revendeurs.length}
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
  revendeurs: PropTypes.array.isRequired,
};

export default Results;
