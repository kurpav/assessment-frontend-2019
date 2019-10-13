import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    margin: '0 5px'
  },
}));

export function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link className={classes.link} to="/">Home</Link>
          </Typography>
          <Typography variant="h6">
            <Link className={classes.link} to="/create">Create</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
