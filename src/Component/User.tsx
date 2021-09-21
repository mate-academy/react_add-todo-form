type Props = {
  id?: number,
  name?: string,
  username?: string,
  email?: string,
  address?: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string,
    },
  },
  phone?: string,
  website?: string,
  company?: {
    name: string,
    catchPhrase: string,
    bs: string,
  },
};

export const User:React.FC<Props> = ({ name }) => {
  return (
    <div className="user__name" style={{ color: 'red' }}>
      {'name - '}
      {name || 'no name'}
    </div>
  );
};
