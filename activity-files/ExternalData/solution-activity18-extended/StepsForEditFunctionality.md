# Steps Taken to Include the Edit Todo Functionality

## 1. Change the link in the Todo component to select the todo to edit

### Write test to see if a function called selectTodo is called when a span with id of link is clicked

1. Open **/tests/Todo.test.js**
2. Add a test suite for **Todo event tests**
3. Add a test that checks to see if the `selectTodo` function is called when **Edit** is clicked
   1. Mock the `selectTodo` function
   2. Create a `testTodo`
   3. Set the `todoCompleted` property of `testTodo` to `false`
   4. Create a `testInstance`
   5. Obtain the `span` containing the text **Edit**
   6. Simulate a `click` on the `span`
   7. Assert that the `selectTodo` function was called with the `testTodo`
4. Save the file
5. Run the tests and check that the new test fails

### Write the code to pass the test

1. Open **Todo.jsx**
2. Add a second property of `selectTodo` to the component
3. Change the *if false* part of the `ternary` statement so that it renders a `<span>` with an `id` of `link` and an `onClick` that is set to an arrow function that calls `selectTodo` with the `todo` passed in through `props`
4. Add `selectTodo` to the `propTypes` object with a value of `PropTypes.func`
5. Save the file.

Run the tests again - you should find that your new test passes.

---

## 2. Change the AllTodos component to pass through the `selectTodo` function to Todo

1. Open **AllTodos.jsx**
2. Add `selectTodo` to the *props* for the component
3. Add a *prop* of `selectTodo` to the `Todo` component render passing it `selectTodo`
4. Add an additional `propType` of `selectTodo` that is a **function**
5. Save the file and check all tests still pass

---

## 3. Add the selectTodo code to App.js

1. Open **App.js**
2. Add a **state** for a `selectedId` that has an initial value of an *empty string*
3. Declare an *arrow function* called `selectTodo` that receives an argument of a `todo` and sets `selectedId` to the received `todo`'s `_id`
4. Add `selectTodo` as a **prop** to the *render* of `AllTodos`, passing in the *function of the same name* as its value
5. Add `todos` as a **prop** to the *render* of `AddEditTodo`, passing in `todos`, also pass in `selectedId`

Save the file and check that all tests still pass.

> Coverage shows that the selectTodo function is not tested - it will get tested as we complete the functionality

---

## 4. Add the Edit functionality to the AddEditTodo component

1. Open **AddEditTodo.jsx**
2. Add `todos` and `selectedId` to the `props` (and the `propTypes`)
3. Add an argument of `_id` to the `submitTodoHandler` and to the constructor call for the `TodoModel`
4. In the component logic, create a `const` called `title` and set this to `"Add"` or `"Edit"` depending on whether selectedId has a value or not - in the return, make it display this value
5. Add `props` of `todos` and `selectedId` to the `TodoForm`'s render - passing through the values

---

## 5. Add the Edit functionality to the TodoForm Component and remove the option to add a completed Todo

1. Open **TodoForm.jsx**
2. Add `todos` and `selectedId` to the `props` (and the `propTypes`)
3. Add a `useEffect` hook that sets the *3 state values* to that of the `todo` passed in through `props`, *if selectedId is present* by finding the todo by its ID in the todos array - the hook should have a **dependency** of the `todos` and `selectedId`
4. Create a const called `dateCreatedContent` (to keep the render clean) and set this to a JSX fragment that wraps 2 conditional JSX elements:
   1. If `selectedId` has a value, render a string that displays the *locale date string* and the *local time string* separated by an `@`
   2. If `selectedId` has no value, render a `DateCreated` component with props of `updateDateCreated` which is an arrow function that has `dateCreated` as its argument and calls `setDateCreated` with it
5. Replace the current render of the `DateCreated` component with `dateCreatedContent`
6. Make the display of the *completed checkbox* conditional on `selectedId` having a value

We will modify the tests for this component when we have completed the rest of the functionality

---

## 6. Update the submitTodoService to send PUT request if editing

