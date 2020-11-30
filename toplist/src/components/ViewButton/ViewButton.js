import React from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';

const ViewButton = ({ ...other }) => {
  return (
    <IconButton {...other}>
      <VisibilityIcon />
    </IconButton>
  );
};

export default ViewButton;
