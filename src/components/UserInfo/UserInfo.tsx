import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo = ({ user }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
    // <div className="field">
    //   <label htmlFor="user">User: </label>

    //   <select
    //     id="user"
    //     name="user"
    //     data-cy="userSelect"
    //     defaultValue={user}
    //     onChange={event => {
    //       setUser(+event.target.value);
    //       isError = false;
    //     }}
    //   >
    //     <option value={0} disabled>
    //       Choose a user
    //     </option>

    //     {usersFromServes.map(person => (
    //       <option value={person.id + 1} key={person.id}>
    //         {person.name}
    //       </option>
    //     ))}
    //   </select>

    //   {isError && <span className="error">Please choose a user</span>}
    // </div>
  );
};
