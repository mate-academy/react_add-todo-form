import './App.scss';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import { Todo } from './Types/Todo';
import { TodoWithUser } from './Types/TodosWithUsers';
import { getUserByUserId } from './utils/GetUserByUserId';
import { useState } from 'react';

const todosWithUsers: TodoWithUser[] = todosFromServer.map((todo: Todo) => {
  const user = getUserByUserId(todo.userId);

  return {
    ...todo,
    user: user,
  };
});

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);

  const handleAddTodo = (newTodo: TodoWithUser) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onAddTodo={handleAddTodo} todos={todos} />
      <TodoList todos={todos} />
    </div>
  );
};
