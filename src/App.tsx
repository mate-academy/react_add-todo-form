import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { getUserById } from './services/user';
import { ToDo } from './types/ToDo';
import { useState } from 'react';

const initialToDos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewToDoId(todos: ToDo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<ToDo[]>(initialToDos);

  const addToDo = (todo: Omit<ToDo, 'id'>) => {
    const newToDo = {
      ...todo,
      id: getNewToDoId(todos),
    };

    setTodos(currentToDos => [...currentToDos, newToDo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onAdd={addToDo} />

      <TodoList todos={todos} />
    </div>
  );
};
