// eslint-disable-next-line @typescript-eslint/quotes
import usersFromServer from "../api/users";

export function findUserById(userId: number) {
  return usersFromServer.find((user) => user.id === userId) || null;
}
