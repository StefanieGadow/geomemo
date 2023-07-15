// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".cards");
    let hasFlippedCard = false;
    let firstCard;
    let secondCard;
    let turns = 0;

    cards.forEach(card => card.addEventListener("click", flipCard));

    function flipCard() {
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
            if(firstCard.firstChild.alt === secondCard.firstChild.alt) {
                disableCards();
            } else {
                unflipCards();
            }
        }

        // Function to disable matched cards
        function disableCards() {
            firstCard.removeEventListener("click", flipCard);
            secondCard.removeEventListener("click", flipCard);
        }

        // Function to unflip unmatched cards

        function unflipCards() {
            setTimeout(() => {
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
            }, 1200);
        }
    



})