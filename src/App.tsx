import { useState } from 'react';
import './App.scss';
import { AddTodo } from './components/AddTodo/';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { getNewPostId } from './services/todo';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';

const initialTodos: Todo[] = todosFromServer.map(user => ({
  ...user,
  user: getUserById(user.id),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const addNewTodo = (newTodo: Todo) => {
    setTodos([
      ...todos,
      {
        ...newTodo,
        id: getNewPostId(todos),
        user: getUserById(newTodo.userId),
      },
    ]);
  };

  return (
    <div className="App">
      <AddTodo onAdd={addNewTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
