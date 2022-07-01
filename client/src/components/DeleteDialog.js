import React from 'react';

import {Button} from '@material-ui/core';

import { useDeleteBtnStyles } from '../styles/muiStyles';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteDialog = ({ handleDelete, title, isMobile }) => {
  const classes = useDeleteBtnStyles();
  return (
    <div>
        <Button
          className={classes.deleteButton}
          startIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
    </div>
  );
};

export default DeleteDialog;