# Asynchronous JavaScript

## Activity 16b - Asynchronous JavaScript - Promises

### Outcomes - Activity 16b

- To understand how Promises work

### Actions - Activity 16b

1. Open **AsynchronousJavaScript/starter/** in a terminal and run an `npm install`.
2. Start the app running with `npm start` and view it on (<http://localhost:8080>) if the browser does not open automatically.
3. In **VSCode**, create a new file **promises.js** in the **AsynchronousJavaScript/Promises/starter/src** folder.
4. Create a function called **`runPromise()`** that is **exported** by **default**.
5. Inside the function, declare a variable called **`aPromise`** that is a `new`**`Promise`** whose **`constructor`** has an *arrow function* that:
      - Takes **`resolve`** and **`reject`** as arguments:
      - Has a function body that:
        - Declares a variable called **`delayedFunc`** that is set as below:

```js
export default function runPromise() {
  const aPromise = new Promise((resolve, reject) => {
    const delayedFunc = setTimeout(() => {
      
      const randomNumber = Math.random(); //whether it resolves or rejects is unknown

      (randomNumber < 0.5) ? resolve(randomNumber) : reject(randomNumber);

    }, Math.random() \* 5000);    //function will return sometime: 0-5s
  });
};
```

The fact that we have used **`setTimeout`** here and the final argument **`Math.random() * 5000`** (which generates a random number between 0 and 1 and multiplies it by 5000) means that the *arrow function* will execute somewhere between 0ms and 5000ms. The arrow function itself generates a random number between 0 and 1 and the **Promise** is resolved if the number is less than 0.5 and rejects otherwise.

4. Call **`aPromise`** with a **`.then`** chain and set **`data`** to be the *resolved value* and log this out.
5. Add a **`catch`** block and set **`error`** to be the *rejected value* and log this out.
6. Save the file and open **index.js**.
7. **import** **runPromise`** and then call it.
8. Save the file and refer to the console of your browser - don\'t forget that after each refresh you will need to wait up to 5 seconds for the result to show. Refresh the browser several times to satisfy that the Promise resolves and rejects randomly.

Challenge - can you rewrite this to use `async/await`

>This is the end of this activity.

---

## ACTIVITY 16c - Asynchronous JavaScript - Fetch

### Outcomes - Activity 16c

- To be able to use the Fetch API to be able to send and receive data.

### Actions - Activity 16c

1. Start ***json-server*** by pointing at the **reactrangers.json** file in the project's **src** folder:

```sh
json-server reactrangers.json
```

2. Open the files **getResultsUtils.js** and **formUtils.js** - you will see that some functions have been provided here to allow you to concentrate on the **Fetch** part of the application.
3. In the **src** folder, create a new file called **constants.js** and declare a **`const`** with the name of **`resultsURL`** with the *address of your results on* **json-server** as a *string value*. Ensure that this is **exported**.
4. If you look at the page in the browser, you should notice that there is a placeholder for the results but there is nothing displayed.
5. Populate the **`getResults`** arrow function in the **getResultsUtils.js** file with code that:
    - **Returns** a **`fetch`** call to **`resultsURL`** that in the *first* **`.then`** block:
      - Takes an argument of **results** in the arrow function;
      - Checks to see if **results.ok** is **true**, returning `results=results.json()`;
      - Otherwise **`throws`** a **`new Error`** object with the `message` **`Data  not fetched`**;
    - In the *second* **`.then`** block:
      - Takes an argument of **`results`** in the arrow function;
      - Sets a variable called **`reactRangersResults`** to **`results`**;
      - Calls the function **`populateResults`** with an argument of
         **`reactRangersResults`**.
    - In the **.catch** block:
      - Takes an argument of **`error`** in the arrow function;
      - Logs out **`error.message`**.

6. Save your work and open **index.js**.

7. Make a call to **`getResults`**, making sure you **`import`** it.

8. Save this file and check your browser window - the results should
     appear, perhaps after a short delay.

To make the form submit the data, another **Fetch** call is needed.

9. Open **formUtils.js** and locate **`submitResult`**.
10. The function body should:

- Declare a variable called **`resultToSubmit`** and set it to the
         *stringified version* of **`results`**:

```js
let resultToSubmit = JSON.stringify(result);
```

- `return` a **`fetch`** call to **`resultsURL`** (remember to **`import`**
    it!) with *a configuration object* that sets:
  - **`method`** to **`POST`**;
  - **`body`** to **`resultToSubmit`**;
  - **`mode`** to **`cors`**;
  - **`headers`** to:

```js
  "headers": {
    "Content-Type": "application/json"
  }
```

- In the first **`.then`** block:
  - Take **`response`** as the argument to the arrow function;
  - If **`response.ok`** is **`true`**, **`alert`** that **`Data submitted successfully`** and then call `getResults()` (ensuring you `import` it from the **getResultsUtils** file);
  - Otherwise **`throw`** a **`new`** **`Error`** with the **`message` Something went wrong, please try again**.

- In the **`.catch`** block:
  - Take **error** as the argument to the arrow function;
  - **Alerts** the **error message**.

11. Save the file and open **index.js**.

12. Make a call to the function **`registerEventListeners`** which should be **imported** from **formUtils.js**.

13. Save the file and enter data on the form

> You should notice that unless React Rangers (in any case) is one of the teams, the form does not submit. If you successfully enter data and submit, the page refreshes and the new result is displayed along with the others.

14. Check the **reactrangers.json** file you created before - the new result(s) is stored in this file and an id has automatically been added.

>This is the end of this activity.

---

## ACTIVITY 16d -  Asynchronous JavaScript - async/await

### Outcomes - Activity 16d

- To be able to use async/await to be able to send and receive data.

### Actions - Activity 16d

*A little bit of preparation first:*

- Comment out the `functions` directly under the Fetch comment in **getResultsUtils.js** and **formUtils.js**.

1. In **getResultsUtils**, immediately under the function you have just commented out, **`export`** a new **`async`** function called **`getResults`** that:
    - Sets a variable called **`results`** to **`await`** a **`fetch`** call to **`resultsURL`**;
    - Sets a variable called **`reactRangersResults`** to **`await results.json()`**;
    - *Returns* **`reactRangersResults`**.

2. In **index.js**, add a **`.then`** clause to the call to
    **`getResults`** that:
    - Takes **`results`** as an *arrow function argument*;
    - Passes **`results`** to a call to **`populateResults`** in the function body (don\'t forget to **`import`** **`populateResults`**!)

3. Add a **`.catch`** clause to the call to **`getResults`** that:
    - Takes **`error`** as an *arrow function argument*;
    - *Logs out* the **`error`** **`message`**.

4. Save all files and check that the results still display as before.

5. In **formUtils.js**, immediately under the function that has been commented out, declare an **`async`** function called **`submitResult`** that takes an argument of **`result`**.
6. The function body should:
    - Set **`resultToSubmit`** to the *stringified* version of **`result`**;
    - Set **`response`** to **`await`** the **`fetch`** call to **`resultsURL`** with the *same config object* as before;
    - Checks to see if the **`response`** was **`ok`** and if it was:
      - **alert** that the data was submitted OK
      - Call `getResults()` and chain a `.then` that calls `populateResults()` with the *resolved data*, *catching* an `error` and *logging* it if an `error` was produced
    - If `response` wasn't `ok` than alert that it wasn't!
    - *Returns* **`response`**.

7. Save this file and then check that the form still submits correctly.

>This is the end of this activity

---
