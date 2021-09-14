/* eslint-disable no-console */
import React from 'react';
import './Todo.scss';
import { v4 as uuidv4 } from 'uuid';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './TodoList/TodoList';
import { UserInfo } from './UserInfo/UserInfo';

type State = {
  userName: string,
  todosCLone: Todo[],
  newTodo: string,
  inputError: string,
  selectError: string,
};

class App extends React.PureComponent<{}, State> {
  state:State = {
    userName: 'chose user',
    todosCLone: todos.map(todo => {
      return {
        ...todo,
        idForFront: uuidv4(),
      };
    }),
    newTodo: '',
    inputError: '',
    selectError: '',
  };

  newId = Math.max(...this.state.todosCLone.map(todo => todo.id));

  validateSelect = () => {
    return this.state.userName !== 'chose user';
  };

  validateInput = () => {
    return !!this.state.newTodo.trim().length;
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.validateInput() && this.validateSelect()) {
      this.setState((currentState) => {
        const { userName, todosCLone, newTodo } = this.state;
        const newUserId = users.findIndex(user => user.name === userName);

        this.newId += 1;
        const newTodoElement = {
          userId: newUserId,
          id: this.newId,
          title: newTodo,
          completed: false,
          idForFront: uuidv4(),
        };

        return {
          ...currentState,
          todosCLone: [...todosCLone, newTodoElement],
        };
      });
    }

    if (!this.validateInput()) {
      this.setState({ inputError: 'Error input' });
    }

    if (!this.validateSelect()) {
      this.setState({ selectError: 'Error select' });
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState((currentState) => {
      if (name === 'newTodo') {
        return {
          ...currentState,
          [name]: value,
          inputError: '',
        };
      }

      return {
        ...currentState,
        [name]: value,
        selectError: '',
      };
    });
  };

  render() {
    const {
      userName,
      todosCLone,
      inputError,
      selectError,
    } = this.state;

    return (
      <div className="Todo">
        <h1>Add todo form</h1>
        <form
          action="POST"
          onSubmit={this.handleSubmit}
          className="Todo__form"
        >
          <UserInfo
            handleChange={this.handleChange}
            inputError={inputError}
            selectError={selectError}
            userName={userName}
          />
          {' '}
          <button
            type="submit"
            className="btn btn-primary Todo__button"
          >
            add
          </button>
        </form>
        <TodoList todosCLone={todosCLone} />
      </div>
    );
  }
}

export default App;
