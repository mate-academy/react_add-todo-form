import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';
import { PushMessage } from './components/PushMessage';

import { UserType } from './Types/UserType';
import { Todo } from './Types/TodoType';
import { PreparedTodoType } from './Types/PreparedTodosType';

import todos from './api/todos';
import users from './api/users';

function createPreparedTodos(usersArray: UserType[], todosArray: Todo[]): PreparedTodoType[] {
  const preparedTodos: PreparedTodoType[] = [];

  todosArray.forEach((todo: Todo, i: number): void => {
    const preparedTodo: PreparedTodoType = {
      ...todo,
      user: null,
    };

    const sameUser = usersArray.find(
      (userItem: UserType): boolean => (
        userItem.id === todo.userId
      ),
    );

    if (sameUser) {
      preparedTodo.user = sameUser;
    }

    preparedTodos[i] = preparedTodo;
  });

  return preparedTodos;
}

const preparedTodos: PreparedTodoType[] = createPreparedTodos(users, todos);

type State = {
  usedTodoList: PreparedTodoType[],
  selectedUserName: string,
  titleTodo: string,
  isShownErrorMessageUser: boolean,
  isShownErrorMessageTitle: boolean,
};

class App extends React.Component {
  state: State = {
    usedTodoList: preparedTodos,
    selectedUserName: 'Choose a user',
    titleTodo: '',
    isShownErrorMessageUser: false,
    isShownErrorMessageTitle: false,
  };

  onClick = () => {
    const selectedUser = users.find((eachUser: UserType) => (
      eachUser.name === this.state.selectedUserName));

    this.setState((state: State) => {
      if (state.titleTodo === '' || state.selectedUserName === 'Choose a user') {
        return {
          isShownErrorMessageTitle: state.titleTodo === '',
          isShownErrorMessageUser: state.selectedUserName === 'Choose a user',
        };
      }

      return (
        {
          usedTodoList: [
            ...state.usedTodoList,
            {
              userId: selectedUser ? selectedUser.id : null,
              id: state.usedTodoList.length + 1,
              title: state.titleTodo,
              completed: false,
              user: selectedUser,
            },
          ],
          titleTodo: '',
          selectedUserName: 'Choose a user',
        }
      );
    });
  };

  render() {
    const {
      usedTodoList,
      selectedUserName,
      titleTodo,
      isShownErrorMessageUser,
      isShownErrorMessageTitle,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList preparedTodosProps={usedTodoList} />
        <form
          action="/"
          className="form"
        >
          <label className="label" htmlFor="title">
            <h3>
              Create new TODOs
            </h3>
            <input
              id="title"
              className="title"
              type="text"
              placeholder="Enter the title"
              value={titleTodo}
              onChange={({ target }) => {
                this.setState({
                  titleTodo: target.value.replace(/[^a-zа-яё0-9\s]/gi, ''),
                  isShownErrorMessageTitle: false,
                });
              }}
            />
          </label>
          <label htmlFor="select">
            <select
              id="selectUserName"
              className="select"
              value={selectedUserName}
              onChange={({ target }) => {
                this.setState({
                  selectedUserName: target.value,
                  isShownErrorMessageUser: false,
                });
              }}
            >
              <option
                value="Choose a user"
                key="Choose a user"
              >
                Choose a user
              </option>
              {users.map((user: UserType) => (
                <option value={user.name} key={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <div>
            <button
              type="button"
              className="button"
              onClick={this.onClick}
            >
              Add
            </button>
          </div>
        </form>
        {(isShownErrorMessageUser || isShownErrorMessageTitle)
          && (
            <PushMessage
              chooseUser="Choose a user"
              isShownErrorMessageUser={isShownErrorMessageUser}
              title="Enter the title"
              isShownErrorMessageTitle={isShownErrorMessageTitle}
            />
          )}
      </div>
    );
  }
}

export default App;
