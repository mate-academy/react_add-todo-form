import { useEffect, useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './type/todo';
import { User } from './type/user';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState([] as Todo[]);
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const users: User[] = usersFromServer;
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const clearState = () => {
    setUserError(false);
    setTitleError(false);
    setTodoTitle('');
    setUserId(0);
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitleError(false);
    setTodoTitle(event.target.value);
  };

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isUserExist = users.some(el => el.id === userId);

    if (!isUserExist || todoTitle.trim().length === 0) {
      setTitleError(todoTitle.trim().length === 0);
      setUserError(!isUserExist);

      return;
    }

    const ids = todos.map(el => el.id);

    const newTodo = {
      id: ids ? Math.max(...ids) + 1 : 1,
      title: todoTitle,
      completed: false,
      userId: userId,
      user: users.find(el => el.id === userId),
    };

    setTodos([...todos, newTodo]);
    clearState();
  };

  useEffect(() => {
    const prepareTodos = todosFromServer.map(user => {
      return {
        ...user,
        user: users.find(el => el.id === user.userId),
      };
    });

    setTodos(prepareTodos);
  }, [users]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={addNewTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Add new todo..."
            value={todoTitle}
            onChange={event => changeTitle(event)}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={event => {
              setUserError(false);
              setUserId(+event.target.value);
            }}
            value={userId}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
