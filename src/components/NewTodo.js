import React from 'react';

import { Button } from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';
import TodoList from './TodoList';

import users from '../api/users';

const INVALID = 'invalid';
const EMPTY = 'empty';

class NewTodo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textTodo: '',
      error: null,
      selectName: '',
      todos: [],
      id: 1,
      complete: false,
    };

    this.textTodoChanged = this.textTodoChanged.bind(this);
    this.added = this.added.bind(this);
    this.selectChanged = this.selectChanged.bind(this);
  }

  textTodoChanged(event) {
    this.setState({
      textTodo: event.target.value,
      error: null,
    });
  }

  selectChanged(event) {
    this.setState({
      selectName: event.target.value,
      error: null,
    });
  }

  added(event) {
    event.preventDefault();

    if (this.state.textTodo.trim() === '') {
      this.setState({
        error: EMPTY,
      });

      return;
    }

    if (this.state.selectName === '') {
      this.setState({
        error: INVALID,
      });

      return;
    }

    this.setState((prevState) => ({
      ...prevState,
      todos: [
        ...prevState.todos,
        {
          textTodo: prevState.textTodo,
          selectName: prevState.selectName,
          complete: prevState.complete,
          id: prevState.id,
        },
      ],
      id: prevState.id + 1,
      textTodo: '',
      selectName: '',
    }));
  }

  render() {
    const { error } = this.state;
    const errorText = {
      [EMPTY]: 'New task field is empty',
      [INVALID]: 'Please choose a user',
    };

    return (
      <>
        <Form onSubmit={this.added}>
          <label>New task!</label>
          <input
            type="text"
            name="todoInput"
            placeholder="Write new task!"
            value={this.state.textTodo}
            onChange={this.textTodoChanged}
          />
          <lable>Select user!</lable>
          <select
            placeholder="Choose a user"
            onChange={this.selectChanged}
            value={this.selectName}
          >
            <option value="" disabled selected>Choose a user</option>
            {users.map(item => (
              <option
                key={item.id}
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
          {error && <span className="error">{errorText[error]}</span>}
          <Button type="button" onClick={this.added}>Add</Button>
        </Form>
        <TodoList todos={this.state.todos} />
      </>
    );
  }
}

export default NewTodo;
