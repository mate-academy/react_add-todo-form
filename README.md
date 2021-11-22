# React add TODO form
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://cyb1ove.github.io/react_add-todo-form/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)
- Use [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript)

## Task
Implement ability to add TODOs to the `TodoList` implemented in [Static list of todos](https://github.com/mate-academy/react_static-list-of-todos)

1. Create `App` component storing `todos` array and displaying it using `TodoList`
1. Create a form to add new TODOs
    - DON'T create a separate component for the form (later we will learn how to do it)
    - there should be a text input for the `title`
    - also add a `<select>` with all the users from `./src/api/users.js`
    - add labels and placeholders where they are needed
    - the `TODO` should be added to the list after clicking `Add` button
    - each TODO should have `id`, `title` and `userId`
    - `id` is a maximal `id` in the array + 1
1. Clear the form after adding a TODO
1. Add a validation to the form
    - add an empty option `Choose a user` to the users select
    - before creating a todo check if a `user` was selected, if not show an error message next to the `select` (`Please choose a user`)
    - if the `title` is empty show an error message next to the `title` field (`Please enter the title`)
    - errors should appear only after pressing `Add` button
    - hide a message immediately after any change of the field with an error
1. (* Optional) Limit characters displayed in the `title` field.
  Allow entering letters (`ru` and `en`), digits and `spaces`.
