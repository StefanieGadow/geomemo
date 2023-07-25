// Wait for the DOM to be loaded

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".cards");
    let firstCard = null;
    let secondCard;
    let turns = 0;
    let timeLeft = 60;
    let timer = null;
    let matchedCards = 0;
    let lockBoard = false;
   
    cards.forEach(card => card.addEventListener("click", flipCard));

    function flipCard() {
        if (turns === 0){
            startTimer();
        }
        if (lockBoard==false){
            this.classList.add("flip")
            if (firstCard === null) {
                firstCard = this;
                countTurns();
            } else {
                lockBoard = true;
                secondCard = this;
                checkForMatch();
            }
        }
    }
    
        // Function to check if flipped cards match

        function checkForMatch() {
            const checkCards = [firstCard.querySelector(".card-front"), secondCard.querySelector(".card-front")];
            let isMatch = checkCards[0].dataset.geometricform === checkCards[1].dataset.geometricform;
           
            if(isMatch) {
                matchedCards += 1;
                disableCards();
                checkGameWin(); 
            } else {
                unflipCards();
            }
        }

        // Function to disable matched cards

        function disableCards() {
            firstCard.removeEventListener("click", flipCard);
            secondCard.removeEventListener("click", flipCard);
            resetBoard();
        }

        // Function to unflip unmatched cards

        function unflipCards() {
            
            setTimeout(() => {
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
                lockBoard = false;
                resetBoard();
            }, 1200);
        }

        // Function to reset the board

        function resetBoard() {
           [firstCard, secondCard] = [null, null];
           lockBoard = false;
        }

        // Function to count the turns

        function countTurns() {
            turns++;

            const turnsCounter = document.getElementById("turns");
            turnsCounter.textContent = `Turns: ${turns}`;
        }

        // Function to shuffle the cards

        function shuffleCards() {
            cards.forEach(card => {
                let randomPosition = Math.floor(Math.random() * cards.length);
                card.style.order = randomPosition;
            });
        }

        // Function to restart the game

        function restartGame() {
            cards.forEach(card => {
                card.classList.remove("flip");
                card.addEventListener("click", flipCard);
            });
            turns = 0;
            const turnsCounter = document.getElementById("turns");
            matchedCards = 0;
            turnsCounter.textContent = `Turns: 0`;
            shuffleCards();
        }

        // Add event listener on restart button

        const restartButton = document.getElementById("restart");
        restartButton.addEventListener("click", restartGame);

        // Shuffle cards on page load
        shuffleCards();

        // Create the timer

        const timerDisplay = document.getElementById("timer");

        function updateTimerDisplay() {
            timerDisplay.textContent = `Time left: ${timeLeft}s`;
        }

        // Function to start the timer

        function startTimer() {
            updateTimerDisplay();
            timer = setInterval(() => {
                timeLeft--;
                if (timeLeft >= 0) {
                    updateTimerDisplay();
                } else {
                    clearInterval(timer);
                    endGameLoss();
                }
            }, 1000);
        }

        /* Functions to reset the timer */

        function resetTimer() {
            clearInterval(timer);
            timeLeft = 60;
            updateTimerDisplay();
        }

        /* Functions for the end of the game ( win and lose) */

        function endGameWin() {
           
            const gameHeading = document.getElementById("game-heading");
            const gameParagraph = document.getElementById("game-paragraph");
            
            gameHeading.textContent = "Congratulations!";
            gameParagraph.textContent = `You matched all the cards!\n It took you ${turns} turns.`;
            const endGameOverlay = document.getElementById("game-overlay");
            openOverlay(endGameOverlay);
            resetTimer();
        }

        function endGameLoss() {
            const gameHeading = document.getElementById("game-heading");
            const gameParagraph = document.getElementById("game-paragraph");

            gameHeading.textContent = "Oh no!";
            gameParagraph.textContent = "You ran out of time.";
            const endGameOverlay = document.getElementById("game-overlay");
            openOverlay(endGameOverlay);
            resetTimer();
        }

        // Function to check if all cardss are matched */

        function checkGameWin(){
            if( matchedCards === 6) {
                endGameWin();
            }
        }

        /* How to play overlay 
           The overlay was created with the help of this tutorial: https://www.youtube.com/watch?v=MBaw_6cPmAw&list=WL&index=2
        */

        const openOverlayButton = document.querySelectorAll("[data-overlay-target]");
        const closeOverlayButton = document.querySelectorAll("[data-overlay-close]");
        
        openOverlayButton.forEach(button => {
            button.addEventListener("click", () => {
                const overlay = document.querySelector(button.dataset.overlayTarget);
                openOverlay(overlay);
            });
        });

        closeOverlayButton.forEach(button => {
            button.addEventListener("click", () => {
                const overlay = button.closest(".play-overlay");
                closeOverlay(overlay);
            });
        });

        function openOverlay(overlay){
            if(overlay == null) return;
            overlay.classList.add("active");
        }

        function closeOverlay(overlay){
            if(overlay == null) return;
            overlay.classList.remove("active");
        }

    });