let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let gamePlayed = false;
let timeLeft = 30; // 30 seconds

window.onload = function () {
    document.getElementById("playButton").addEventListener("click", startGame);
    document.getElementById("tryAgainButton").addEventListener("click", restrictPlay);
    document.getElementById("claimRewardButton").addEventListener("click", claimReward);
    document.getElementById("copyButton").addEventListener("click", copyRedeemCode);
};

function startGame() {
    if (gamePlayed) {
        alert("You can play this game only once!");
        return;
    }
    document.getElementById("playButton").style.display = "none";
    document.getElementById("tryAgainButton").style.display = "none";
    document.getElementById("board").style.display = "flex";
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`; // Initialize timer display
    startTimer();
    setGame();
}

function restrictPlay() {
    alert("You can play this game only once!");
}

function startTimer() {
    const timerInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(timerInterval);
            return;
        }

        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!gameOver) {
                gameOver = true;
                document.getElementById("score").innerText = `GAME OVER: ${score}`;
                alert("Time's up! Game Over.");
                endGame();
            }
        }
    }, 1000);
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = "./assests/spider.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = "./assests/venom.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 50;
        document.getElementById("score").innerText = score.toString();
        if (score >= 1000) {
            gameOver = true;
            gamePlayed = true; // Mark the game as played
            document.getElementById("score").innerText = `You win! Score: ${score}`;
            document.getElementById("timer").innerText = "Congratulations! You win!";
            endGame();
        }
    } else if (this == currPlantTile) {
        gameOver = true;
        gamePlayed = true; // Mark the game as played
        document.getElementById("score").innerText = `GAME OVER: ${score}`;
        document.getElementById("timer").innerText = "You touched venom! Game Over.";
        endGame();
    }
}

function endGame() {
    if (score >= 1000) {
        document.getElementById("claimRewardButton").style.display = "block"; // Show Claim Reward button
    } else {
        document.getElementById("tryAgainButton").style.display = "block"; // Show Try Again button
    }
    document.getElementById("board").style.display = "none"; // Hide the board
}
function claimReward() {
    document.getElementById("redeemSection").style.display = "block"; // Show redeem section
}


function copyRedeemCode() {
    const redeemCode = document.getElementById("redeemCode").textContent;
    navigator.clipboard.writeText(redeemCode).then(() => {
        alert("Redeem code copied to clipboard!");
    }).catch((err) => {
        console.error("Failed to copy text: ", err);
    });
}
