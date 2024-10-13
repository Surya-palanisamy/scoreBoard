// Array to hold participants and scores
let participants = [];

// Function to add/update participant score dynamically
function addOrUpdateParticipant(name, scoreChange) {
  // Check if participant already exists
  const index = participants.findIndex(
    (participant) => participant.name === name
  );

  if (index !== -1) {
    // Update score by adding the new scoreChange to the existing score
    participants[index].score += scoreChange;
  } else {
    // Add new participant with the initial score
    participants.push({ name, score: scoreChange });
  }

  // Sort participants by score in descending order
  participants.sort((a, b) => b.score - a.score);

  // Save to localStorage
  localStorage.setItem("participants", JSON.stringify(participants));

  // Update the table
  updateTable();
}

// Function to update the table with participants' data
function updateTable() {
  const tbody = document.getElementById("scoreBody");
  tbody.innerHTML = ""; // Clear the table body

  participants.forEach((participant, index) => {
    const row = document.createElement("tr");

    const rankCell = document.createElement("td");
    rankCell.textContent = index + 1;
    row.appendChild(rankCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = participant.name;
    row.appendChild(nameCell);

    const scoreCell = document.createElement("td");
    scoreCell.textContent = participant.score;
    row.appendChild(scoreCell);

    tbody.appendChild(row);
  });
}

// Load participants from localStorage when the page loads
function loadParticipants() {
  const storedParticipants = localStorage.getItem("participants");
  if (storedParticipants) {
    participants = JSON.parse(storedParticipants);
    updateTable();
  }
}

// Handle form submission
document.getElementById("scoreForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const scoreChange = parseInt(document.getElementById("score").value); // This can be positive or negative

  if (name && !isNaN(scoreChange)) {
    addOrUpdateParticipant(name, scoreChange);
  }

  // Clear input fields
  document.getElementById("name").value = "";
  document.getElementById("score").value = "";
});

// Load participants when the page is loaded
window.onload = function () {
  loadParticipants();
};
