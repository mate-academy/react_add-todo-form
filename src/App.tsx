import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';
import { TodoForm } from './components/TodoForm';
import { NewTodoData } from './types/NewTodoData';

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(0, ...todos.map(todo => todo.id));

  return maxId + 1;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = ({ title, userId }: NewTodoData) => {
    const newTodo = {
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm users={usersFromServer} onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
