// scripts.js
// Array containing the names of months
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Sample data object containing athlete information
const data = {
  response: {
    requestType: "FETCH_ATHLETE_DATA",
    requestBy: "ALL_MATCHING_ATHLETES",
    forDisplay: "BEST_RACES",
    data: {
      NM372: {
        firstName: "Nwabisa",
        surname: "Masiko",
        id: "NM372",
        races: [
          { date: "2022-11-18T20:00:00.000Z", time: [9, 7, 8, 6] },
          { date: "2022-12-02T20:00:00.000Z", time: [6, 7, 8, 7] },
        ],
      },
      SV782: {
        firstName: "Schalk",
        surname: "Venter",
        id: "SV782",
        races: [
          { date: "2022-11-18T20:00:00.000Z", time: [10, 8, 3, 12] },
          { date: "2022-11-25T20:00:00.000Z", time: [6, 8, 9, 11] },
          { date: "2022-12-02T20:00:00.000Z", time: [10, 11, 4, 8] },
          { date: "2022-12-09T20:00:00.000Z", time: [9, 8, 9, 11] },
        ],
      },
    },
  },
};

// Function to create HTML structure for each athlete
const createHtml = (athlete) => {
  // Destructure athlete object to get required data
  const { firstName, surname, id, races } = athlete;

  // Get the latest race details
  const latestRace = races[races.length - 1];
  const { date, time: timeAsArray } = latestRace;

  // Convert date to day, month, and year format
  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = MONTHS[eventDate.getMonth()];
  const year = eventDate.getFullYear();

  // Calculate total time of the latest race
  const total = timeAsArray.reduce((acc, cur) => acc + cur, 0);
  const hours = Math.floor(total / 60);
  const minutes = total % 60;

  // Find the HTML section corresponding to the athlete ID
  const section = document.querySelector(`section[data-athlete="${id}"]`);

  // Generate HTML content and insert it into the section
  section.innerHTML = `
      <h2>${id}</h2>
      <dl>
          <dt>Athlete</dt>
          <dd>${firstName} ${surname}</dd>
          <dt>Total Races</dt>
          <dd>${races.length}</dd>
          <dt>Event Date (Latest)</dt>
          <dd>${day} ${month} ${year}</dd>
          <dt>Total Time (Latest)</dt>
          <dd>${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}</dd>
      </dl>
  `;
};

// Loop through each athlete data and create HTML section for each
for (const athleteId in data.response.data) {
  const athlete = data.response.data[athleteId];
  createHtml(athlete);
}
