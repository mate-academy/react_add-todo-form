import './App.scss';
import { useState } from 'react';
import { Todo } from './components/TodoInfo';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/getUser';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm/TodoForm';

const initialTodo = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodo);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
