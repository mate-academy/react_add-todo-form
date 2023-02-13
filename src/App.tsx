import './App.scss';

import { useState } from 'react';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { getUserById } from './utils/getUserById';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    setTodos((currentTodos) => ([
      ...currentTodos, todo,
    ]));
  };

  const deleteTodo = (todoId: number) => {
    setTodos((currentTodos) => (
      currentTodos.filter(todo => todo.id !== todoId)
    ));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm addTodo={addTodo} todos={todos} />

      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};
