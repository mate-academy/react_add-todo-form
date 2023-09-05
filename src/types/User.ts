import usersFromServer from '../api/users';

export type User = (typeof usersFromServer)[number];
