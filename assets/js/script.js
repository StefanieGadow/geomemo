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

    /**
     * Adds eventListeners to all cards.
     */
    cards.forEach(card => card.addEventListener("click", flipCard));

    /**
     * Flips the clicked card.
     * Starts the timer on the first turn.
     */
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
    
    /**
    * Check if the flipped cards match based on their dataset attribute.
    */
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

    /**
     * Disable the matched cards by removing the click event listeners.
     */
    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
    }

    /**
     * Unflip the unmatched cards after a short delay to display the card's back side.
    */
    function unflipCards() {
            
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            resetBoard();
        }, 1200);
    }

    /**
     * Resets the firstCard and secondCard variables to null and unlocks the board.
     */
    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    /**
     * Count the number of turns and update the turns counter on the page.
     */
    function countTurns() {
        turns++;

        const turnsCounter = document.getElementById("turns");
        turnsCounter.textContent = `Turns: ${turns}`;
    }

    /**
     * Shuffle the cards by randomly assigning order to each card.
     */
    function shuffleCards() {
        cards.forEach(card => {
            let randomPosition = Math.floor(Math.random() * cards.length);
            card.style.order = randomPosition;
        });
    }

    /**
     * Restart the game by removing the "flip" class from cards,
     * re-adding click event listeners, resetting turns, and shuffling the cards.
     */
    function restartGame() {
        cards.forEach(card => {
            card.classList.remove("flip");
            card.removeEventListener("click", flipCard); 
        });

        turns = 0;
        const turnsCounter = document.getElementById("turns");
        matchedCards = 0;
        turnsCounter.textContent = `Turns: 0`;
        resetTimer();

        setTimeout(() => {
            shuffleCards();
            resetBoard();
            cards.forEach(card => {
                card.addEventListener("click", flipCard); 
            });
        }, 500);
    }
    
    // Add an eventListener to the restart button
    const restartButton = document.getElementById("restart");
    restartButton.addEventListener("click", restartGame);

    // Shuffle cards on page load
    shuffleCards();

    // Create the timer
    const timerDisplay = document.getElementById("timer");

    function updateTimerDisplay() {
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
    }

    /**
     * Start the timer that counts down from 60 seconds.
     * Updates the timer display every second.
     * If the time runs out, trigger the endGameLoss function.
     */
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

    /**
     * Reset the timer to its initial state (60 seconds) and update the display.
     */
    function resetTimer() {
        clearInterval(timer);
        timeLeft = 60;
        updateTimerDisplay();
    }

    /**
     * Handle the win condition of the game by displaying a congratulations message
     * and showing the game overlay with the result and number of turns taken.
     */
    function endGameWin() {
        const gameHeading = document.getElementById("game-heading");
        const gameParagraph = document.getElementById("game-paragraph");
            
        gameHeading.textContent = "Congratulations!";
        gameParagraph.textContent = `You matched all the cards!\n It took you ${turns} turns.`;
        const endGameOverlay = document.getElementById("game-overlay");
        openOverlay(endGameOverlay);
        resetTimer();
    }

    /**
     * Handle the loss condition of the game when time runs out.
     * Display a message indicating the player ran out of time and show the game overlay.
     */
    function endGameLoss() {
        const gameHeading = document.getElementById("game-heading");
        const gameParagraph = document.getElementById("game-paragraph");

        gameHeading.textContent = "Oh no!";
        gameParagraph.textContent = "You ran out of time.";
        const endGameOverlay = document.getElementById("game-overlay");
        openOverlay(endGameOverlay);
        resetTimer();
    }

    /**
     * Check if all cards are matched. If so, trigger the endGameWin function
     */
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