import React from 'react';
import './App.scss';

import { Button, Form } from 'react-bootstrap';

import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList';

const preparedList = todos.map((toDo) => ({
  ...toDo,
  user: users.find(user => (user.id === toDo.userId)) || null,
}));

type Props = {};
type State = {
  preparedTodos: PreparedTodo[],
  newTodoTitle: string,
  selectedUser: string,
  hasTitleError: boolean,
  hasSelectedUserError: boolean,
};

export class App extends React.Component<Props, State> {
  state: State = {
    preparedTodos: [...preparedList],
    newTodoTitle: '',
    selectedUser: '',
    hasTitleError: false,
    hasSelectedUserError: false,
  };

  todoTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodoTitle: event.target.value,
      hasTitleError: false,
    });
  };

  todoUserHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUser: event.target.value,
      hasSelectedUserError: false,
    });
  };

  formSubmitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { newTodoTitle, selectedUser } = this.state;

    if (!newTodoTitle) {
      this.setState({
        hasTitleError: true,
      });

      return;
    }

    if (!selectedUser) {
      this.setState({
        hasSelectedUserError: true,
      });

      return;
    }

    const newTodo = this.addNewTodoHandler();

    this.setState((prevState) => ({
      preparedTodos: [...prevState.preparedTodos, newTodo],
      newTodoTitle: '',
      selectedUser: '',
    }));
  };

  addNewTodoHandler() {
    const { newTodoTitle, selectedUser, preparedTodos } = this.state;

    const newTodo: PreparedTodo = {
      user: users.find(user => user.name === selectedUser) || null,
      userId: users.find(user => user.name === selectedUser)?.id || null,
      title: newTodoTitle,
      id: preparedTodos.length + 1,
      completed: false,
    };

    return newTodo;
  }

  render() {
    const {
      newTodoTitle, preparedTodos, selectedUser, hasTitleError, hasSelectedUserError,
    } = this.state;

    return (
      <div className="d-flex">
        <Form
          className="addUserForm border p-2"
          onSubmit={this.formSubmitHandler}
        >
          <fieldset>
            <legend>Add</legend>
            <Form.Group controlId="formTitle">
              <Form.Label>Todo title:</Form.Label>
              <Form.Control
                value={newTodoTitle}
                onChange={this.todoTitleHandler}
                type="text"
                placeholder="Enter title"
              />
              {hasTitleError && (
                <Form.Text className="text-muted">
                  Add a title to todo.
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formUserSelect">
              <Form.Select
                size="sm"
                aria-label="Default select example"
                value={selectedUser}
                onChange={this.todoUserHandler}
              >
                <option>Choose a user</option>
                {users.map((user) => (
                  <option key={user.id}>
                    {user?.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {hasSelectedUserError && (
              <Form.Text className="text-muted">
                Choose a user from list.
              </Form.Text>
            )}
            <Button
              size="sm"
              variant="primary"
              type="submit"
              className="addUserForm__submit"
            >
              add
            </Button>
          </fieldset>
        </Form>
        <TodoList preparedList={preparedTodos} />
      </div>
    );
  }
}
