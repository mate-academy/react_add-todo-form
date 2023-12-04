import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/todoForm';
import { Todo } from './components/types/Todo';
import { defaultTodos } from './components/services/services';

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(post => post.id),
  );

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState(defaultTodos);

  const addTodo = (newTodo: Todo) => {
    const newT = {
      ...newTodo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newT]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
