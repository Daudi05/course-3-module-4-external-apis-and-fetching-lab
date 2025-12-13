// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

document.addEventListener("DOMContentLoaded", () => {
  const stateInput = document.getElementById("state-input");
  const fetchButton = document.getElementById("fetch-alerts");
  const alertsDisplay = document.getElementById("alerts-display");
  const errorMessage = document.getElementById("error-message");

  fetchButton.addEventListener("click", () => {
    const state = stateInput.value.trim().toUpperCase();

    if (!/^[A-Z]{2}$/.test(state)) {
      showError("Please enter a valid two-letter state abbreviation.");
      return;
    }

    clearError();

    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Unable to fetch weather alerts.");
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // required by lab
        displayAlerts(data);
        stateInput.value = ""; // clear input
      })
      .catch(error => {
        console.log(error.message);
        showError(error.message);
      });
  });

  function displayAlerts(data) {
    alertsDisplay.innerHTML = "";

    const alertCount = data.features.length;

    const summary = document.createElement("h2");
    summary.textContent = `${data.title}: ${alertCount}`;
    alertsDisplay.appendChild(summary);

    const ul = document.createElement("ul");

    data.features.forEach(alert => {
      const li = document.createElement("li");
      li.textContent = alert.properties.headline;
      ul.appendChild(li);
    });

    alertsDisplay.appendChild(ul);
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
  }

  function clearError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
  }
});