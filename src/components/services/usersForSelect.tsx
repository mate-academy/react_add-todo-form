import usersFromServer from '../../api/users';

export const usersForSelect = usersFromServer.map(user => (
  <option value={user.id} key={user.id}>
    {user.name}
  </option>
));
