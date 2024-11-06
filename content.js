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
        cursor: not-allowed;
      }

      .modes-btn-container .mode-btn.mode-btn-active {
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

      .ext-input-label {
        display: inline-block;
        margin-bottom: 10px;
      }

      .question-icon {
        width: 20px;
        height: 20px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: black;
        margin-left: 5px;
        text-decoration: none;
        border: 1px solid black;
        border-radius: 50px;
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

      .commute-lower {
        border-top: 8px solid #dadce0;
        padding: 20px;
      }

      .fastest-route-container {
        width: 92%;
        margin: 0 auto;
        border-left: 5px solid #1f69dd;
        padding-left: 20px;
      }

      .fastest-route-container div {
        display: flex;
        gap: 10px;
        justify-content: space-between;
      }

      .fastest-route-container div p.route-name {
        font-size: 1.1rem;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 1.5rem;
        color: #202124;
      }

      .fastest-route-container div.route-details {
        font-size: 0.875rem;
        font-weight: 400;
        letter-spacing: 0;
        line-height: 1.25rem;
        color: #70757a;
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
          <a href="https://jrgoldfinch.co.uk/" target="_blank">Jrgoldfinch.co.uk</a>

          <p>Commute Time Estimator</p>
        </div>

        <div class="modes-btn-container">
          <button class="mode-btn">
            <img src="https://maps.gstatic.com/consumer/images/icons/2x/ic_directions_filled_blue900_24px.png" alt="best" />
            <span id="best-btn-duration">Best</span>
          </button>

          <button class="mode-btn mode-btn-active">
            <img src="https://maps.gstatic.com/consumer/images/icons/2x/directions_car_filled_blue900_24dp.png" alt="car" />
            <span id="driving-btn-duration">--</span>
          </button>

          <button class="mode-btn">
            <img src="https://maps.gstatic.com/consumer/images/icons/2x/directions_transit_filled_blue900_24dp.png" alt="train" />
            <span id="transit-btn-duration">--</span>
          </button>

          <button class="mode-btn">
            <img src="https://maps.gstatic.com/consumer/images/icons/2x/directions_walk_blue900_24dp.png" alt="walk" />
            <span id="walking-btn-duration">--</span>
          </button>

          <button class="mode-btn">
            <img src="https://maps.gstatic.com/consumer/images/icons/2x/directions_bike_blue900_24dp.png" alt="cycle" />
            <span id="bicycling-btn-duration">--</span>
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

          <div>
            <div style="margin-bottom: 10px; padding-top: 4px">
              <label for="mpg" class="ext-input-label">MPG - Miles Per Gallon</label>
              <a
                href="https://www.caranddriver.com/research/a31873205/mpg-meaning/#:~:text=What%20Is%20MPG,vehicle%27s%20official%20MPG."
                target="_blank"
                class="question-icon"
                >?</a
              >
              <input type="number" class="ext-input" id="mpg" placeholder="Enter MPG" />
            </div>
          </div>

          <div>
            <div style="margin-bottom: 10px; padding-top: 4px">
              <label for="fuel-price" class="ext-input-label">Fuel Price Per Liter</label>
              <input type="number" class="ext-input" id="fuel-price" placeholder="Enter Fuel Price" />
            </div>
          </div>

          <button id="calculate">Calculate Commute</button>
        </div>
      </div>

      <div id="other-routes-container">
        <div id="fastest-route" class="commute-lower" style="display: none">
          <div class="fastest-route-container">
            <div style="margin-bottom: 8px">
              <p id="fastest-route-name" class="route-name" style="width: 70%"></p>
              <p id="fastest-duration"></p>
            </div>
            <div class="route-details">
              <p style="width: 70%">Fastest route</p>
              <p id="fastest-distance"></p>
            </div>
            <div class="route-details">
              <p style="width: 70%">Fuel Price:</p>
              <p id="fastest-route-fuel-price"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

    // Insert the commuteDiv as the next sibling of targetDiv
    targetDiv.insertAdjacentElement("afterend", commuteDiv);

    // Add event listener to the Calculate Commute button
    document.getElementById("calculate").addEventListener("click", async () => {
      const destination = document.getElementById("destination").value;
      const milesPerGallon = document.getElementById("mpg").value;
      const fuelPrice = document.getElementById("fuel-price").value;

      if (!destination) {
        alert("Please enter a destination address.");
        return;
      } else if (!milesPerGallon) {
        alert("Please enter the MPG value.");
        return;
      } else if (!fuelPrice) {
        alert("Please enter the fuel price.");
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
  const response = await fetch(
    `https://commute-info-extension-server.vercel.app/directions?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
  );
  const data = await response.json();

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

  // Check if the response status is OK
  if (data.status !== "OK") {
    return;
  }

  const fastestRoute = findFastestRoute(data?.modes?.driving);
  displayFastestRoute(fastestRoute);

  // filter routes without the fastest route
  const otherRoutes = data?.modes?.driving?.routes.filter((route) => route?.summary !== fastestRoute?.summary);
  displayOtherRoutes(otherRoutes);

  // update the duration for each mode button
  updateDuration(data);

  // // Loop through each route in the response
  // data.routes.forEach((route, index) => {
  //   const { legs } = route;
  //   const { duration, distance } = legs[0];

  //   // Create elements to display route information
  //   const routeTitle = document.createElement("h4");
  //   routeTitle.innerText = `Route ${index + 1}`;
  //   resultsContainer.appendChild(routeTitle);

  //   const routeInfo = document.createElement("div");
  //   routeInfo.innerHTML = `
  //     <p>Estimated Time: ${duration.text}</p>
  //     <p>Distance: ${distance.text}</p>
  //   `;

  //   // Display step-by-step directions
  //   const directionsList = document.createElement("ul");
  //   legs[0].steps.forEach((step) => {
  //     const direction = document.createElement("li");
  //     direction.innerText = step.html_instructions.replace(/<[^>]+>/g, ""); // Strips HTML tags from instructions
  //     directionsList.appendChild(direction);
  //     ``;
  //   });

  //   routeInfo.appendChild(directionsList);
  //   resultsContainer.appendChild(routeInfo);
  // });
}

// utils

// Function to update the duration for each mode button
function updateDuration(data) {
  const modes = ["driving", "transit", "walking", "bicycling"];
  modes.forEach((mode) => {
    const route = findFastestRoute(data?.modes[mode]);
    const duration = route?.legs[0]?.duration?.text;
    document.getElementById(`${mode}-btn-duration`).innerText = duration;
  });
}

// Function to calculate the fuel price
function calculateFuelPrice(distance) {
  const milesPerGallon = document.getElementById("mpg").value;
  const fuelPrice = document.getElementById("fuel-price").value;
  const totalFuel = distance / milesPerGallon;
  const fuelInLiter = totalFuel * 4.54609;
  const fuelCost = (fuelInLiter * fuelPrice).toFixed(2);
  console.log(fuelCost);
  return fuelCost;
}

// Function to find the fastest route from the list of routes
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

// Function to display the fastest route
function displayFastestRoute(route) {
  console.log(route);
  const fastestRouteContainer = document.querySelector("#fastest-route");
  const routeName = document.querySelector("p#fastest-route-name");
  const routeDuration = document.querySelector("p#fastest-duration");
  const routeDistance = document.querySelector("p#fastest-distance");
  const fuelPrice = document.querySelector("p#fastest-route-fuel-price");

  fastestRouteContainer.style.display = "block";
  routeName.innerText = `via ${route.summary}`;
  routeDuration.innerText = route?.legs[0]?.duration?.text;
  routeDistance.innerText = `${(route?.legs[0]?.distance?.value / 1609).toFixed(1)} miles`;
  fuelPrice.innerText = `${calculateFuelPrice(Number(route?.legs[0]?.distance?.value / 1609))}£`;
}

// Function to display other routes
function displayOtherRoutes(routes) {
  const otherRoutesContainer = document.querySelector("#other-routes-container");
  otherRoutesContainer.style.display = "block";
  // otherRoutesContainer.innerHTML = ""; // Clear previous routes

  console.log(routes);

  routes.forEach((route, index) => {
    const otherRoute = document.createElement("div");
    otherRoute.style.borderTop = "1px solid #dadce0";
    otherRoute.style.padding = "20px";

    const duration = route?.legs[0]?.duration?.text;
    const distance = (route?.legs[0]?.distance?.value / 1609).toFixed(1);

    otherRoute.innerHTML = `
        <div class="fastest-route-container" style="border-left: 0px; padding-left: 0px;">
          <div style="margin-bottom: 8px">
            <p class="route-name" style="width: 70%">via ${route?.summary}</p>
            <p>${duration}</p>
          </div>
          <div class="route-details">
            <p style="width: 70%">Fuel Price: ${calculateFuelPrice(Number(distance))}£</p>
            <p>${distance} miles</p>
          </div>
        </div>
    `;

    otherRoutesContainer.appendChild(otherRoute);
  });
}
