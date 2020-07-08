export function getPreparedTodos(todosItems, usersList) {
  const preparedList = todosItems.map((item) => {
    const clonedItem = {
      ...item,
      user: usersList.find(user => user.id === item.userId),
    };

    return clonedItem;
  });

  return preparedList;
}
