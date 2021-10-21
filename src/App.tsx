import React, { ChangeEvent } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

type State = {
  title: string;
  userId: number;
  todosList: Todo[];
  isListVisible: boolean;
  isUserSelected: boolean;
  isTitleValid: boolean;
};

class App extends React.Component<{}, State> {
  state: State = {
    userId: 0,
    title: '',
    todosList: [...todos],
    isListVisible: false,
    isUserSelected: true,
    isTitleValid: true,
  };

  removeTodo = (todoId: number) => {
    this.setState(event => ({
      todosList: event.todosList.filter((todo: Todo) => todo.id !== todoId),
    }));
  };

  addTitle(e: ChangeEvent<HTMLTextAreaElement>) {
    const re = /^[a-zA-Z0-9\u0400-\u04FF ]*$/;

    if (e.target.value.length <= 80 && re.test(e.target.value)) {
      this.setState({ title: e.target.value });
    }
  }

  isFormValid() {
    const { title, userId } = this.state;

    this.setState({ isTitleValid: !!title.length });
    this.setState({ isUserSelected: !!userId });

    return title.length && userId;
  }

  submitForm() {
    const { userId, title } = this.state;

    if (this.isFormValid()) {
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
      isListVisible,
      todosList,
      title,
      userId,
      isTitleValid,
      isUserSelected,
    } = this.state;

    const preparedTodos: Todo[] = todosList.map((todo) => ({
      ...todo,
      user: users.find(({ id }) => id === todo.userId),
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
                  this.addTitle(event);
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
        {isListVisible && <TodoList removeTodo={this.removeTodo} todos={preparedTodos} />}
      </div>
    );
  }
}

export default App;
