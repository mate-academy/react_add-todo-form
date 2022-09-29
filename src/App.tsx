import './App.scss';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import { CompletedTodo, HandleEvent, TypeTodo } from './type';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUser = (todo: TypeTodo) => {
  return usersFromServer.find(user => user.id === todo.userId);
};

const todos: CompletedTodo[] = todosFromServer.map(todo => ({
  todo,
  user: getUser(todo),
}));

export const App = () => {
  const [stateTodos, setTodos] = useState(todos);
  const [choosenUser, setChooseUser] = useState('empty');
  const [newTitle, setNewTitle] = useState('');
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [isErrorUser, setIsErrorUser] = useState(false);
  let currentId = stateTodos
    .reduce((max, { todo }): number => (max < todo.id ? todo.id : max), 0);

  const createTodo = (title: string) => {
    currentId += 1;

    const selectedUser = usersFromServer[+choosenUser];

    const newTodo = {
      title,
      userId: selectedUser.id,
      id: currentId,
      completed: false,
    };

    const complitedTodo = {
      todo: newTodo,
      user: selectedUser,
    };

    const newTodos = [...stateTodos];

    newTodos.push(complitedTodo);

    setTodos(newTodos);
    setChooseUser('empty');
    setNewTitle('');
  };

  const isEmpty = (title: string, user: string): boolean => {
    setIsErrorTitle(!title.trim());
    setIsErrorUser(user === 'empty');

    return user === 'empty' || !title.trim();
  };

  const onHandleChangeTitle = (event: HandleEvent) => {
    const { value } = event.target;

    setNewTitle(value);
  };

  const onHandleChangeUser = (event: HandleEvent) => {
    const { value } = event.target;

    setChooseUser(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEmpty(newTitle, choosenUser)) {
      return;
    }

    createTodo(newTitle);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            <span>Title: </span>
            <input
              name="title"
              type="text"
              data-cy="titleInput"
              value={newTitle}
              placeholder="Enter a title"
              onChange={onHandleChangeTitle}
            />
            {isErrorTitle && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              name="user"
              data-cy="userSelect"
              value={choosenUser}
              onChange={onHandleChangeUser}
            >
              <option value="empty" disabled>Choose a user</option>

              {usersFromServer.map((user, index) => (
                <option value={index}>{user.name}</option>
              ))}
            </select>
            {isErrorUser && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"

        >
          Add
        </button>
      </form>
      <TodoList todos={stateTodos} />
    </div>
  );
};
