import React from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const TableCellWithSorting = ({ order, orderBy, name, handleClick }) => {
  return (
    <TableCell sortDirection={orderBy === name ? order : false}>
      <TableSortLabel
        active={orderBy === name}
        direction={orderBy === name ? order : 'asc'}
        onClick={(event) => handleClick(event, name)}
      >
        {_.capitalize(name)}
      </TableSortLabel>
    </TableCell>
  );
};

TableCellWithSorting.propTypes = {
  name: propTypes.string.isRequired,
  order: propTypes.string.isRequired,
  orderBy: propTypes.string.isRequired,
  handleClick: propTypes.func.isRequired,
};

export default TableCellWithSorting;