1. Open **todosdata.service.js**
2. Change the declaration of `res` so that it is a ***ternary***, dependent on `submittedTodo` having an `_id` property:
   - *If it does*, make a `put` request to the *environment URL*, appending the `submittedTodo`'s `_id` *after a slash* and supplying `submittedTodo` as the body
   - If it doesn't, keep the existing post request

---

## 7. Fix the AddEditTodo test and TodoForm tests

1. Open **/tests/AddEditTodo.test.jsx**
2. The first test is in this suite failing as it expects to find `/add\/edit todo/i` in the document and, of course we only display "Add" now because we are not supplying a selectedId in this render - remove `/\edit` from the query and the test should pass.
3. Open **/tests/TodoForm.test.jsx**
4. Find the test for "it should render a Completed input and label" - in this suite, you want to use a `queryBy` instead of `getBy` and assert it is not in the document
5. Find the test for "it should render the new value in the checkbox when the todoCompleted onChange function is activated" and temporarily skip this until you add the *edit tests*

> Running coverage at this point shows:
> App component - line 52 not tested
> AddEditTodo component - line 15 not tested
> TodoForm component - lines 13-17 not tested
> todosdata.service - line 16 not tested

---

## 8. Make App 100% tested

To do this, you will need to add a test to the App component that:

- allows the todos to display
- finds a todo that is editable
- clicks on the edit link for that todo
- displays the todo in the form

We could test that the `submitTodoService` is called in this situation, but we already have a test that verifies that and the button's functionality has not been edited.

> Running coverage here shows that we've now got almost 100% coverage - but those other components should be tested individually!  Coverage just shows us that the code has run - there are some things we should assert on!

---

## 9. Make AddEditTodo 100% tested

To do this, you will need to supply a value for `selectedId` to the component and expect that the title is `"Edit Todo"` - you would also have to supply it an array of `todos`

---

## 10. Make the TodoForm 100% tested

To do this you will need to write/move some tests:

1. Supply the `todos` and the `selectedId` to the component and assert that the values are there on the form.
2. Assert that the checkbox is rendered and then check that it changes value when clicked

---

## 11. Test the updated submitTodoService function to make it 100% tested

To do this, add a test to check that the `submitTodoService` can be called with an existing todo (from sampleTodos - perhaps modify it) and a test to make sure that if it throws an error the error object is returned

## 12. Run the tests

Run all of the tests - they should pass - debug any errors!

```sh

Test Files  11 passed (11)
      Tests  50 passed (50)
   Start at  17:18:14
   Duration  2.41s (transform 285ms, setup 2.34s, collect 2.00s, tests 1.30s, environment 4.05s, prepare 1.04s)

 % Coverage report from istanbul
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------|---------|----------|---------|---------|-------------------
All files              |   99.23 |      100 |   97.43 |   99.19 |
 src                   |     100 |      100 |     100 |     100 |
  App.jsx              |     100 |      100 |     100 |     100 |
 src/Components        |     100 |      100 |     100 |     100 |
  AddEditTodo.jsx      |     100 |      100 |     100 |     100 |
  AllTodos.jsx         |     100 |      100 |     100 |     100 |
  Footer.jsx           |     100 |      100 |     100 |     100 |
  Header.jsx           |     100 |      100 |     100 |     100 |
  Todo.jsx             |     100 |      100 |     100 |     100 |
  TodoForm.jsx         |     100 |      100 |     100 |     100 |
 src/Components/utils  |   97.43 |      100 |   93.33 |   97.22 |
  DateCreated.jsx      |    92.3 |      100 |   83.33 |   91.66 | 9
  InfoModal.jsx        |     100 |      100 |     100 |     100 |
  Todo.model.js        |     100 |      100 |     100 |     100 |
  generateId.js        |     100 |      100 |     100 |     100 |
 src/services          |     100 |      100 |     100 |     100 |
  todosdata.service.js |     100 |      100 |     100 |     100 |
-----------------------|---------|----------|---------|---------|-------------------
```
