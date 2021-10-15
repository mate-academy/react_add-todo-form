import React, { ChangeEvent } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { ToDo } from './types/ToDo';

type State = {
  title: string;
  userId: number;
  todosList: ToDo[];
  isListVisible: boolean;
  isUserSelected: boolean;
  isTitleValid: boolean;
};

class App extends React.Component<{}, State> {
  state = {
    userId: 0,
    title: '',
    todosList: todos,
    isListVisible: false,
    isUserSelected: true,
    isTitleValid: true,
  };

  inputFilter(e: ChangeEvent<HTMLTextAreaElement>) {
    const re = /^[a-zA-Z0-9\u0400-\u04FF ]*$/;

    if (e.target.value.length <= 80 && re.test(e.target.value)) {
      this.setState({ title: e.target.value });
    }
  }

  formValidation() {
    const { title, userId } = this.state;
    let isValid = true;

    if (title.length === 0) {
      isValid = false;
      this.setState({ isTitleValid: false });
    } else {
      this.setState({ isTitleValid: true });
    }

    if (userId === 0) {
      isValid = false;
      this.setState({ isUserSelected: false });
    } else {
      this.setState({ isUserSelected: true });
    }

    return isValid;
  }

  submitForm() {
    const { userId, title } = this.state;

    if (this.formValidation()) {
      this.setState(state => ({
        todosList: [
          ...state.todosList,
          {
            userId,
            title,
            completed: false,
            id: state.todosList.length + 1,
          },
        ],
        userId: 0,
        title: '',
      }));
    }
  }

  render() {
    const {
      isListVisible, todosList, title, userId, isTitleValid, isUserSelected,
    } = this.state;
    const preparedTodos: ToDo[] = todosList.map((todo) => ({
      ...todo,
      user: users.find(({ id }) => id === todo.userId) || null,
    }));
    const buttonContent = isListVisible ? 'Hide task\'s' : 'Show task\'s';

    return (
      <div className="App">
        <div className="newTodo">
          <h1 className="newTodo__title">Add todo form</h1>
          <form
            className="newTodo__form form"
            onSubmit={event => {
              event.preventDefault();
              this.submitForm();
            }}
          >
            <div className="textarea-set">
              <textarea
                className="textarea-set__textarea"
                name="title"
                value={title}
                placeholder="Enter task"
                onChange={(event) => {
                  this.inputFilter(event);
                }}
              />
              {!isTitleValid && (<span className="error">Cannot be empty!</span>)}
            </div>
            <div className="select-set">
              <select
                className="select-set__select"
                name="user"
                value={userId}
                onChange={(event) => {
                  this.setState({ userId: +event.target.value });
                }}
              >
                <option
                  key={0}
                  value={0}
                  disabled
                >
                  Select user
                </option>
                {users.map(user => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
              {!isUserSelected && (<span className="error">Select user!</span>)}
            </div>
            <button
              className="form__submit"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
        <button
          className="showList-button"
          type="button"
          onClick={() => {
            this.setState({ isListVisible: !isListVisible });
          }}
        >
          {buttonContent}
        </button>
        {isListVisible && <TodoList todos={preparedTodos} />}
      </div>
    );
  }
}

export default App;
