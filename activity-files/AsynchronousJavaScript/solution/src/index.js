import { runPromise, runPromiseAsync } from './promises';
import { getResults, populateResults } from './getResultsUtils';
import { registerEventListeners } from "./formUtils";

runPromise();
runPromiseAsync();

// getResults() // Fetch

getResults() // AsyncAwait
    .then(results => populateResults(results))
    .catch(error => console.log(error.message));

registerEventListeners();
