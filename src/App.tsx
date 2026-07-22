import './App.scss';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Todo } from './api/types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const addTodo = ({ title, userId }: { title: string; userId: number }) => {
    const user = usersFromServer.find(
      currentUser => currentUser.id === userId,
    );

    const newTodo = {
      id: getNewTodoId(todos),
      title,
      userId,
      completed: false,
      user,
    };

    setTodos(current => [...current, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm users={usersFromServer} onAdd={addTodo} />
      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
