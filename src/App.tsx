import "./App.scss";
import { useState } from "react";
import todos from "./api/todos";
import { TodoList } from "./components/TodoList";
import { Todo } from "./components/interface/Todo";
import { Form } from "./components/Form/Form";
import { getUserById } from "./components/ultis/UserIdUtils";

export const initialTodos: Todo[] = todos.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(newTodos: Todo[]) {
  const maxId = Math.max(...newTodos.map((todo) => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [newTodos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(newTodos),
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form onSubmit={addTodo} />

      <TodoList todos={newTodos} />
    </div>
  );
};
