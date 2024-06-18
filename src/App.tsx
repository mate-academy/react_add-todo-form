import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
// import usersFromServer from './api/users';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getUserById } from './helper/getUserId';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewPostId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewPostId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
