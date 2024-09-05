import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm/Todoform';
import { getUserById } from './components/services/user';
import { TodoList } from './components/TodoList/TodoList';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function generateTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: generateTodoId(todos),
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
