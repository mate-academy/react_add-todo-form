import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';

import users from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

type State = {
  id: number;
  todoTitle: string;
  currentTodos: Todo[];
  userId: string;
  isUserChoosed: boolean;
  isTodoInclude: boolean;
};

class App extends React.Component<{}, State> {
  state: State = {
    id: 1,
    todoTitle: '',
    currentTodos: [],
    userId: '0',
    isUserChoosed: false,
    isTodoInclude: false,
  };

  handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userId: value,
      isUserChoosed: false,
    });
  };

  handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      todoTitle: value,
      isTodoInclude: false,
    });
  };

  addTodo = () => {
    const { id, userId, todoTitle } = this.state;

    if (todoTitle.trim().length !== 0) {
      this.setState({ isTodoInclude: false });
    } else {
      this.setState({ isTodoInclude: true });

      return;
    }

    if (+userId !== 0) {
      this.setState({ isUserChoosed: false });
    } else {
      this.setState({ isUserChoosed: true });

      return;
    }

    const todo: Todo = {
      user: users.find(user => user.id === +userId) || null,
      userId: +userId,
      id,
      title: todoTitle.toLocaleUpperCase(),
      completed: false,
    };

    this.setState(state => (
      {
        id: state.id + 1,
        todoTitle: '',
        currentTodos: [...state.currentTodos, todo],
        userId: '',
        isUserChoosed: false,
        isTodoInclude: false,
      }
    ));
  };

  render() {
    const {
      currentTodos,
      userId,
      todoTitle,
      isTodoInclude,
      isUserChoosed,
    } = this.state;

    return (
      <div className="App">
        <h1>
          List of todos
        </h1>

        <Form
          className="form mb-3"
          onSubmit={(event) => {
            event.preventDefault();
            this.addTodo();
          }}
        >
          <Form.Label
            htmlFor="task"
            className="form__label"
          >
            <Form.Control
              className="form__todo_input"
              type="text"
              id="task"
              placeholder="Write your task"
              value={todoTitle}
              onChange={this.handleChangeTask}
            />
          </Form.Label>

          {isTodoInclude && (
            <p className="form__alert">
              Please, enter todo title
            </p>
          )}

          <Form.Label
            htmlFor="selectedUser"
            className="form__label"
          >
            <Form.Select
              name="selectedUser"
              id="selectedUser"
              value={userId}
              onChange={this.handleChangeUser}
            >
              <option value={0}>
                Choose user
              </option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Label>

          {isUserChoosed && (
            <p className="form__alert">
              Please, choose user
            </p>
          )}

          <Button
            variant="primary"
            type="submit"
          >
            Add Todo
          </Button>
        </Form>
        <TodoList todos={currentTodos} />
      </div>
    );
  }
}

export default App;
