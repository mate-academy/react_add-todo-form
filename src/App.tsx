import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { getUserById } from './services/UserService';
import { getNextId } from './services/TodoService';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId, usersFromServer),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm
        users={usersFromServer}
        onTodoCreated={(newTodo) => setTodos([...todos, {
          ...newTodo,
          id: getNextId(todos),
        }])}
      />

      <TodoList todos={todos} />
    </div>
  );
};
