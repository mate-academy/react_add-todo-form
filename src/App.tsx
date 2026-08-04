import { FormEvent, useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export interface User { id: number; name: string; username: string; email: string }
export interface Todo { id: number; title: string; completed: boolean; userId: number; user: User }

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId)!,
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasTitle = title.trim().length > 0;
    const selectedUser = usersFromServer.find(user => user.id === userId);

    setShowTitleError(!hasTitle);
    setShowUserError(!selectedUser);
    if (!hasTitle || !selectedUser) return;

    setTodos([...todos, { id: Math.max(...todos.map(todo => todo.id)) + 1, title: title.trim(), completed: false, userId, user: selectedUser }]);
    setTitle('');
    setUserId(0);
  };

  return <div className="App"><h1>Add todo form</h1><form onSubmit={handleSubmit}>
    <div className="field"><input type="text" placeholder="Enter a title" data-cy="titleInput" value={title} onChange={event => { setTitle(event.target.value); setShowTitleError(false); }} />{showTitleError && <span className="error">Please enter a title</span>}</div>
    <div className="field"><select data-cy="userSelect" value={userId} onChange={event => { setUserId(Number(event.target.value)); setShowUserError(false); }}><option value="0">Choose a user</option>{usersFromServer.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}</select>{showUserError && <span className="error">Please choose a user</span>}</div>
    <button type="submit" data-cy="submitButton">Add</button>
  </form><TodoList todos={todos} /></div>;
};
