import React from 'react';
import { useHistory } from 'react-router-dom';
import { useEntryContext } from '../context/entry/entryState';
import {
  removeEntry,
  setEditValues,
} from '../context/entry/entryReducer';
import TimeAgo from 'timeago-react';
import DeleteDialog from './DeleteDialog';
import entryService from '../services/entries';
import notify from '../utils/notifyDispatcher';

import {
  Paper,
  Typography,
  useMediaQuery,
  Link,
  Button,
  Divider,
} from '@material-ui/core';
import { useCardStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';
import WebIcon from '@material-ui/icons/Web';
import EditIcon from '@material-ui/icons/Edit';

const Card = ({ entry }) => {
  const {
    id,
    title,
    link,
    description,
    createdAt,
    updatedAt,
  } = entry;

  const [,dispatch] = useEntryContext();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useCardStyles()();

  const handleEdit = () => {
    dispatch(setEditValues(entry));
    history.push('/add_update');
  };

  const handleDelete = async () => {
    try {
      dispatch(removeEntry(id));
      await entryService.remove(id);
      notify(dispatch, `Successfully deleted "${title}"!`, 'success');
    } catch (err) {
      if (err?.response?.data?.error) {
        notify(dispatch, `${err.response.data.error}`, 'error');
      } else {
        notify(dispatch, `${err.message}`, 'error');
      }
    }
  };

  const formattedLink = link.startsWith('http') ? link : `https://${link}`;
  const iconSize = isMobile ? 'small' : 'large';
  const iconStyle = { marginRight: 8 };

  return (
    <Paper className={classes.root} variant="outlined">
      <div className={classes.cardTitle}>
        <Typography variant="h6" className={classes.linkTitle}>
            <WebIcon style={iconStyle} fontSize={iconSize} />{title}
        </Typography>
        <div className={classes.endButtons}>
            <>
              <Button
                onClick={handleEdit}
                startIcon={<EditIcon />}
                className={classes.edit}
              >
                Edit
              </Button>
              <DeleteDialog
                handleDelete={handleDelete}
                title={title}
                isMobile={isMobile}/>
            </>
        </div>
      </div>
      <Divider />
      <div>
        <Link
          href={formattedLink}
          color="secondary"
          className={classes.link}
        >
          <LinkIcon style={{ marginRight: 8 }} />
          {formattedLink}
        </Link>
        <Typography className={classes.description}>
          {description}
        </Typography>
        <Typography variant="body2" className={classes.addedTime}>
            <span>
              Added:{' '}
              <TimeAgo datetime={createdAt} className={classes.timestamp} />
            </span>
          {createdAt !== updatedAt ? (
              <span>
                {' '}
                | Last modified:{' '}
                <TimeAgo
                  datetime={updatedAt}
                  className={classes.timestamp}
                />{' '}
              </span>
          ) : null}
        </Typography>
      </div>
    </Paper>
  );
};

export default Card;