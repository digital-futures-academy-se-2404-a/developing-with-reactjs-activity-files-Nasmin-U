# Working With External Data Activities

## ACTIVITY 15 - External Data - Using `useEffect`

### Outcomes - Activity 15

- To be able to use the useEffect hook

### Overview - Activity 15

In this activity, you will transfer the initial setting of state from the **useState** call to a call on **useEffect**. Although functionally, this will not add anything to the application, it is a starting point to transferring the obtaining of data from a static file import to a call to an external service. The **useEffect** hook needs to be imported and then implemented, simply calling **setTodos** with the imported **sampleTodo** array.

You should use the **ExternalData/starter** folder for this activity, remembering to run an **npm install** before starting or extend your previous Todo application.

### Action 1

1. Open **App.jsx** for editing.
2. Add `useEffect` to the list of imports from **React** (it should be placed inside the **`{}`**).
3. Change the value of the `useState` call in the Component to an ***empty array***.
4. Add a call to `useEffect` -- it takes an *arrow function* that executes a call to `setTodos` using the `sampleTodos` as the value for a **key** of `todos` in ***object***.
5. Use an empty array (`[]`) as the second argument to `useEffect`.
6. Save the file and run the application.

> The app will load the `todos` when available but not yet allow adding.
> This is the end of this activity.

---

### Activity 16a - GROUP ACTIVITY - Install JSON Server

Install JSON Server globally

Use the file *sampleTodos.json* from ExternalData/starter to provide some todo data from a fake RESTful service, do this:

- On port 4000
- Using _id as a unique identifier

Check that you can access the data in the browser by navigating to:

`http://localhost:4000/todos`

Check you can access an individual todo by navigating to:

`http://localhost:4000/todos/5cc08495bf3fd62d03f2f4c2`

which contains the `_id` of one of the todos in the JSON file.

---

### Activities 16b-16d are in the AsynchronousJavaScript folder

[Link](../AsynchronousJavaScript/README.md)

---

## ACTIVITY 17a - Use an External Service - GET data

### Outcomes - Activity 17a

- To be able to fetch data from an external service

### Overview - Activity 17a

In this activity, you will replace the static array with a call to an external REST API. To do this you will need to use the useEffect hook within **App** to make a data service GET call (using axios) to the retrieve the todos from your json-server and then set the todos in the app to this. Try/catch blocks should be used to conditionally render messages if the data is loading or if it fails to be fetched.

As the AllTodos component is dependent on the data, it should display a message to the user in place of the todo data should the data take longer to load than anticipated or the retrieval from the data source be unsuccessful.

You should continue to use the **ExternalData/starter** folder or extend your previous Todo application.

### Action 1 - Use axios to obtain data in a data service file

#### Action 1.1 - Write a test to ensure that the service will work

1. Create a file in the root of the project called `.env.development` and open it.
2. Set `VITE_APP_TODOSURL` to be `http://localhost:4000/todos` and save the file.
3. Create another file called `.env.testing` and set `NODE_ENV=development` and save the file
4. In the tests folder, create a file called **todosdata.service.test.js**
5. Import `axiosMock` from `axios`
6. Import the `getTodosService` function from the file it is help in
7. Import `sampleTodos` from the ***sampleTodos JSON*** file
8. Call `mock` on `vi` with `axios` as a string argument
9. Create a suite of tests called `External Data Tests`
10. Add a variable called `functionResult`, initially undefined
11. After each tests reset all of the the mocks (call resetAllMocks on vi)
12. Create a second suite called `getTodosService tests` and nest another suite called `Normal Data Returned`
13. Define `expectedReturn` as an object that has keys of `data` with a value of `sampleTodos` and a key of `status` set to `200`
14. Run an `async` `beforeEach` function in this suite that *mocks the expected resolved value* on an `axiosMock.get` call to be `expectedReturn` and sets the `functionResult` to `await` the call to `getTodosService`
15. Write a **test** that checks to see if `axiosMock.get` is actually called just once and with the `VITE_TODOSURL` obtained from the *testing environment*
16. Write a **test** to *assert* that `functionResult` equals the `sampleTodos`

> You can either go and write the code to pass this test now, or continue with these tests - your choice!

