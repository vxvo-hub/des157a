(function () {
    "use strict";
    console.log("reading js");

    const startScreen = document.querySelector("#startscreen");
    const betScreen = document.querySelector("#bet");
    const gameScreen = document.querySelector("#game");

    const startBtn = document.querySelector("#start");
    const betButtons = document.querySelectorAll("#betoptions button");
    const placeBetBtn = document.querySelector("#betbutton");
    const clearBtn = document.querySelector("#clearbutton");
    const tutorialBtn = document.querySelector("#tutorialbutton")

    const carrotCountBox = document.querySelector("#carrotcount");
    const playerCardContainer =
        document.querySelectorAll(".player .horizontal")[1];
    const playerHeader = document.querySelectorAll(".player h1")[1];

    const dealerCardContainer =
        document.querySelectorAll(".player .horizontal")[0];
    const dealerHeader = document.querySelectorAll(".player h1")[0];

    const hitBtn = gameScreen.querySelector("button.primary");
    const standBtn = gameScreen.querySelector("button:nth-child(2)");
    const tutorialOK = document.querySelector("#tutorial-ok")
    const allInButton = document.querySelector("#allinbutton")

    const buttonSound = document.querySelector("#buttonsound")
    const cardSound = document.querySelector("#cardsound")
    const chewSound = document.querySelector("#chewsound")

    const game = {
        carrots: 100,
        bet: 0,

        player: {
            cards: [],
            total: 0
        },

        dealer: {
            cards: [],
            total: 0
        }
    };

    function drawCard() {
        return Math.floor(Math.random() * 10) + 1;
    }

    function calculateTotal(cards) {
        let total = 0; 
        for (let i = 0; i < cards.length; i++) {
            total += cards[i]; 
        }
        return total;
    }

    function cardImage(cardValue) {
        return `images/${cardValue}.svg`;
    }

    function showScreen(show, hide1, hide2) {
        show.style.display = "flex";
        hide1.style.display = "none";
        hide2.style.display = "none";
    }

    startBtn.addEventListener("click", function () {
        showScreen(betScreen, startScreen, gameScreen);
        buttonSound.play();
    });

    tutorialBtn.addEventListener("click", function () {
        const tutorial = document.querySelector("#tutorial-modal");
        tutorial.style.display = "flex";
        console.log('tutorial');
    });

    tutorialOK.addEventListener("click", function () {
        const tutorial = document.querySelector("#tutorial-modal");
        tutorial.style.display = 'none';
    });

    allInButton.addEventListener("click", function () {
        game.bet += game.carrots;
        game.carrots = 0;
        updateBetDisplay();
    });

    betButtons.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const add = parseInt(btn.textContent.replace("+", ""), 10);
            if (game.carrots >= add) {
                chewSound.play();
                game.bet += add;
                game.carrots -= add;
                updateBetDisplay();
            }
        });
    });

    clearBtn.addEventListener("click", function(){
        game.carrots += game.bet;
        game.bet = 0;
        updateBetDisplay();
    });

    function updateBetDisplay() {
        betScreen.querySelector("h1").innerHTML = `${game.bet} carrots`;
        betScreen.querySelector("h3 b").innerHTML = game.carrots;
    }

    placeBetBtn.addEventListener("click", function(){
        if (game.bet === 0) return;
        console.log('betbutton');
        startRound();
        showScreen(gameScreen, startScreen, betScreen);
    });


    function startRound() {
        cardSound.play();
        game.player.cards = [];
        game.dealer.cards = [];
        playerCardContainer.innerHTML = "";
        dealerCardContainer.innerHTML = "";

        game.player.cards.push(drawCard(), drawCard());
        game.dealer.cards.push(drawCard(), drawCard());

        game.player.total = calculateTotal(game.player.cards);
        game.dealer.total = calculateTotal(game.dealer.cards);

        updateGameUI();
    }

    function updateGameUI() {
        playerCardContainer.innerHTML = "";
        
        game.player.cards.forEach(card => {
            const img = document.createElement("img");
            img.src = cardImage(card);
            playerCardContainer.appendChild(img);
        });
        playerHeader.innerHTML = `<b>Your cards</b> ${game.player.total}`;

        dealerCardContainer.innerHTML = "";
        for (const card of game.dealer.cards) {
            const img = document.createElement("img");
            img.src = cardImage(card);
            dealerCardContainer.appendChild(img);
        }
        dealerHeader.innerHTML = `<b>Bunny dealer</b> ${game.dealer.total}`;

        carrotCountBox.style.visibility = "visible";
        carrotCountBox.querySelector("h2").innerHTML =
            `Bet: ${game.bet} carrots`;
        carrotCountBox.querySelector("h3").innerHTML =
            `${game.carrots} left`;
    }

    hitBtn.addEventListener("click", function(){
        game.player.cards.push(drawCard());
        game.player.total = calculateTotal(game.player.cards);
        cardSound.play();
        updateGameUI();

        if (game.player.total > 21) {
            endRound("lose");
        }
    });

    standBtn.addEventListener("click", function(){
        dealerTurn();
    });

    function dealerTurn() {
        while (game.dealer.total < 16) {
            game.dealer.cards.push(drawCard());
            game.dealer.total = calculateTotal(game.dealer.cards);
        }
        updateGameUI();

        if (game.dealer.total > 21 || game.player.total > game.dealer.total) {
            endRound("win");
        } else if (game.player.total === game.dealer.total) {
            endRound("push");
        } else {
            endRound("lose");
        }
    }

    function endRound(result) {
        let title = "";
        let message = `Your total: ${game.player.total}<br>Bunny's total: ${game.dealer.total}`;

        if (result === "win") {
            game.carrots += game.bet * 2;
            title = "You win!";
        } else if (result === "push") {
            game.carrots += game.bet;
            title = "Push! (Tie)";
        } else {
            game.carrots -= game.bet;
            if (game.carrots <= 0) {
                title = "You lost all your carrots! Game over.";
            } else {
                title = "You lose!";
            }
        }

        const modal = document.querySelector("#endgame-modal");
        const okBtn = document.querySelector("#endgame-ok");

        document.querySelector("#endgame-title").innerHTML = title;
        document.querySelector("#endgame-message").innerHTML = message;

        modal.style.display = "flex";

        okBtn.onclick = function() {
            buttonSound.play();
            modal.style.display = "none";

            game.bet = 0;
            game.player.cards = [];
            game.dealer.cards = [];
            game.player.total = 0;
            game.dealer.total = 0;
            updateBetDisplay();

            if (game.carrots <= 0) {
                game.carrots = 100; 
                updateBetDisplay();
                showScreen(startScreen, betScreen, gameScreen);
            } else {
                showScreen(betScreen, startScreen, gameScreen);
            } 
        };
    }


})();
