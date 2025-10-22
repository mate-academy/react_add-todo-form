import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './domain/Todo';
import { createTodoAggregates } from './domain/TodoAgregate';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    createTodoAggregates(todosFromServer, usersFromServer),
  );

  const handleAddTodo = (newTodoData: Omit<Todo, 'id' | 'user'>) => {
    const maxId = Math.max(...todos.map(todo => todo.id), 0);
    const user = usersFromServer.find(
      findUser => findUser.id === newTodoData.userId,
    );

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      ...newTodoData,
      id: maxId + 1,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm users={usersFromServer} onSubmit={handleAddTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