17. Write a second suite alongside `Normal Data Returned` with the title of `Empty Array Returned`, this should have 1 test that checks that an error object with a message containing `There are no todos stored` is returned when the resolved value of `axiosMock.get` sets `data` to an empty array with a `200` status and `functionResult` has been set to `await` a `getTodosService` call
18. Add a third suite called `Error returned` that should test that an *error with a test error message* is returned when the rejected value of `axiosMock.get` is an *error Object* and `functionResult` has been set to `await` a `getTodosService` call

#### Action 1.2 - Write function to pass the test

1. Create a new folder in `src` called `services` and a file called ***todosdata.service.js***.
2. Add an **`import`** for `axios` from `axios`.
3. `export` a `const` called `getTodosService` and set
    this to be an `async` arrow function that:
    - ***Tries*** to:
        - Set a `const` called `res` to `await` the **return** of an `axios.get` call to `import.meta.env.VITE_APP_TODOSURL`;
        - **Returns** `res.data` if **`res.data?`** has **`length`** otherwise **return** a `new Error` with its **message** set to `There are no todos stored`
        - **Catches** an error called `e` and **returns** the error

> Run the tests to see if your code passes and make sure all tests pass before moving on

#### Action 1.3 - Use the getTodosService in the App component

1. In **App.jsx**, Comment out the **`import`** for `sampleTodos`.
2. Add an `import` for the non-default `export` `getTodosService` from **services/todosdata.service**
3. Before the function create a `const` called `noDataMessageStart` and set it to `Data not available from the server:`;
4. Add a **new state** to the component called `error` and initially set it to an ***object*** with ***keys*** `message` set to an *empty string*, `type` set an *empty string* and `display` set to `false`.
5. Write an `async` function called `getTodos` that:
    - Sets a `const` called `returnedData` to `await` a call to `getTodosService`
    - Checks to see if `returnedData` is an *array* and calls `setTodos` with the returned data
    - If returnedData is an instance of JavaScript's in-built `Error` class:
      - Calls `setError` with an *object* that has a *key* of `message` set to `noDataMessageStart` concatenated with the `message` property of `returnedData`, *key* `type` set to the string `get` and a *key* `display` set to true
      - Calls `setTodos` with an empty array.
6. In the **`useEffect`** function:
    - **Change** the call to `setTodos` to `getTodos` (with no arguments).
    - Add a ***dependency*** of an empty ***array***.

Check that the state is as anticipated:

- Ensure that JSON server is running a serving the **todoData.json** file:

```sh
json-server todoData.json -p 4000 --id _id
```

- On another command line, navigate to your project folder and run the following command to install **axios** for the project:

```sh
npm i axios
```

- When the json-server is on, you should see that the state is the array of todos as per the sampleTodos json file
- Stop json-server running in the terminal
  - The AllTodos component should only show the table headings
  - Check to see if the state of the App component show the error state
  - Check that you have errors on the console - there should be 2 x GET errors

### Action 2 - Give the user some indication that there is no data

#### Action 2.1 - Show a modal from the App component to tell them data failed to load

1. Surround the **return** of the **App** component in a **React Fragment** and then *conditionally render* an **`InfoModal`** component (imported from **./Components/utils**) dependent on `getError.display` being `true`.

2. Pass the **`InfoModal`** component **props** of:

- `closeModal` -- set to a callback that sets `error` retaining its current state but sets `display` to `false`;

> This component will display a modal box if there is an error retrieving the data.

### Action 2 - Add error and loading handlers in the AllTodos Component

1. In **App.jsx**, add a keys of `message` and `type` to the `data` prop set in the `AllTodos` render and give these a value of `error.message` and `error.type`.
2. Save the file.
3. Open **Components/AllTodos.jsx** for editing.
4. Add the new message part of the props to the propTypes declaration for the component.
5. Add a state of `dataStatus` with an initial **value** of an **object** that has **keys** of `name` and `message` and string **values** of `loading` And `Data is loading...`.
6. Add a `useEffect` call that has:
    - A ***destructuring*** of the `data` prop to `message` and `type`.
    - Checks to see if `type` is the string `get` and `message` has `length` and if it does, sets the `dataStatus` state's `name` to the string `error` and the `message` to the `message` received (don't forget to optionally chain the length)
    - Checks to see if the `message` does not have `length` and if it doesn't returns `dataStatus` to its *original state*
    - A **dependency array** that contains `data`.
