// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".cards");
    let turns = 0;

    cards.forEach(card => card.addEventListener("click", flipCard));

    function flipCard() {
        this.classList.add("flip");
    }
})