type Props = {
  user: {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: string,
        lng: string,
      },
    },
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string,
    },
  } | undefined,
};

export const User:React.FC<Props> = ({ user }) => {
  return (
    <div className="user__name" style={{ color: 'red' }}>
      {'name - '}
      {user !== undefined ? user.name : 'no name'}
    </div>
  );
};
