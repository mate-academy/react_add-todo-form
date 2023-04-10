import React, { useEffect, useState } from 'react';
import './App.scss';
import { addTodoOnServer, deleteTodosFromSevrer, getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async (todoData: Omit<Todo, 'id'>) => {
    const newTodo = {
      ...todoData,
    };

    await addTodoOnServer(newTodo);

    // setTodos((prevTodos) => [...prevTodos, addedTodo]);

    await loadTodos();
  };

  const deleteTodo = async (todoId: number) => {
    await deleteTodosFromSevrer(todoId);

    // setTodos(currentTodos => currentTodos.filter(
    //   todo => todo.id !== todoId,
    // ));

    await loadTodos();
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(currentTodos => currentTodos.map(
      todo => (todo.id === updatedTodo.id ? updatedTodo : todo),
    ));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={todos}
        onTodoDelete={deleteTodo}
        onTodoUpdate={updateTodo}
      />
    </div>
  );
};