7. Under `useEffect`, create a const called `status` and set this to a *JSX statement* that is a wrapping *table-row* element that has a *table-data-cell* with an `id` of `dataStatus.name` and a *column span* of `3`.  The *table-data-cell* should contain `dataStatus`' `message`.
8. Change the `tbody` element in the **return** so it returns the array of `todos` as long as it has *at least 1 element* or the `status` *JSX element* if not.
9. Save the file and run the application.

>It should still function as it did before we used the \'External Data\' source.

10. Locate the command line that is running JSON Server and stop it (using **CTRL+C**).

11. Refresh the application and you should see the **`InfoModal`** and then the ***error message*** in place of the **`todos`**.

> You will find that the modal renders twice so you can't get rid of the greyed out background.
>
> To stop this happening, go into **main.js** and comment out the wrapping `<React.StrictMode>` component
>
> This is only rendered in development mode to help catch errors that can occur during the useEffect phase of a component's life-cycle
>
> Re-render the application to see it working properly

12. Add a ***`setTimeout`*** that lasts ***5 seconds*** around the **`*getData()`*** call in ***`useEffect`*** in **App.js**

>You should see the *\"loading\"* message until the data is returned. You may remove this once you have checked -- this should be tested in any tests that you write.

13. Remove the ***todo objects*** from the **todoData.json** file and check that the correct message is displayed (you may need to restart **json-server** to effect this change).

### Action 3 - Fix the broken test

If you run the tests at this point, only 1 test does not work.  This is because the test is making the axios call and returning the data object, so the modal is in play and the App component cannot complete:

> Submit todo - add test > it calls submitTodo with the todo when submit todo is clicked on TodoForm
>
> The failing test title

To make sure that the component thinks it has data, we need to mock the async getTodosService function and make it resolve to some acceptable data.

1. Open App.test.jsx for editing
2. Add an import for the getTodosService function
3. call `mock` on `vi` using the string path to the getTodosService file as the first argument and a callback arrow function that returns an object with a key of getTodosService with a value of vi.fn().
4. Before the `render` call, add a mockImplementation of getTodosService that simply returns the sampleTodos
5. After the `render` call, await a call to waitForElementToBeRemoved, passing in a callback that makes a getByText query on screen looking for the string `Data is loading...`
6. The rest of the test should follow that line and should pass again.

### If You Have Time

Read up on writing tests using **\@testing-library/react** to test the **App** component further to see:

- If the `Data is loading...` element is actually rendered
- If the modal shows if an error is returned
- If the modal is removed by clicking on the button
- If the modal is removed by clicking on the X
- If the async function is called

Test the AllTodos component further to see if

- If the table row shows `dataStatus.message` when no todos are supplied

