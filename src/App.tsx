import './App.scss';

import todosFromServer from './api/todos';
import { Todo } from './types/todo';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { NewTodoForm } from './components/NewTodoForm/NewTodo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleAdd = (title: string, userId: number) => {
    const newTodo: Todo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title,
      userId,
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <NewTodoForm onAdd={handleAdd} />
      <TodoList todos={todos} />
    </div>
  );
};
