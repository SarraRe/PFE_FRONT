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
  Typography,
  makeStyles,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { useNavigate  } from 'react-router-dom';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Row = (props) => {
  const { customer ,navigation } = props;
  console.log(customer);
  return (
    <TableBody >
      <TableRow
        hover
      >
        <TableCell>
          <Typography
            color="textPrimary"
            variant="body1"
          >
            {customer.Nom}
          </Typography>
        </TableCell>
        <TableCell>{customer.Code}</TableCell>
        <TableCell>{customer.Mail}</TableCell>
        <TableCell>{customer.Adresse}</TableCell>
        <TableCell>{customer.tel}</TableCell>
        <TableCell>{customer.MatriculeFiscale}</TableCell>
        <TableCell>{customer.Contact}</TableCell>
        <TableCell>{customer.Activites_id}</TableCell>
        <TableCell>{customer.Observations}</TableCell>
        <TableCell>{customer.Pays_id}</TableCell>
        <TableCell>{customer.CP_Ville_CodePostal}</TableCell>
        <TableCell>{customer.CodeRevendeur}</TableCell>
        <TableCell>
          {customer.logiciels ? customer.logiciels.split(',').map((logiciel, i) => (`${logiciel} : nbrDePoste :${customer.nbrDePostes.split(',')[i]} numserie :${customer.numDeSerie.split(',')[i]}\n`)) : null}
        </TableCell>
        <TableCell><Button onClick={() => navigation(`/action/UpdateAchat/${customer.clients_Code}`)}><CreateIcon/></Button></TableCell>
      </TableRow>
    </TableBody>
  );
};

const Results = ({ className, customers }) => {
  const navigate = useNavigate()
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const emptyRows = limit - Math.min(limit, customers.length - page * limit);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
    className={clsx(classes.root, className)}
    >
      <PerfectScrollbar>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                
                <TableCell size="small" padding="none">Nom de la société</TableCell>
                <TableCell size="small" padding="none">Code du client</TableCell>
                <TableCell size="small" padding="none">Email</TableCell>
                <TableCell style={{ paddingRight: '8%' }}>Adresse</TableCell>
                <TableCell size="small">Téléphone</TableCell>
                <TableCell size="small">Matricule Fiscale</TableCell>
                <TableCell size="small" padding="none">Contact</TableCell>
                <TableCell size="small" padding="none">Activité ID</TableCell>
                <TableCell size="small">Obsevations</TableCell>
                <TableCell size="small">Code Pays</TableCell>
                <TableCell size="small" padding="none">Code Postale</TableCell>
                <TableCell size="small">Code revendeur</TableCell>
                <TableCell size="small">Logiciels</TableCell>
                <TableCell size="small">Action</TableCell>
              </TableRow>
            </TableHead>
            {(limit > 0
              ? customers.slice(page * limit, page * limit + limit)
              : customers
            ).map((customer) => (
              <Row key={customer.Code} customer={customer} navigation ={navigate} />
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
        count={customers.length}
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
  customers: PropTypes.array.isRequired,
};

export default Results;
