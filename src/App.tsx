import './App.scss';

import usersFromServer from './entities/user/service/users.mock';
import todosFromServer from './entities/todo/service/todos.mock';
import {
  todoAggregate,
  TodoAggregate,
} from './entities/todo/domain/TodoAggregate';
import { TodoList } from './components/TodoList/TodoList';
import { CreateForm } from './components/CreateForm';
import { useState } from 'react';

const todosAggregate: TodoAggregate[] = todoAggregate.getTodoAggregates(
  todosFromServer,
  usersFromServer,
);

export const App = () => {
  const [todos, setTodos] = useState<TodoAggregate[]>(todosAggregate);

  const handleAddTodo = (todo: TodoAggregate) => {
    setTodos(current => [...current, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <CreateForm
        users={usersFromServer}
        onSubmit={handleAddTodo}
        todos={todos}
      />

      <TodoList todos={todos} />
    </div>
  );
};
