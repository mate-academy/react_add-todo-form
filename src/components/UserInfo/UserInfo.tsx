interface RInterface {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const UserInfo = (r: RInterface) => {
  return (
    <option value={r.id} key={r.id}>
      {r.name}
    </option>
  );
};
