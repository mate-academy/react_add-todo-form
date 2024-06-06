// #region imports
import './App.scss';
import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { ToDo } from './Types/ToDo';
import { useState } from 'react';
// #endregion

const initialToDos: ToDo[] = todosFromServer.map(toDo => ({
  ...toDo,
  user: getUserById(toDo.userId),
}));

function getNewToDoId(toDos: ToDo[]) {
  const maxId = Math.max(...toDos.map(toDo => toDo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [toDos, setToDos] = useState<ToDo[]>(initialToDos);

  const addToDo = (toDo: ToDo) => {
    const newToDo = {
      ...toDo,
      id: getNewToDoId(toDos),
    };

    setToDos(currentToDos => [...currentToDos, newToDo]);
  };

  return (
    <div className="App">
      <h1 className="title is-1">Add to do form</h1>

      <TodoForm onSubmit={addToDo} />
      <TodoList toDos={toDos} />
    </div>
  );
};
