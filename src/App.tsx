import { useState } from 'react';
import './App.scss';
import { Form } from './components/Form/Form';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';

function getNewUserId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
})) as Todo[];

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewUserId(todos),
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form onSubmit={(todo: Todo) => {
        addTodo(todo);
      }}
      />

      <TodoList todos={todos} />
    </div>
  );
};
