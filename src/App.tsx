import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import { getTodosWithUserInfo } from './utils/utils';
import { Todo } from './types/types';
import { FormTodo } from './components/FormTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(getTodosWithUserInfo);

  const handleSetNewTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="section">
      <h1 className="title">Add todo form</h1>

      <FormTodo todos={todos} addTodo={handleSetNewTodo} />

      {todos.length && <TodoList todos={todos} />}
    </div>
  );
};
