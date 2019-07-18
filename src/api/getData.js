const BASE_PATH = 'https://jsonplaceholder.typicode.com/';
const TODOS_PATH = 'todos';
const USERS_PATH = 'users';

export const getTodos = () => fetch(`${BASE_PATH}${TODOS_PATH}`)
  .then(response => response.json())
  .catch(error => error);

export const getUsers = () => fetch(`${BASE_PATH}${USERS_PATH}`)
  .then(response => response.json())
  .catch(error => error);
