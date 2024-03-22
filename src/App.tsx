import { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { FormTodo } from './components/FormTodo/FormTodo';
import { initialTodos } from './services/todos';
import { Todos } from './types/Todos';

function getNewTodosID(todos: Todos[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todos[]>(initialTodos);

  const addTodos = (newTodo: Todos) => {
    const newTodosId = {
      ...newTodo,
      id: getNewTodosID(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodosId]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <FormTodo onSubmit={addTodos} />
      <TodoList todos={todos} />
    </div>
  );
};
