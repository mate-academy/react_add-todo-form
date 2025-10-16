import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './api/todos';
import { User } from './api/users';
import { useState } from 'react';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';

export type TodoWithUser = Todo & { user: User | undefined };

const todos: TodoWithUser[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(({ id }) => id === todo.userId);

  return { ...todo, user };
});

export const App: React.FC = () => {
  const [newTodos, setNewTodos] = useState<TodoWithUser[]>(todos);

  const addNewTodo = (newTodo: TodoWithUser) => {
    setNewTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onAddTodo={addNewTodo} currentTodos={newTodos} />

      <TodoList todos={newTodos} />
    </div>
  );
};
