import { resultsURL } from "./constants";
import { getResults, populateResults } from "./getResultsUtils";

const prepareResultForSubmit = formData => {
  let result = {};
  for (let i = 0, j = formData.length - 1; i < j; i++) {
    result[formData[i].name] = formData[i].value;
  }
  return result;
};

// Fetch
const submitResult = result => {
  let resultToSubmit = JSON.stringify(result);
  return fetch(resultsURL, {
    method: "POST",
    body: resultToSubmit,
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        alert(`Data submitted successfully`);
        getResults();
      } else {
        throw new Error(`Something went wrong, please try again`);
      }
    })
    .catch(error => {
      alert(error.message);
    });
};

// Async/Await
// async function submitResult(result) {
//   let resultToSubmit = JSON.stringify(result);
//   let response = await fetch(resultsURL, {
//     method: "POST",
//     body: resultToSubmit,
//     mode: "cors",
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
//   if (response.ok) {
//     alert(`Data submitted successfully`);
//     getResults()
//       .then(results => populateResults(results))
//       .catch(error => console.log(error.message));
//   }
//   else {
//     alert(`Something went wrong, please try again`);
//   }
//   return response;
// }

const checkForReactRangers = formValues => {
  let searchText = `react rangers`;
  let homeTeam = formValues[0].value.toLowerCase();
  let awayTeam = formValues[2].value.toLowerCase();
  return (
    homeTeam.indexOf(searchText) === -1 && awayTeam.indexOf(searchText) === -1
  );
};

const handleSubmit = event => {
  event.preventDefault();
  if (checkForReactRangers(event.target)) {
    alert(`React Rangers not included in result!`);
  } else {
    let result = prepareResultForSubmit(event.target);
    submitResult(result);
  }
};

export const registerEventListeners = () => {
  let form = document.querySelector("#result");
  form.addEventListener("submit", handleSubmit);
};
