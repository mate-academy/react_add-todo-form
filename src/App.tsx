import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { ComplitlyTodo, HendleEvent, TypeTodo } from './type';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUser = (todo: TypeTodo) => {
  return usersFromServer.find(user => user.id === todo.userId);
};

const todos: ComplitlyTodo[] = todosFromServer.map(todo => ({
  todo,
  user: getUser(todo),
}));

const crateTodo = () => {
  let curentId = 15;

  const Todo = (title: string, userId: number): TypeTodo => {
    curentId += 1;

    return {
      title,
      userId,
      id: curentId,
      completed: false,
    };
  };

  return Todo;
};



export const App = () => {
  const [stateTodos, setTodos] = useState(todos);
  const [chooseUser, setUser] = useState('empty');
  const [newTitle, setTitle] = useState('');
  const [isErrorTitle, setErrorTitle] = useState(false);
  const [isErrorSelect, setErrorSelect] = useState(false);
  const Todo = crateTodo();

  const isEmpty = (title: string, user: string): boolean => {
    setErrorTitle(!title.length);
    setErrorSelect(user === 'empty');

    return isErrorTitle && isErrorSelect;
  };

  const addTodo = () => {
    if (isEmpty(newTitle, chooseUser)) {
      return;
    }

    const selectUser = usersFromServer[+chooseUser];
    const newTodo = Todo(newTitle, selectUser.id);

    const complitlyTodo = {
      todo: newTodo,
      user: selectUser,
    };

    const newTodos = [...stateTodos];

    newTodos.unshift(complitlyTodo);

    setTodos(newTodos);
    setUser('empty');
    setTitle('');
  };

  const onHandelChange = (event: HendleEvent) => {
    const { value, name } = event.target;

    if (name === 'title') {
      setTitle(value);

      return;
    }

    setUser(value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
      >
        <div className="field">
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            value={newTitle}
            placeholder="Enter a title"
            onChange={(event) => onHandelChange(event)}
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
            onChange={(event) => onHandelChange(event)}
          >
            <option value="empty" disabled>Choose a user</option>

            {usersFromServer.map((user, index) => (
              <option value={index}>{user.name}</option>
            ))}
          </select>
          {isErrorSelect && (
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
