import './App.scss';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

export const App = () => {
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm />
      <TodoList />

    </div>
  );
};
