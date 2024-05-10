import { handleChange } from '../../handlers/handleChange';
import { GenerateUserOptions } from '../../types/GenerateUserOptions';

export const GenerateUserOption: React.FC<GenerateUserOptions> = ({
  currentUsers,
  formState,
  setFormState,
  touchedState,
}) => {
  return (
    <>
      <label htmlFor="userSelect">User: </label>

      <select
        id="userSelect"
        data-cy="userSelect"
        name="userValue"
        value={formState.userValue}
        onChange={event => handleChange(event, setFormState)}
      >
        <option value={0} disabled={touchedState.userValue}>
          Choose a user
        </option>
        {currentUsers.map(user => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </>
  );
};
