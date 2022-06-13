import { User } from '../../types/User';

export const UserInfo: React.FC<User> = ({
  name,
  username,
  email,
  phone,
  address,
}) => (
  <>
    {'name: '}
    {name}
    <br />
    {'user name: '}
    {username}
    <br />
    {'email: '}
    {email}
    {phone && (
      <>
        <br />
        {'phone number: '}
        {phone}
      </>
    )}
    {address && (
      <>
        <br />
        address:
        <br />
        {'street: '}
        {address.street}
        {', city: '}
        {address.city}
        {', suite: '}
        {address.suite}
        {', zipcode: '}
        {address.zipcode}
      </>
    )}
  </>
);
