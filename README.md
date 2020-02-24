# React add TODO form
 https://sania517.github.io/react_todo-app/ 

## Task
1. Create `App` component storing `todos` array and displaying it with `TodoList`
2. Create `NewTodo` component with a form to add new TODOs
    - please add labels and placeholders where it is needed
    - each TODO should have a `title` and `userId` selected from a list of given `users` (`./src/api/users.js`)
    - show user names in `<select>`
    - the `TODO` should be added to the list after clicking `Add` button
    - `App` should add integer `id` to each TODO (starting from `1`)
3. Clear the form after adding a TODO
4. Add validation to the form
    - add an empty option `Choose a user` to the users select
    - before creating a user check if a `user` was selected, if not show an error next to `select` (Please choose a user)
    - if a title is empty show an error (Please enter the title)
    - errors should appear only after pressing `Add` button
5. Hide an error immediately when you edit a field with an error
6. (* Optional) Limit characters displayed in the `title` field.
  Allow entering `spaces` and alphanumeric (`\w`) characters.
