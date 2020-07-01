export function preparedTodosList(todosItems, usersList) {
  const preparedList = todosItems.map((item) => {
    const clonedItem = { ...item };

    clonedItem.user = {
      ...usersList.find(user => user.id === clonedItem.userId),
    };

    return clonedItem;
  });

  return preparedList;
}
