import { User } from '../../types/User';

type Props = {
  users: User[];
};

export const SelectList: React.FC<Props> = ({ users }) => (
  <div className="field">
    <label htmlFor="setUserName">
      User:
      <select
        id="setUserName"
        data-cy="setUserName"
        value="Leanne Graham"
      >
        {users.map(user => (
          <option
            key={user.id}
            value={user.name}
          >
            {user.name}
          </option>
        ))}
        <option value="0" disabled>Choose a user</option>
      </select>
    </label>

    <span className="error">Please choose a user</span>
  </div>
);
