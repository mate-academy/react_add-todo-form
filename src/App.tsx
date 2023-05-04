import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getUser, TodoForm } from './components/TodoForm';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (todoData: Omit<Todo, 'id'>) => {
    const newTodo = {
      ...todoData,
      id: Math.max(...todos.map(todo => todo.id)) + 1,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const deleteTodo = (todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(
      todo => todo.id !== todoId,
    ));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        onTodoDelete={deleteTodo}
      />
    </div>
  );
};
