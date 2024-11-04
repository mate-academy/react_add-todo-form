import usersFromServer from '../../api/users';

const getUserById = (id: number) =>
  usersFromServer.find(user => user.id === id);

export default getUserById;
