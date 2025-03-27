import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FormEventHandler, useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

const toDoList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorUser, setErrorUser] = useState('');
  const [todos, setTodos] = useState<Todo[]>(toDoList);

  const handlerTodo: FormEventHandler = titleTodo => {
    setTodoTitle(titleTodo.target.value);

    if (titleTodo.target.value === '') {
      setErrorTitle('Please enter a title');
    } else {
      setErrorTitle('');
    }
  };

  const handlerSelect: FormEventHandler = nameOfUser => {
    setUserId(nameOfUser.target.value);

    if (nameOfUser.target.value === '') {
      setErrorUser('Please choose a user');
    } else {
      setErrorUser('');
    }
  };

  const handlerSubmit: FormEventHandler = event => {
    event.preventDefault();

    let hasError = false;

    if (userId === '0') {
      setErrorUser('Please choose a user');
      hasError = true;
    }

    if (todoTitle.trim() === '') {
      setErrorTitle('Please enter a title');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const userOfTodo = usersFromServer.find(user => user.id === +userId);

    const newTodo: Todo = {
      id: Math.max(...toDoList.map(todo => todo.id)) + 1,
      title: todoTitle,
      completed: false,
      userId: userOfTodo.id,
      user: userOfTodo,
    };

    setTodos([...todos, newTodo]);
    setTodoTitle('');
    setUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handlerSubmit}>
        <div className="field">
          <label htmlFor="input-Title" className="input">
            Titel:
          </label>
          <input
            name="inputTitle"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handlerTodo}
          />
          {errorTitle && <span className="error">{errorTitle}</span>}
        </div>

        <div className="field">
          <label htmlFor="input-User" className="input">
            User:
          </label>
          <select data-cy="userSelect" value={userId} onChange={handlerSelect}>
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorUser && <span className="error">{errorUser}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
