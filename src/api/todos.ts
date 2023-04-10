import { Todo } from "../types/Todo";

export const mockedTodos = [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: true,
    userId: 1,
  },
  {
    id: 15,
    title: 'some other todo',
    completed: false,
    userId: 1,
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
    userId: 4,
  },
];

export const USER_ID = 5003;
const BASE_URL = 'https://mate.academy/students-api';
const TODOS_ENDPOINT = '/todos';

export const getTodos = async () => {
  const response = await fetch(
    `${BASE_URL}${TODOS_ENDPOINT}?userId=${USER_ID}`,
  );
  const todos = await response.json();

  return todos;
};

export const addTodoOnServer = async (
  todoData: Omit<Todo, 'id'>,
): Promise<Todo> => {
  const responce = await fetch(
    `${BASE_URL}${TODOS_ENDPOINT}`,
    {
      method: 'POST',
      body: JSON.stringify(todoData),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    },
  );

  return responce.json();
};

export const deleteTodosFromSevrer = async (
  todoId: number,
) => {
  return fetch(
    `${BASE_URL}${TODOS_ENDPOINT}/${todoId}`,
    {
      method: 'DELETE',
    },
  );
};
