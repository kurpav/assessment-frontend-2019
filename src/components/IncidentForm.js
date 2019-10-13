import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    width: 500,
    margin: '50px auto',
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export function IncidentForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    title: '',
    assignee: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const submit = event => {
    event.preventDefault();
    props.submitted(values);
  };

  return (
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      onSubmit={submit}
    >
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input
          id="title"
          value={values.title}
          onChange={handleChange('title')}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="assignee">Assignee</InputLabel>
        <Select
          value={values.assignee}
          onChange={handleChange('assignee')}
          inputProps={{
            name: 'assignee',
            id: 'assignee'
          }}
        >
          <MenuItem value="engineer">Engineer</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
      >
        Save
      </Button>
    </form>
  );
}
