// Function to add CSS styles
function styles() {
  const style = document.createElement("style");
  style.innerHTML = `
      /* Styles for the commute info */
     .commute-container {
        max-width: 400px;
        border: 2px solid #a5a5a5;
        border-radius: 14px;
        margin-top: 24px;
      }

      .commute-upper {
        padding: 20px;
      }

      .commute-upper-header a {
        text-decoration: none;
        color: #202124;
        font-size: 16px;
        font-weight: 500;
        display: block;
        padding: 10px 0 15px;
      }

      .commute-upper-header p {
        font-size: 20px;
        font-weight: 500;
        color: #202124;
        padding-bottom: 10px;
      }

      .modes-btn-container {
        display: flex;
        gap: 16px;
        justify-content: space-around;
        margin-bottom: 12px;
      }

      .modes-btn-container .mode-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: none;
        background-color: transparent;
        cursor: pointer;
      }

      .modes-btn-container .mode-btn.mode-btn-active img {
        filter: invert(0);
        background-color: #e0ecfd;
      }

      .modes-btn-container .mode-btn.mode-btn-active span {
        color: #007bff;
      }

      .modes-btn-container .mode-btn img {
        margin-bottom: 5px;
        width: 33px;
        filter: invert(0.5);
        padding: 4px;
        border-radius: 50px;
      }

      .modes-btn-container .mode-btn span {
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0;
        line-height: 0.9375rem;
        color: black;
      }

      .ext-input {
        padding: 8px;
        border: 1px solid black;
        border-radius: 8px;
        width: 100%;
      }

      .ext-input-address-container label {
        display: inline-block;
        margin: 18px 0 10px;
      }

      #calculate {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 5px;
        width: 100%;
      }

      #calculate:hover {
        background-color: #0056b3;
      }
    `;
  document.head.appendChild(style);
}

styles();

// Wait for the page to load
window.addEventListener("load", () => {
  // Locate the parent div and the target div within it
  const parentDiv = document.querySelector("div._1olqsf9j");
  const address = document.querySelector("address._1olqsf99").innerText;
  const targetDiv = parentDiv ? parentDiv.querySelector("div._133vwz70") : null;

  if (targetDiv) {
    document.querySelector("div._1olqsf9j").style.position = "relative";

    // Create a new div to hold the commute info UI
    const commuteDiv = document.createElement("div");
    commuteDiv.innerHTML = `
    <div class="commute-container">
      <div class="commute-upper">
        <div class="commute-upper-header">
          <a href="https://jrgoldfinch.co.uk/">Jrgoldfinch.co.uk</a>

          <p>Commute Time Estimator</p>
        </div>

        <div class="modes-btn-container">
          <button class="mode-btn mode-btn-active">
            <img src="https://maps.gstatic.com/consumer/images/icons/2x/ic_directions_filled_blue900_24px.png" alt="best" />
            <span>Best</span>
          </button>

          <button class="mode-btn">
            <img src="https://maps.gstatic.com/consumer/images/icons/2x/directions_car_filled_blue900_24dp.png" alt="car" />
            <span>10 min</span>
          </button>

          <button class="mode-btn">
            <img src="https://maps.gstatic.com/consumer/images/icons/2x/directions_transit_filled_blue900_24dp.png" alt="train" />
            <span>10 min</span>
          </button>

          <button class="mode-btn">
            <img src="https://maps.gstatic.com/consumer/images/icons/2x/directions_walk_blue900_24dp.png" alt="walk" />
            <span>10 min</span>
          </button>

          <button class="mode-btn">
            <img src="https://maps.gstatic.com/consumer/images/icons/2x/directions_bike_blue900_24dp.png" alt="cycle" />
            <span>10 min</span>
          </button>
        </div>

        <div style="width: 92%; margin: 0 auto">
          <div>
            <input class="ext-input" type="text" placeholder="Enter house address" value="${address}" />
          </div>
          <div class="ext-input-address-container" style="margin-bottom: 10px">
            <label for="destination">Enter your workplace address</label>
            <input type="text" class="ext-input" id="destination" placeholder="Enter destination address" />
          </div>
          <button id="calculate">Calculate Commute</button>
        </div>

        <div id="results" style="display: none">
          <h4>Commute Details</h4>
          <p id="distance"></p>
          <p id="duration"></p>
          <p id="traffic"></p>
          <ul id="directions"></ul>
        </div>
      </div>
    </div>
    `;

    // Insert the commuteDiv as the next sibling of targetDiv
    targetDiv.insertAdjacentElement("afterend", commuteDiv);

    // Add event listener to the Calculate Commute button
    document.getElementById("calculate").addEventListener("click", async () => {
      const destination = document.getElementById("destination").value;
      if (!destination) {
        alert("Please enter a destination address.");
        return;
      }

      console.log({ origin: address, destination });

      try {
        const results = await getCommuteInfo(address, destination);
        displayResults(results);
      } catch (error) {
        console.error("Error fetching commute info:", error);
      }
    });
  }
});

