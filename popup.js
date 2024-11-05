// // // Get User Input and Make API Call

// // document.getElementById("calculate").addEventListener("click", async () => {
// //   const destination = document.getElementById("destination").value;

// //   if (!destination) {
// //     alert("Please enter a destination address.");
// //     return;
// //   }

// //   try {
// //     const results = await getCommuteInfo(destination);
// //     displayResults(results);
// //   } catch (error) {
// //     console.error("Error fetching commute info:", error);
// //     alert("Error fetching commute information: " + error.message);
// //   }
// // });

// // async function getCommuteInfo(destination) {
// //   const origin = "Current+location"; // Optionally, replace with a fixed starting point
// //   const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${encodeURIComponent(
// //     destination
// //   )}&alternatives=true&key=YOUR_API_KEY`;

// //   const response = await fetch(apiUrl);

// //   if (!response.ok) throw new Error("Network response was not ok");

// //   const data = await response.json();

// //   if (data.status !== "OK") {
// //     throw new Error("Invalid address or no routes found.");
// //   }

// //   return data.routes;
// // }

// // // Display Distance, Duration, and Traffic Conditions

// // function displayResults(routes) {
// //   const resultsContainer = document.getElementById("results");
// //   resultsContainer.style.display = "block";

// //   resultsContainer.innerHTML = ""; // Clear previous results

// //   routes.forEach((route, index) => {
// //     const { legs } = route;
// //     const { duration, distance, steps } = legs[0];

// //     // Create elements to display distance and duration
// //     const routeInfo = document.createElement("div");
// //     routeInfo.innerHTML = `
// //       <p><strong>Route ${index + 1}:</strong></p>
// //       <p>Estimated Time: ${duration.text}</p>
// //       <p>Distance: ${distance.text}</p>
// //     `;

// //     // Add step-by-step directions
// //     const directionsList = document.createElement("ul");
// //     steps.forEach((step) => {
// //       const direction = document.createElement("li");
// //       direction.innerText = step.html_instructions.replace(/<[^>]+>/g, ""); // Strips HTML tags from instructions
// //       directionsList.appendChild(direction);
// //     });

// //     routeInfo.appendChild(directionsList);
// //     resultsContainer.appendChild(routeInfo);
// //   });
// // }

// // // Error Handling in getCommuteInfo Function

// // async function getCommuteInfo(destination) {
// //   try {
// //     const origin = "Current+location";
// //     const apiUrl = "response.json"; // Replace with the actual API URL

// //     // const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${encodeURIComponent(
// //     //   destination
// //     // )}&alternatives=true&key=YOUR_API_KEY`;

// //     const response = await fetch(apiUrl);

// //     if (!response.ok) throw new Error("Network response was not ok");

// //     const data = await response.json();

// //     if (data.status !== "OK") {
// //       throw new Error("Invalid address or no routes found.");
// //     }

// //     return data.routes;
// //   } catch (error) {
// //     alert("Error fetching commute information: " + error.message);
// //     throw error;
// //   }
// // }


// // Add event listener for the Calculate Commute button
// document.getElementById('calculate').addEventListener('click', async () => {
//   const destination = document.getElementById('destination').value;

//   if (!destination) {
//     alert("Please enter a destination address.");
//     return;
//   }

//   try {
//     const results = await getCommuteInfo(destination);
//     displayResults(results);
//   } catch (error) {
//     console.error("Error fetching commute info:", error);
//   }
// });

// // Function to get commute info from Google Maps Directions API
// async function getCommuteInfo(destination) {
//   const origin = "Current+location"; // Optionally, replace with a fixed starting point

//   const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${encodeURIComponent(destination)}&alternatives=true&key=YOUR_API_KEY`;

//   const response = await fetch(apiUrl);
//   const data = await response.json();

//   if (data.status !== "OK") {
//     throw new Error("Invalid address or no routes found.");
//   }

//   return data.routes;
// }

// // Function to display commute results in div._133vwz70's last child
// function displayResults(routes) {
//   // Locate the div._133vwz70's last child element
//   const targetContainer = document.querySelectorAll('._133vwz70')[0];
  
//   // Clear any previous results
//   targetContainer.innerHTML = '';

//   // Loop through each route and display key information
//   routes.forEach((route, index) => {
//     const { legs } = route;
//     const { duration, distance } = legs[0];

//     // Create a container for each route's information
//     const routeInfo = document.createElement('div');
//     routeInfo.className = 'route-info';
//     routeInfo.innerHTML = `
//       <p><strong>Route ${index + 1}:</strong></p>
//       <p>Estimated Time: ${duration.text}</p>
//       <p>Distance: ${distance.text}</p>
//     `;

//     // Add step-by-step directions
//     const directionsList = document.createElement('ul');
//     legs[0].steps.forEach(step => {
//       const direction = document.createElement('li');
//       direction.innerText = step.html_instructions.replace(/<[^>]+>/g, "");  // Strip HTML tags
//       directionsList.appendChild(direction);
//     });

//     routeInfo.appendChild(directionsList);
//     targetContainer.appendChild(routeInfo);
//   });
// }
