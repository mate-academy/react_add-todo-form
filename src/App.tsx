import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './types/Todo';
import { getNewTodoId } from './helpers/getNewTodoId';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleAddTodo = (todoInfo: Pick<Todo, 'title' | 'userId'>) => {
    const newTodo: Todo = {
      ...todoInfo,
      id: getNewTodoId(todos),
      completed: false,
    };

    setTodos(currTodos => [...currTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={handleAddTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
