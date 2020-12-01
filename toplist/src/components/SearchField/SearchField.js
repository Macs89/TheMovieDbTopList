import React from 'react';
import propTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import useStyles from './SearchField.style';

const SearchField = ({ placeholder, ...other }) => {
  const classes = useStyles();

  return (
    <Box className={classes.searchField} pl={1}>
      <SearchIcon />
      <InputBase
        fullWidth
        placeholder={placeholder}
        classes={{ input: classes.input }}
        {...other}
      />
    </Box>
  );
};

SearchField.defaultProps = {
  placeholder: 'Search...',
};
SearchField.propTypes = {
  placeholder: propTypes.string,
};

export default SearchField;
