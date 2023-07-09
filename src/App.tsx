import './App.scss';

import { useState } from 'react';
import todosFromServer from './api/todos';
import { AddNewTodo } from './components/addNewTodo/addNewTodo';
import { TodoList } from './components/TodoList';
import { ToDo } from './types/ToDo';
import { getUserById } from './services/user';

const initialTodos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: ToDo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<ToDo[]>(initialTodos);

  const onAddNewToDo = (todo: ToDo) => {
    const newToDo = {
      ...todo,
      completed: true,
      id: getNewTodoId(todos),
    };

    setTodos((currentToDos) => ([
      ...currentToDos,
      newToDo,
    ]));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddNewTodo onSubmit={onAddNewToDo} />

      <TodoList todos={todos} />
    </div>
  );
};
