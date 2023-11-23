import './App.scss';
import { useState } from 'react';
import { getUserById } from './services/getUserById';
import { Todo } from './types/Todos';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>(todos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(initialTodos),
    };

    setInitialTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1 className="title">Todo</h1>

      <div className="wrapper">
        <h2 className="subtitle">Add Todo:</h2>
        <TodoForm
          onSubmit={addTodo}
        />
      </div>

      <div className="wrapper">
        <h2 className="subtitle">Todo List:</h2>
        <TodoList
          todos={initialTodos}
        />
      </div>
    </div>
  );
};
