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

const maxIndex = todosFromServer
  .reduce((max, todo): number => (max < todo.id ? todo.id : max), 0);

const createTodo = () => {
  let currentId = maxIndex;

  const Todo = (title: string, userId: number): TypeTodo => {
    currentId += 1;

    return {
      title,
      userId,
      id: currentId,
      completed: false,
    };
  };

  return Todo;
};

export const App = () => {
  const [stateTodos, setTodos] = useState(todos);
  const [chooseUser, setChooseUser] = useState('empty');
  const [newTitle, setNewTitle] = useState('');
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [isErrorUser, setIsErrorUser] = useState(false);
  const Todo = createTodo();

  const isEmpty = (title: string, user: string): boolean => {
    setIsErrorTitle(!title.trim().length);
    setIsErrorUser(user === 'empty');

    return isErrorTitle || isErrorUser;
  };

  const addTodo = () => {
    if (isEmpty(newTitle, chooseUser)) {
      return;
    }

    const selectUser = usersFromServer[+chooseUser];
    const newTodo = Todo(newTitle, selectUser.id);

    const complitedTodo = {
      todo: newTodo,
      user: selectUser,
    };

    const newTodos = [...stateTodos];

    newTodos.unshift(complitedTodo);

    setTodos(newTodos);
    setChooseUser('empty');
    setNewTitle('');
  };

  const onHandleChange = (event: HandleEvent) => {
    const { value, name } = event.target;

    if (name === 'title') {
      if (value.length < 2) {
        setNewTitle(value.trim());

        return;
      }

      setNewTitle(value);

      return;
    }

    setChooseUser(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="field">
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            value={newTitle}
            placeholder="Enter a title"
            onChange={(event) => onHandleChange(event)}
          />
          {isErrorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            name="user"
            data-cy="userSelect"
            value={chooseUser}
            onChange={(event) => onHandleChange(event)}
          >
            <option value="empty" disabled>Choose a user</option>

            {usersFromServer.map((user, index) => (
              <option value={index}>{user.name}</option>
            ))}
          </select>
          {isErrorUser && (
            <span className="error">Please choose a user</span>
          )}
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
