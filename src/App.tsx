import { useState } from 'react';

import './App.scss';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleAddTodo = (title: string, userId: number) => {
    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onAdd={handleAddTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
