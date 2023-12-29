export function completeTodo(completed: boolean) {
  if (completed) {
    return 'TodoInfo--completed';
  }

  return '';
}
