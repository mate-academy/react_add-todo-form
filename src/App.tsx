import './App.scss';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { getUserById } from './services/user';
import { Todo } from './entities/Todo';
import { useState } from 'react';

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  if (todos.length === 0) {
    return 1;
  }

  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = ({ title, userId }: Todo) => {
    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
