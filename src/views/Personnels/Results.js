/* eslint-disable eol-last */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';
import { useNavigate  } from 'react-router-dom';
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

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Row = (props) => {
  const { personnel,deleteuser,navigation  } = props;
  const  handelclieck = (el) => {
    deleteuser(el)
  }
  
  return (
    <TableBody>
      <TableRow
        hover
      >
        <TableCell>{personnel.nom_prenom}</TableCell>
        <TableCell>{personnel.Mail}</TableCell>
        <TableCell>{personnel.tel}</TableCell>
        <TableCell ><Button onClick={() => handelclieck(personnel)}>
        <DeleteForeverIcon /> </Button> {" "} <Button onClick={() => navigation(`/action/UpdatePersonnel/${personnel.id_personnel}`)}><CreateIcon/></Button>
      </TableCell>
      </TableRow>
    </TableBody>
  );
};

const Results = ({ className, personnels,deleteuser }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(5);
  const navigate = useNavigate()
  const [page, setPage] = useState(0);
  const emptyRows = limit - Math.min(limit, personnels.length - page * limit);
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
           
                <TableCell>Nom et prénom</TableCell>
                <TableCell>Mail</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            {(limit > 0
              ? personnels.slice(page * limit, page * limit + limit)
              : personnels
            ).map((personnel) => (
              <Row key={personnel.id} personnel={personnel}  deleteuser={deleteuser}  navigation={navigate}/>
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
        count={personnels.length}
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
  personnels: PropTypes.array.isRequired,
};

export default Results;