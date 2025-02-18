import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types/TodoWithUser';
import { getNewTodoId, getUserById } from './services/userId';
import { useState } from 'react';
import { Form } from './components/Form/Form';

export const InitialTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(InitialTodos);
  const addTodo = ({ id, ...data }: TodoWithUser) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form onSubmit={addTodo} />
      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
