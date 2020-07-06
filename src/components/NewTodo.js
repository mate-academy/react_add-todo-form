import React from 'react';
import PropTypes from 'prop-types';

export class NewTodo extends React.Component {
  state = {
    addTodo: this.props.addTodo,
    todo: {
      userId: 1,
      id: 1,
      title: 'hello',
      completed: true,
    },
  }

  submit = (event) => {
    event.preventDefault();
    this.state.addTodo(this.state.todo);
  }

  render() {
    const todo1 = { ...this.state.todo };

    return (
      <form onSubmit={this.submit}>
        <input
          type="text"
          onChange={(event) => {
            todo1.title = event.target.value;

            this.setState(prev => ({
              todo: { ...todo1 },
            }));
          }}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
