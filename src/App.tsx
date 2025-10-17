import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/types';
import { TodoForm } from './components/TodoForm';

const listTodo: Todo[] = todosFromServer.map(todo => {
  const userTodo = usersFromServer.find(user => user.id === todo.userId);

  return {
    ...todo,
    user: userTodo,
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(listTodo);

  const addTodo = (todoData: Omit<Todo, 'id' | 'completed' | 'user'>) => {
    setTodos(currentTodos => {
      const maxId =
        currentTodos.length > 0
          ? Math.max(...currentTodos.map(todo => todo.id))
          : 0;

      const newId = maxId + 1;
      const userForNewTodo = usersFromServer.find(
        newUser => newUser.id === todoData.userId,
      );

      const newTodo: Todo = {
        ...todoData,
        id: newId,
        completed: false,
        user: userForNewTodo,
      };

      return [...currentTodos, newTodo];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} users={usersFromServer} />

      <TodoList todos={todos} />
    </div>
  );
};
