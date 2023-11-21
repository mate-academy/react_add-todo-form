import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/TodosProps';
import { PostForm } from './components/PostForm/PostForm';
import { getUserById } from './services/getUserById';
import todosFromServer from './api/todos';

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const todos = todosFromServer.map(todo => ({
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
      <h1>Add todo form</h1>
      <PostForm
        onSubmit={addTodo}
      />

      <TodoList
        todos={initialTodos}
      />
    </div>
  );
};
