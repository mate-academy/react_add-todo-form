import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { TodosForm } from './components/todosForm/TodosForm';

import { getUserById } from './services/getUserById';

import { Todo } from './types/todo';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodosForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
