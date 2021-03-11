
export const getNames = list => list.map(({ name, id }) => (
  {
    name, userId: id,
  }
));
