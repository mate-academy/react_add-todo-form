const getSort = (todos, sortField, isTheSame = false) => {
  if (isTheSame) {
    return [...todos].reverse();
  }

  const callbackSort = {
    id: (a, b) => a.id - b.id,
    title: (a, b) => a.title.localeCompare(b.title),
    completed: (a, b) => a.completed - b.completed,
    user: (a, b) => a.user.name.localeCompare(b.user.name),
  };

  const callback = callbackSort[sortField];

  return [...todos].sort(callback);
};

export default getSort;
