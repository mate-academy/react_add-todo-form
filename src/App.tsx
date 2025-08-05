import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { Todo, User } from './components/type'; // Додано User
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface Errors {
  title?: boolean;
  userId?: boolean;
}

export const App = () => {
   const [todos, setTodos] = React.useState<Todo[]>(() => {
    return todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId) || usersFromServer[0]
    }));
  });
  
  const [title, setTitle] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [errors, setErrors] = React.useState<Errors>({});
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Errors = {};
    if (!title.trim()) {
      newErrors.title = true;
    }
    if (!userId) {
      newErrors.userId = true;
    } 
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === parseInt(userId));
    
    if (selectedUser) {
      const newTodo: Todo = {
        id: Math.max(...todos.map(t => t.id)) + 1,
        title: title.trim(),
        userId: parseInt(userId),
        completed: false,
        user: selectedUser
      };
      
      setTodos([...todos, newTodo]);
      setTitle('');
      setUserId('');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: false }));
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
    if (errors.userId) {
      setErrors(prev => ({ ...prev, userId: false }));
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input 
            type="text" 
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select 
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.userId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">Add</button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};