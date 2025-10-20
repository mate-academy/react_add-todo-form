import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { createTodoAggregates } from './domain/TodoAggregate';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import { useState } from 'react';
import { Todo } from './domain/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const handleAddTodo = (todoData: { title: string; userId: number }) => {
    setTodos(currentTodos => {
      const newId =
        currentTodos.length > 0
          ? Math.max(...currentTodos.map(t => t.id)) + 1
          : 1;

      const user = usersFromServer.find(u => u.id === todoData.userId);

      if (!user) {
        throw new Error('User not found');
      }

      const newTodo: Todo = {
        id: newId,
        title: todoData.title.trim(),
        completed: false,
        userId: todoData.userId,
        user,
      };

      return [...currentTodos, newTodo];
    });
  };

  const aggregatedTodos = createTodoAggregates(todos, usersFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm
        users={usersFromServer}
        onSubmit={handleAddTodo}
        todos={todos}
      />

      <TodoList todos={aggregatedTodos} />
    </div>
  );
};