The code for this can be found in the **solution-activity17/src/tests/** file and requires async tests that use screen, query helpers and matchers.

>This is the end of this activity.

---

## Activity 18 - Use an External Service - POST/PUT data

### Outcomes

- To be able to send data to an external service

### Overview

In this activity, you will add further functionality to the App component so that it is able to send the new todo submitted on the form to the REST API as POST request. To do this you will modify the submitTodo function in App.js so that rather than setting a new state, it sends the data to the REST service and then calls getTodos to retrieve them again. You should also manage the online status of the application during this process and any errors that may be returned.  

You should use the **Externaldata/starter** folder that you used for Activities 15 & 17, or use the **solution-activity17** folder as a base for this activity.

### Action 1 - Write a method in the service to POST a new todo

#### Action 1.1 Write the tests for the method

1. Open **todosdata.service.test.js**
2. Add a new suite called **submitTodoService tests** under the **getTodosService tests** suite, but still inside the most outer suite.
3. Inside this suite add another suite called **POST new todo tests**
4. Define a `testSubmittedTodo` to be an *object* and generate an ID for this new todo:

```js
const testSubmittedTodo = {
    todoDescription: `New Test Todo`,
    todoDateCreated: new Date().toUTCString(),
    todoCompleted: false
}
const test_id = generateTodoId();

```

5. Add an `async` `test` called **should call axios post with correct URL and data**
6. Set `functionResult` to `await` a call to `submitTodoService`, passing in `testSubmittedTodo`
7. You expect that `axiosMock.post` has been called exactly once and it was called with the imported URL and the testSubmittedTodo
8. Add another `async` `test` called **should return the correct data with successful POST call**
9. *Mock* the *resolved* value for an `axiosMock.post` call to be an *object* with a *key* of `data` set to an *object* that *spreads* the `testSubmittedTodo` and **adds** a *key* `_id` with a value of `test_id`
10. Set `functionResult` to `await` a call to `submitTodoService`, passing in `testSubmittedTodo`
11. Expect that the todo property of functionResult to equal an object that contains a *spread* of the `testSubmittedTodo` and a *key* `_id` with a value of `test_id`
12. After this suite, add a **POST Error Returned** suite with a *single* `async` `test` called should return an **Error object with provided error message**
13. In this test, set a `const` of `expectedReturn` to be an instance of `Error` with the *message* `Test POST Error`
14. Mock a rejected value from axiosMock.post to be expectedReturn
15. Set `functionResult` to `await` a call to `submitTodoService` (no argument needed)
16. Expect that `functionResult`'s `message` property is the same  `expectedReturn`'s `message` property

#### Action 1.2 Write the actual method

1. Open **todosdata.service.js** for editing
2. Add a new `async` function called `submitTodoService` (we will use this method for both adding and editing a Todo), it should:
   - Take `submittedTodo` as an argument
   - Try to make an `axios` `post` call to the environment `VITE_APP_TODOSURL` and submittedTodo as the **body**, returning an *object* with a *key* of `todo` set to `res.data`
   - Catch and return any errors

### Action 2 - Use the new service in the application

1. Ensure that JSON server is running a serving the **todoData.json**
    file:

```sh
json-server todoData.json -p 4000 \--id \_id
```

2. Open **App.js** for editing.
3. Add `submitTodoService` to the *imports*.
4. Change `submitTodo` so that it is an **`async`** *arrow function* that takes `todo` as an argument and replace its body with:
   - A declaration of a `const` called `returnedData` that is set to `await` a call to `submitTodoService` with `todo` as its argument
   - If `returnedData` is an *instance of Error,* `return` by calling `setError` with an *object* that has:
     - Key `message`, set to the string `There was a problem saving the todo:` interpolating `returnedData`'s `message` property
     - Key `type` set to the string `post-put`
     - Key `display` set to `true`
   - A call to `getTodos`
5. Save the file.

### Action 3 - Fix the failing test

The test `tests/App.test.jsx > App tests > Submit todo - add test > it calls submitTodo with the todo when submit todo is clicked on TodoForm` now fails - this is because we have not mocked the call to `submitTodoService` service and the test runner isn't sure what to do.

1. In **App.test.jsx**, add `submitTodoService` to the *imports*
2. In the `vi.mock` call, add `submitTodoService` to the *returned object* with a value of `vi.fn()`

3. Find the test that was causing the fail and replace the assert part of the test (i.e. the last 2 lines) with:

```js
expect(submitTodoService).toHaveBeenCalledTimes(1);
expect(submitTodoService).toHaveBeenCalledWith(expect.objectContaining({
        todoDescription: testDesc,
      }));
```

> The application should function correctly for getting all todos and adding a new todo. Check that you can persist a new todo and also that the error modal is displayed when you turn json-server off.
> Check that all of the tests pass
>
> Running coverage at this point shows part of the App component's submitTodo method is not tested yet - can you write the test for it (correct code is in the solution file!)

**If you have time...**

Write functionality for the application that would allow the editing of a particular **todo**. See where you may be able to make components more type-safe using **PropTypes** or have cleaner code through *refactoring* and *destructuring*. Add any additional tests that you feel are required.

The solution for this can be found in the folder **solution-activity18-extended**. There is a [*markdown*](./solution-activity18-extended/StepsForEditFunctionality.md) file in the project that explains the steps taken.

Note that some of the testing practices in this are older but they are still valid.

>This is the end of this activity.

---
