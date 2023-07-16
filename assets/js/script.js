// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".cards");
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard;
    let secondCard;
    let turns = 0;

    cards.forEach(card => card.addEventListener("click", flipCard));

    function flipCard() {
        if (this === firstCard) return;
        if (lockBoard) return;

        this.classList.add("flip");


        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
        } else {
            hasFlippedCard = false;
            secondCard = this;

            checkForMatch();
        }
    }

        // Function to check if flipped cards match
        function checkForMatch() {
            if(firstCard.dataset.geometricForm === secondCard.dataset.geometricForm) {
                disableCards();
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

        /* function unflipCards() {
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
                resetBoard();
            }, 1200);
        } */

        function unflipCards() {
            lockBoard = true;
          
            // Unflip the cards immediately
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
          
            // Reset the board after unflipping the cards
            resetBoard();
          }
    
        // Function to reset the board

        function resetBoard() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }


})