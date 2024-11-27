import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { TodoListType, TodosType, User } from './api/type/type';

function findUserById(id: number, userList: User[]): User | null {
  return userList.find(user => id === user.id) || null;
}

function makeTodoList(todos: TodosType[], userList: User[]): TodoListType[] {
  return todos.map(todo => {
    return {
      ...todo,
      user: findUserById(todo.userId, userList),
    };
  });
}

export const App = () => {
  const [todoList, setTodoList] = useState(
    makeTodoList(todosFromServer, usersFromServer),
  );
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [errorSelectedUser, setErrorSelectedUser] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);

  function handleSubmit(): void {
    if (selectedUser === 0) {
      setErrorSelectedUser(true);
    }

    if (title.trim().length === 0) {
      setErrorTitle(true);
    }

    if (selectedUser !== 0 && title.trim().length > 0) {
      const newTodo: TodoListType = {
        id: Math.max(0, ...todosFromServer.map(a => a.id)) + 1,
        title: title.trim(),
        completed: false,
        userId: selectedUser,
        user: findUserById(selectedUser, usersFromServer),
      };

      setTodoList(curTodolist => [...curTodolist, newTodo]);
      setSelectedUser(0);
      setTitle('');
      setErrorSelectedUser(false);
      setErrorTitle(false);
    }
  }

  function resetErrorTitle(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 0) {
      setErrorTitle(false);
    }
  }

  function resetErrorSelectedUser(e: React.ChangeEvent<HTMLSelectElement>) {
    if (+e.target.value !== 0) {
      setErrorSelectedUser(false);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter the title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              resetErrorTitle(e);
            }}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={e => {
              setSelectedUser(+e.target.value);
              resetErrorSelectedUser(e);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {errorSelectedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
