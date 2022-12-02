import { useEffect, useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm';

const todoWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    const todoToAdd = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      ...newTodo,
    };

    setTodos((currentTodos) => [...currentTodos, todoToAdd]);
  };

  const deleteTodo = (todoID: number) => {
    setTodos((currentTodos) => currentTodos.filter(
      todo => todo.id !== todoID,
    ));
  };

  // const updateTodo = (updatedTodo: Todo) => {
  //   setTodos((currentTodos) => currentTodos.map(
  //     todo => (todo.id === updatedTodo.id ? updatedTodo : todo),
  //   ));
  // };

  useEffect(() => {
    setTimeout(() => {
      setTodos(todoWithUser);
    }, 500);
  }, []);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        onSubmit={addTodo}
      />

      <TodoList
        todos={todos}
        onTodosDeleted={deleteTodo}
        // onTodosUpdated={updateTodo}
      />
    </div>
  );
};
