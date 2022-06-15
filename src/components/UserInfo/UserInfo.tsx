import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const {
    name,
    username,
    email,
    phone,
    address,
  } = user;

  return (
    <>
      {`name: ${name}`}
      <br />
      {`user name: ${username}`}
      <br />
      {`email: ${email}`}
      <br />
      {phone && `phone number: ${phone}`}
      <br />
      {address && `
        address:
        ${address.street} street,
        ${address.city},
        ${address.suite},
        ${address.zipcode}
      `}
    </>
  );
};
