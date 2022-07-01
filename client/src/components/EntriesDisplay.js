import React from 'react';
import { useEntryContext } from '../context/entry/entryState';
import Card from './Card';
import { Link as RouterLink } from 'react-router-dom';
import { resetEditValues } from '../context/entry/entryReducer';
import { Button } from '@material-ui/core';
import { useTopPanelStyles } from '../styles/muiStyles';
import PostAddIcon from '@material-ui/icons/PostAdd';


const EntriesDisplay = () => {
  const [{ entries},dispatch] = useEntryContext();
  const classes = useTopPanelStyles();
  
  return (
    <div>
      <Button
          className={classes.desktopButton}
          component={RouterLink}
          to="/add_update"
          size="large"
          startIcon={<PostAddIcon />}
          onClick={() => dispatch(resetEditValues())}
        >
          Add Entry
      </Button>
      {entries.map((entry) => <Card key={entry.id} entry={entry} />)}
    </div>
  );
};

export default EntriesDisplay;