import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Todo, User } from './api/todos';
import { UserInfo } from './components/UserInfo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users] = useState<User[]>([
    { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' },
    { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv' },
  ]);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const getUserById = (userId: number): User | null => {
    return users.find(user => user.id === userId) || null;
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm users={users} addTodo={addTodo} />
      <TodoList todos={todos} getUserById={getUserById} />
      <UserInfo user={users[0]} /> {}
    </div>
  );
};

export default App;
