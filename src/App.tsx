import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { TodoListType, TodosType, User } from './api/type';

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
    const isUserValid = selectedUser !== 0;
    const isTitleValid = title.trim().length > 0;

    setErrorSelectedUser(!isUserValid);
    setErrorTitle(!isTitleValid);

    if (!isUserValid || !isTitleValid) {
      return;
    }

    const newTodo: TodoListType = {
      id: Math.max(0, ...todoList.map(todo => todo.id)) + 1,
      title: title.trim(),
      completed: false,
      userId: selectedUser,
      user: findUserById(selectedUser, usersFromServer),
    };

    setTodoList(current => [...current, newTodo]);
    setSelectedUser(0);
    setTitle('');
  }

  function resetErrorTitle(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length > 0) {
      setErrorTitle(false);
    }
  }

  function resetErrorSelectedUser(event: React.ChangeEvent<HTMLSelectElement>) {
    if (+event.target.value !== 0) {
      setErrorSelectedUser(false);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter the title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              resetErrorTitle(event);
            }}
          />

          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(+event.target.value);
              resetErrorSelectedUser(event);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
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
