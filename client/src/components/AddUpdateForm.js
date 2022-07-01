import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AlertBox from './AlertBox';
import entryService from '../services/entries';
import { useEntryContext } from '../context/entry/entryState';
import {
  addEntry,
  updateEntry,
  resetEditValues,
  toggleIsLoading,
} from '../context/entry/entryReducer';
import notify from '../utils/notifyDispatcher';
import {
  TextField,
  Button,
  Typography,
  Paper,
} from '@material-ui/core/';
import { useFormStyles } from '../styles/muiStyles';
import TitleIcon from '@material-ui/icons/Title';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';
import PostAddIcon from '@material-ui/icons/PostAdd';
import EditIcon from '@material-ui/icons/Edit';
import BackspaceIcon from '@material-ui/icons/Backspace';

const initialInputValues = {
  title: '',
  link: '',
  description: '',
  type: 'article',
  tags: [],
};

const AddUpdateForm = () => {
  const [entry, setEntry] = useState(initialInputValues);
  const [error, setError] = useState('');
  const [{ editValues, isLoading }, dispatch] = useEntryContext();
  const history = useHistory();
  const classes = useFormStyles();

  useEffect(() => {
    if (editValues) {
      setEntry(editValues);
    }
  }, [editValues]);

  const { title, link, description } = entry;

  const handleOnChange = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
    }); 
  };

  const handleClearInput = () => {
    if (editValues) {
      dispatch(resetEditValues());
    }
    setEntry(initialInputValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(toggleIsLoading());
      if (editValues) {
        const entryRes = await entryService.update(editValues.id, entry);
        dispatch(updateEntry(entryRes));
        notify(
          dispatch,
          `Entry "${editValues.title}" has been successfully updated.`,
          'success'
        );
        dispatch(resetEditValues());
      } else
      {
        const entryRes = await entryService.create(entry);
        dispatch(addEntry(entryRes));
        notify(
          dispatch,
          `New entry "${entryRes.title}" has been successfully added!`,
          'success'
        );
      }

      dispatch(toggleIsLoading());
      setEntry(initialInputValues);
      history.push('/');
    } catch (err) {
      dispatch(toggleIsLoading());

      const errRes = err?.response?.data;

      if (
        errRes?.error.includes('title') &&
        errRes?.error.includes('allowed length (40)')
      ) {
        return setError(`Title field's maximum character limit is 40. `);
      } else if (
        errRes?.error.includes('description') &&
        errRes?.error.includes('allowed length (250)')
      ) {
        return setError(`Description field's maximum character limit is 250. `);
      } else if (errRes?.error) {
        return setError(errRes.error);
      } else {
        return setError(err.message);
      }
    }
  };

  return (
    <Paper>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Typography
          variant='h6'
          className={classes.formTitle}
        >
          {editValues ? 'UPDATE ENTRY' : 'ADD NEW ENTRY'}
        </Typography>
        <div className={classes.input}>
          <TitleIcon className={classes.inputIcon} />
          <TextField
            required
            label="Title"
            value={title}
            name="title"
            onChange={handleOnChange}
            fullWidth
          />
        </div>
        <div className={classes.input}>
          <DescriptionIcon className={classes.inputIcon} />
          <TextField
            required
            multiline
            label="Description"
            value={description}
            name="description"
            onChange={handleOnChange}
            fullWidth
          />
        </div>
        <div className={classes.input}>
          <LinkIcon className={classes.inputIcon} />
          <TextField
            required
            label="Link"
            value={link}
            name="link"
            onChange={handleOnChange}
            fullWidth
          />
        </div>
        <div className={classes.buttonGroup}>
          <Button
            variant="outlined"
            size='medium'
            startIcon={<BackspaceIcon />}
            onClick={handleClearInput}
          >
            CLEAR
          </Button>
          <Button
            type="submit"
            size='medium'
            startIcon={editValues ? <EditIcon /> : <PostAddIcon />}
            disabled={isLoading}
            style={{background:"black", color:"snow"}}
          >
            {editValues
              ? isLoading
                ? 'Updating Entry'
                : 'Update Entry'
              : isLoading
              ? 'Adding Entry'
              : 'Add Entry'}
          </Button>
        </div>
        {error && (
          <AlertBox
            message={error}
            severity="error"
            clearError={() => setError(null)}
          />
        )}
      </form>
    </Paper>
  );
};

export default AddUpdateForm;
