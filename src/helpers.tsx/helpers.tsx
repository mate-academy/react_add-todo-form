import usersFromServer from "../api/users";
import todosFromServer from "../api/todos";

export function getUser(userId: number) {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const tasks = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));
