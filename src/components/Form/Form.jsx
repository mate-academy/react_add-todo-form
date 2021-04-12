import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export class Form extends React.Component {
  state = {
    todoTitle: '',
    selectedNameId: 0,
    todoError: false,
    nameError: false,
  }

  handleTodo = (e) => {
    this.setState({
      todoTitle: e.target.value,
      todoError: false,
    });
  }

  handleName = (e) => {
    this.setState({
      selectedNameId: +e.target.value,
      nameError: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { todoTitle, selectedNameId } = this.state;

    if (!todoTitle || !selectedNameId) {
      this.setState({
        todoError: !todoTitle,
        nameError: !selectedNameId,
      });

      return;
    }

    this.props.addTodo(todoTitle, selectedNameId);

    this.setState({
      todoTitle: '',
      selectedNameId: 0,
      todoError: false,
      nameError: false,
    });
  }

  render() {
    const { todoTitle, selectedNameId, todoError, nameError } = this.state;
    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <TextField
            id="standard-basic"
            type="text"
            value={todoTitle}
            placeholder="Enter the title"
            onChange={this.handleTodo}
          />
          {todoError && (
          <div className="error">
            Please enter the title
          </div>
          )}

          <Select
            id="demo-simple-select"
            value={selectedNameId}
            onChange={this.handleName}
          >
            <MenuItem value="0">
              Please choose a user
            </MenuItem>
            {users.map(({ id, name }) => (
              <MenuItem
                key={id}
                value={id}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
          {nameError && (
            <div className="error">
              User not selected
            </div>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </Grid>
      </form>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
