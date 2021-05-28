import React from 'react';
import todos from '../api/todos';

export class Form extends React.Component {
  state = {
    todos: todos,
  }

  addTodo = event => [
    this.setState(state => ({
      todos: [
        ...state.todos,
        event.target.value,
      ],
    })),
  ]

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.addTodo('a', 1);
  }

  render() {
    return (

    );
  }
}