// Function to fetch commute data from Google Maps Directions API
async function getCommuteInfo(origin, destination) {
  const response = await fetch(`http://localhost:3000/directions?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
  const data = await response.json();

  findFastestRoute(data)

  if (data.status === "ZERO_RESULTS") {
    alert("No routes found between the specified locations.");
    throw new Error("No routes found between the specified locations.");
  } else if (data.status === "NOT_FOUND") {
    alert("One or both locations could not be geocoded.");
    throw new Error("One or both locations could not be geocoded.");
  } else if (data.status !== "OK") {
    alert("Invalid address or no routes found.");
    throw new Error("Invalid address or no routes found.");
  }

  // return data.routes;
  return data; // Now, this will contain the entire response from the Directions API
}

function displayResults(data) {
  console.log(data);
  const resultsContainer = document.getElementById("results");
  resultsContainer.style.display = "block";
  resultsContainer.innerHTML = ""; // Clear previous results

  // Check if the response status is OK
  if (data.status !== "OK") {
    const errorMessage = document.createElement("p");
    errorMessage.innerText = "No routes found or invalid response";
    resultsContainer.appendChild(errorMessage);
    return;
  }

  // Loop through each route in the response
  data.routes.forEach((route, index) => {
    const { legs } = route;
    const { duration, distance } = legs[0];

    // Create elements to display route information
    const routeTitle = document.createElement("h4");
    routeTitle.innerText = `Route ${index + 1}`;
    resultsContainer.appendChild(routeTitle);

    const routeInfo = document.createElement("div");
    routeInfo.innerHTML = `
      <p>Estimated Time: ${duration.text}</p>
      <p>Distance: ${distance.text}</p>
    `;

    // Display step-by-step directions
    const directionsList = document.createElement("ul");
    legs[0].steps.forEach((step) => {
      const direction = document.createElement("li");
      direction.innerText = step.html_instructions.replace(/<[^>]+>/g, ""); // Strips HTML tags from instructions
      directionsList.appendChild(direction);
    });

    routeInfo.appendChild(directionsList);
    resultsContainer.appendChild(routeInfo);
  });
}

// utils

function findFastestRoute(data) {
  if (!data.routes || data.routes.length === 0) {
    console.log("No routes available.");
    return null;
  }

  // Initialize variables to track the shortest duration and the fastest route
  let fastestRoute = data.routes[0];
  let shortestDuration = fastestRoute.legs[0].duration.value;

  // Iterate over each route to find the one with the minimum duration
  data.routes.forEach((route) => {
    const routeDuration = route.legs[0].duration.value; // duration in seconds

    // Update if the current route is faster
    if (routeDuration < shortestDuration) {
      fastestRoute = route;
      shortestDuration = routeDuration;
    }
  });

  console.log(fastestRoute);
  return fastestRoute;
}