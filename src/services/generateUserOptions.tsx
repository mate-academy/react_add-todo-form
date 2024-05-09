import { handleChange } from '../handlers/handleChange';
import { FormDataFields } from '../types/FormDataFields';
import { TouchedDataValues } from '../types/TouchedDataValues';
import { User } from '../types/User';

export const generateUserOption = (
  users: User[],
  formState: FormDataFields,
  setFormState: React.Dispatch<React.SetStateAction<FormDataFields>>,
  touchedState: TouchedDataValues,
) => {
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
        {users.map(user => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </>
  );
};
