// Wait for the DOM to be loaded

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".cards");
    let cardsFlipped = 0;
    let firstCard;
    let secondCard;
    let turns = 0;

    cards.forEach(card => card.addEventListener("click", flipCard));

    function flipCard() {
        
        if (cardsFlipped >= 2) return;

        this.classList.add("flip");

        if (this === firstCard) return;

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
                disableCards();
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
});