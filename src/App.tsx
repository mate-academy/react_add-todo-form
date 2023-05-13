import './App.scss';
import { FormEventHandler, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

interface TodoFromServer {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const mapTodosWithUsers = (todos: TodoFromServer[]): Todo[] => {
  return todos.map(todo => ({
    ...todo,
    user: findUserById(todo.userId),
  }));
};

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [todos, setTodos] = useState(mapTodosWithUsers(todosFromServer));
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const findUniqueTodoId = (): number => {
    const temp = [...todos].sort((a, b) => b.id - a.id);
    const lastId = temp[0]?.id || 0;

    return lastId + 1;
  };

  const createTodo = () => ({
    id: findUniqueTodoId(),
    userId,
    title: todoTitle,
    completed: false,
    user: findUserById(userId),
  });

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (userId === 0) {
      setUserError(true);
    } else {
      setUserError(false);
    }

    if (todoTitle === '') {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (userId > 0 && todoTitle !== '') {
      setTodos([...todos, createTodo()]);
      setUserId(0);
      setTodoTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Task title..."
            onChange={event => {
              setTodoTitle(event.target.value);
              setTitleError(false);
            }}
            value={todoTitle}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            onChange={event => {
              setUserId(+event.target.value);
              setUserError(false);
            }}
            defaultValue={0}
            value={userId}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
