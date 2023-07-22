// Wait for the DOM to be loaded

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".cards");
    let cardsFlipped = 0;
    let firstCard;
    let secondCard;
    let turns = 0;
    let timeLeft = 60;
    let timer = null;
    let matchedCards;

    cards.forEach(card => card.addEventListener("click", flipCard));

    function flipCard() {
        
        if (cardsFlipped >= 2) return;

        this.classList.add("flip");

        if (this === firstCard) return;

        if (cardsFlipped === 0 && turns === 0){
            startTimer();
        }

        if (cardsFlipped === 0) {
            firstCard = this;
            cardsFlipped++;
            return;
        } else {
            secondCard = this;
            cardsFlipped++;

            checkForMatch();
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
            cardsFlipped = 0;
            countTurns();
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
                
                resetBoard();
            }, 1200);
        }

        // Function to reset the board

        function resetBoard() {
           [firstCard, secondCard] = [null, null];
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
            [cardsFlipped, turns] = [0, 0];
            const turnsCounter = document.getElementById("turns");
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

        function countdownTimer() {
            
                timeLeft--;
                updateTimerDisplay();
            if (timeLeft <= 0) {
                endGame();
            }
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
            }, 1000)
        }

        /* Functions to reset the timer */

        function resetTimer() {
            clearInterval(timer);
            timeLeft = 60;
            updateTimerDisplay();
        }

        // Function for the end of the game

        function endGame() {
            clearInterval(timer);
        }

        /* Create an overlay */

        function showOverlay(message) {
            const overlay = document.getElementById("overlay");
            const overlayMessage = document.getElementById("overlay-message");
            const overlayTurns = document.getElementById("overlay-turns");

            overlayMessage.textContent = message;
            overlayTurns.textContent = `Turns: ${turns}`;

            overlay.classList.remove("hidden");

            
        }

        function hideOverlay() {
            const overlay = document.getElementById("overlay");
            overlay.classList.add("hidden");
          }

        /* Functions for the end of the game ( win and lose) */

        function endGameWin() {
            showOverlay("Congratulations!\n You matched all the cards!");
            resetTimer();
        }

        function endGameLoss() {
            showOverlay("Oh no!\n You ran out of time!");
            resetTimer();
        }

        // Function to check if all cardss are matched */

        function checkGameWin(){
            if( matchedCards === cards.length/2) {
                endGameWin();
            }
        }

        /* How to play overlay */

        const openOverlayButton = document.querySelectorAll("[data-overlay-target]");
        const closeOverlayButton = document.querySelectorAll("[data-overlay-close]");
        
        openOverlayButton.forEach(button => {
            button.addEventListener("click", () => {
                const overlay = document.querySelector(button.dataset.overlayTarget);
                openOverlay(overlay);
            })
        })

        closeOverlayButton.forEach(button => {
            button.addEventListener("click", () => {
                const overlay = button.closest(".play-overlay");
                closeOverlay(overlay);
            })
        })

        function openOverlay(overlay){
            if(overlay == null) return;
            overlay.classList.add("active");
        }

        function closeOverlay(overlay){
            if(overlay == null) return;
            overlay.classList.remove("active");
        }

});