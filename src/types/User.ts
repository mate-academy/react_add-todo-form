import usersFromServer from '../api/users';

const user = usersFromServer[0];

export type User = typeof user;
export type UserId = typeof user.id;
