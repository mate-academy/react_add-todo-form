# React add TODO form
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_add-todo-form/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## Task
Implement ability to add TODOs to the `TodoList` implemented in [Static list of todos](https://github.com/mate-academy/react_static-list-of-todos)

1. Create `App` component storing `todos` array and displaying it with `TodoList`
1. Create `NewTodo` component with a form to add new TODOs
    - please add labels and placeholders where it is needed
    - each TODO should have a `title` and `userId` selected from a list of given `users` (`./src/api/users.js`)
    - show user names in `<select>`
    - the `TODO` should be added to the list after clicking `Add` button
    - `App` should add integer `id` to each TODO (starting from `1`)
1. Clear the form after adding a TODO
1. Add validation to the form
    - add an empty option `Choose a user` to the users select
    - before creating a user check if a `user` was selected, if not show an error next to `select` (Please choose a user)
    - if a title is empty show an error (Please enter the title)
    - errors should appear only after pressing `Add` button
1. Hide an error immediately when you edit a field with an error
1. (* Optional) Limit characters displayed in the `title` field.
  Allow entering `spaces` and alphanumeric (`\w`) characters.
