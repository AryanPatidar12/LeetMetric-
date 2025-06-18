document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-containeer");

    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");

    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    const cardStatsContainer = document.querySelector(".stats-card");

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        return true;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch the user details");
            }

            const data = await response.json();
            console.log("Logging data", data);

            // ✅ Update UI with actual stats
            easyLabel.textContent = data.easySolved;
            mediumLabel.textContent = data.mediumSolved;
            hardLabel.textContent = data.hardSolved;

        } catch (error) {
            console.error("Error fetching data:", error);
            statsContainer.innerHTML = '<p style="color: red;">User not found or error fetching data.</p>';
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    searchButton.addEventListener('click', function () {
        const username = usernameInput.value.trim();
        console.log("Logging in", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});
