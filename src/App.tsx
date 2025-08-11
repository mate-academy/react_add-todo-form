import './App.scss';

 import usersFromServer from './api/users';
 import todosFromServer from './api/todos';
 import { Todo } from './interfaces/todo';
 import { User } from './interfaces/user';
 import { useState } from 'react';
 import { TodoList } from './components/TodoList';


  function getUserById(userId: number): User | null {
    return usersFromServer.find(user => user.id === userId) || null;
  };
  const initialTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId)
  }))

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState<string> ('');
  const [selectedUserId, setSelectedUserId] = useState('')
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');
  const [users] = useState<User[]>(usersFromServer);


  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
      action="/api/todos"
      method="POST"
      onSubmit={
        event => {event.preventDefault()

        let hasError = false;
        if (title.trim() === '') {
          setTitleError('Please enter a title')
          hasError = true;
        }
          if (selectedUserId === '') {
          setUserError("Please choose a user");
          hasError = true;
        }
        if (hasError) {
          return;
        }
        const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
          const user = users.find(u => u.id === Number(selectedUserId));

      if (!user) return;

      const newTodo: Todo = {
        id: newId,
        title: title.trim(),
        userId: user.id,
        completed: false,
        user,
    };

  setTodos(prev => [...prev, newTodo]);
  setTitle('');
  setSelectedUserId('');
  setTitleError('');
  setUserError('');
        }
      }>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            value={title}
            data-cy="titleInput"
            onChange={tit => {
            setTitle(tit.target.value);
            if (titleError)
              setTitleError('');
            }} />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
          value={selectedUserId}
          id="userSelect"
          data-cy="userSelect"
          onChange={user => {
            setSelectedUserId(user.target.value);
            if (userError) {
              setUserError('');
            }
          }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
              {user.name}
            </option>))}
          </select>

          {userError  && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} users={users}/>
    </div>
  );
};
