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
  const { produit  ,navigation} = props;
  return (
    <TableBody>
      <TableRow
        hover
      >
        <TableCell>{produit.id}</TableCell>
        <TableCell>{produit.Nom}</TableCell>
        <TableCell>{produit.Observation}</TableCell>
        <TableCell><Button onClick={() => navigation(`/action/UpdateProduit/${produit.id}`)}><CreateIcon/></Button></TableCell>
      </TableRow>
    </TableBody>
  );
};

const Results = ({ className, produits }) => {
 const navigate = useNavigate()
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const emptyRows = limit - Math.min(limit, produits.length - page * limit);
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
                <TableCell>ID produit</TableCell>
                <TableCell>Nom produit</TableCell>
                <TableCell>Observation</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            {(limit > 0
              ? produits.slice(page * limit, page * limit + limit)
              : produits
            ).map((produit) => (
              <Row key={produit.id} produit={produit}  navigation ={navigate}/>
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
        count={produits.length}
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
  produits: PropTypes.array.isRequired,
};

export default Results;