import { FC, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoForm } from '../TodoForm';
import { TodoList } from '../TodoList';
import { addTodo, getTodosByUserId, removeTodo } from '../../api/todos';
import { useAuthContext } from '../Auth/AuthContext';
import { Loader } from '../Loader';

export const Todos: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const authUser = useAuthContext();

  const loadTodos = async () => {
    if (!authUser) {
      return;
    }

    setLoading(true);

    const todosFromServer = await getTodosByUserId(authUser.id);

    setTodos(todosFromServer);
    setLoading(false);
  };

  useEffect(() => {
    loadTodos();
  }, [authUser]);

  const addNewTodo = async (todoData: Omit<Todo, 'id'>) => {
    setLoader(true);

    const todo = await addTodo(todoData);

    setTodos(prevTodos => [...prevTodos, todo]);

    setLoader(false);
  };

  const deleteTodo = async (todoId: number) => {
    await removeTodo(todoId);

    await loadTodos();
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(currentTodos => currentTodos.map(
      todo => (todo.id === updatedTodo.id ? updatedTodo : todo),
    ));
  };

  return (
    <>
      <TodoForm onSubmit={addNewTodo} loader={loader} />
      {loading
        ? (
          <Loader />
        )
        : (
          <TodoList
            todos={todos}
            onTodoDelete={deleteTodo}
            onTodoUpdate={updateTodo}
          />
        )}
    </>
  );
};
