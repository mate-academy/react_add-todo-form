import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

type State = {
  visibleTodos: Todo[],
  newTitle: string,
  isNewTitle: boolean,
  userName: string,
  isUserName: boolean,
};

export class App extends React.Component<{}, State> {
  state = {
    visibleTodos: todos,
    newTitle: '',
    isNewTitle: true,
    userName: '',
    isUserName: true,
  };

  render() {
    const {
      visibleTodos,
      newTitle,
      isNewTitle,
      userName,
      isUserName,
    } = this.state;

    const preparedTodos: Todo[] = visibleTodos.map(todo => {
      const theRightUser = users.find(user => user.id === todo.userId);
      const todoCopy = { ...todo };

      todoCopy.user = theRightUser || null;

      return todoCopy;
    });

    return (
      <div className="app">
        <h1>Add todo form</h1>

        <h2>List of todos</h2>

        <TodoList todos={preparedTodos} />

        <fieldset>
          <legend>Add todo</legend>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const selectedUser = users.find(user => user.name === userName);

              if (selectedUser && this.state.newTitle) {
                const newTodo: Todo = {
                  userId: selectedUser?.id,
                  id: visibleTodos.length + 1,
                  title: newTitle,
                  completed: false,
                  user: selectedUser,
                };

                this.setState(state => {
                  return {
                    visibleTodos: [...state.visibleTodos, newTodo],
                    newTitle: '',
                    isNewTitle: true,
                    userName: '',
                    isUserName: true,
                  };
                });
              }

              this.setState({
                isNewTitle: !!newTitle,
                isUserName: !!userName,
              });
            }}
          >
            <p>Todo title</p>

            <label htmlFor="title">
              <input
                type="text"
                id="title"
                name="title"
                value={newTitle}
                placeholder="Enter the title"
                onChange={(e) => {
                  const { value } = e.target;
                  const valueCharactersArr = value.split('');
                  const characters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя abcdefghijklmnopqrstuvwxyz123456789';
                  const canWrite = valueCharactersArr.every(char => {
                    return characters.includes(char.toLocaleLowerCase());
                  });

                  if (canWrite) {
                    this.setState({
                      newTitle: value,
                      isNewTitle: true,
                    });
                  }
                }}
              />
            </label>

            {!isNewTitle && <span>Please enter the title</span>}

            <p>User</p>

            <label htmlFor="user">
              <select
                id="user"
                value={userName}
                onChange={(e) => this.setState({
                  userName: e.target.value,
                  isUserName: true,
                })}
              >
                <option defaultValue="">Chose user</option>
                {users.map(({ name }) => {
                  return (
                    <option
                      key={name}
                      defaultValue={name}
                    >
                      {name}
                    </option>
                  );
                })}
              </select>
            </label>

            {!isUserName && <span>Please choose a user</span>}

            <button
              type="submit"
              style={{ display: 'block' }}
            >
              Add
            </button>
          </form>

        </fieldset>
      </div>
    );
  }
}
