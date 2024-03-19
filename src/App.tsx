import { useState } from 'react';
import './App.scss';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';
import { TodoError } from './components/types/TodoError';
import { Form } from './components/Form/Form';

export const App = () => {
  const [newTodos, setNewTodos] = useState(todos);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  function getNewPostId(toDos: Todo[]) {
    const maxId = Math.max(...toDos.map(todo => todo.id));

    return maxId + 1;
  }

  const [todoError, setTodoError] = useState<TodoError>({
    title: '',
    userId: '',
  });

  const addTodo = ({ id, ...data }: Todo) => {
    const todo = {
      id: getNewPostId(newTodos),
      ...data,
    };

    setNewTodos(oldTodos => [...oldTodos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        todoError={todoError}
        setTodoError={setTodoError}
        addTodo={addTodo}
      />

      <TodoList todos={newTodos} />
    </div>
  );
};
