# React add TODO form

## Demo link

Add link here: [DEMO LINK](https://djkamry22.github.io/react_add-todo-form/)


## Task

Implement ability to add TODOs to the `TodoList` implemented in [Static list of todos](https://github.com/mate-academy/react_static-list-of-todos)

1. Create `App` components storing `todos` array and displaying it with `TodoList`
2. Create `NewTodo` component with a form to add new TODOs
    - please add labels and placeholders where it is needed
    - each TODO show have a `title` and `userId` selected from a list of given `users` (`./src/api/users.js`)
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
6. (* Optional) Limit characters displayed in the `title` field to alphanumeric (`\w`)
