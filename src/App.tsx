import { SetStateAction, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './components/TodoInfo/TodoInfo';

export const App = () => {
  const todosWithUsers = todosFromServer.map(todo => {
    const user = usersFromServer.find(u => u.id === todo.userId) || null;

    return {
      ...todo,
      user,
    };
  });

  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

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
    const user = usersFromServer.find(u => u.id === Number(userId));

    if (!user) {
      setUserError('User not found');

      return;
    }

    setTodos(prevTodos => {
      const maxId = prevTodos.reduce((max, todo) => {
        return todo.id > max ? todo.id : max;
      }, 0);

      const newTodo = {
        id: maxId + 1,
        title,
        user,
        completed: false,
      };

      return [...prevTodos, newTodo];
    });

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
