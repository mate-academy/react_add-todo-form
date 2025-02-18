import './App.scss';
import { useState, FC } from 'react';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { AddUser } from './components/AddUser/AddUser';
import { Todo } from './types/types';
import { getUserById } from './utils/getUserByID';

export const App: FC = () => {
  const initialTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <AddUser
        onAdd={newTodo => setTodos(currentTodos => [...currentTodos, newTodo])}
        todos={todos}
      />
      <TodoList todos={todos} />
    </div>
  );
};
