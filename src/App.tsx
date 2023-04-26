import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function getFindedUser(id: number) {
  return usersFromServer.find(user => user.id === id);
}

let visibleTodos: Todo[] = todosFromServer.map(todo => {
  const userOfTodo = getFindedUser(todo.userId);
  const newTodo: Todo = { ...todo, user: userOfTodo || null };

  return newTodo;
});

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [isAdd, setIsAdd] = useState(false);

  const handleReset = () => {
    setTodoTitle('');
    setSelectedUser('0');
    setIsAdd(false);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setIsAdd(true);

    if (todoTitle !== '' && selectedUser !== '0') {
      const userOfTodo = getFindedUser(+selectedUser);

      const nextTodoId = visibleTodos
        .reduce((prev, cur) => ((prev.id > cur.id) ? prev : cur)).id + 1;

      const newTodo: Todo = {
        id: nextTodoId,
        title: todoTitle.trim(),
        completed: false,
        user: userOfTodo || null,
      };

      visibleTodos = [...visibleTodos, newTodo];
      handleReset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label>
            <span>Title: </span>

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={todoTitle}
              onChange={(event) => {
                setTodoTitle(event.target.value);
              }}
            />

            {(todoTitle === '' && isAdd) && (
              <span className="error">
                Please enter a title
              </span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            <span>User: </span>

            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={(event) => {
                setSelectedUser(event.target.value);
              }}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => {
                return (<option value={user.id}>{user.name}</option>);
              })}
            </select>
          </label>

          {(selectedUser === '0' && isAdd) && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
