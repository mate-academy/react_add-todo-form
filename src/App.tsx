import { SetStateAction, useState, useEffect } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  useEffect(() => {
    const todosWithUsers = todosFromServer.map(todo => {
      const user = usersFromServer.find(u => u.id === todo.userId);

      if (!user) {
        throw new Error('User not found');
      }

      return {
        ...todo,
        user,
      };
    });

    setTodos(todosWithUsers);
  }, []);

  const handleTitleChange = (event:
  { target: { value: SetStateAction<string>; }; }) => {
    setTitle(event.target.value);
    if (titleError) {
      setTitleError('');
    }
  };

  const handleUserChange = (event:
  { target: { value: SetStateAction<string>; }; }) => {
    setUserId(event.target.value);
    if (userError) {
      setUserError('');
    }
  };

  const addTodo = () => {
    const user = usersFromServer.find((u) => u.id === Number(userId));

    const maxId = todos.reduce((max, todo) => {
      return todo.id > max ? todo.id : max;
    }, 0);

    if (!user) {
      setUserError('User not found');

      return;
    }

    const newTodo = {
      id: maxId + 1,
      title,
      user,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('');
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    let error = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      error = true;
    }

    if (!userId) {
      setUserError('Please choose a user');
      error = true;
    }

    if (!error) {
      addTodo();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          Title: &nbsp;
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          User:&nbsp;
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
