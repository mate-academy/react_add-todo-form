import { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { todos } from './services/service';
import users from './api/users';
import { Todo } from './types/Todo';

export const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>(todos);

  const handleAddTodo = (newTodo: Todo) => {
    setTodoList(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm users={users} onAdd={handleAddTodo} currentTodos={todoList} />

      <TodoList todos={todoList} />
    </div>
  );
};
