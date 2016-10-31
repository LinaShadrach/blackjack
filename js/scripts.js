// var deck = [];

var userCards = [];
var compCards = [];
var userScore;
var compScore;
var score = 0;
var deck = [];
var player1;
var player2;
function Player(name,cards,score,results){
  this.name=name;
  this.cards=cards;
  this.currentScore=score;
  this.results=results;
}

Player.prototype={
  constructor: Player,
  addCard: function(card){
    this.cards.push(card);},
  updateScore: function(score){
    this.currentScore=score;},
  updateResults: function(result){
    this.results.push(result)}
}

// creates the deck object
var newGame = function(){}
var buildDeck = function(){
  var ranks = ["ace","two","three","four","five","six","seven","eight","nine","ten","jack","queen","king"];
  var suits = ["hearts", "clubs", "spades", "diamonds"];

  function Card(suit, rank, val) {
    this.suit = suit;
    this.rank = rank;
    this.val = val;
  };

  suits.forEach(function(suit){
    ranks.forEach(function(rank,idx){
      if(idx<10){
        deck.push(new Card(suit,rank,idx+1));
      }
      else{
        deck.push(new Card(suit,rank,10));
      }
    });
  });
  return deck;
};

var getCard = function(deck){
  var position = Math.round(Math.random() * (deck.length-1));
  var card = (deck[position]);
  deck.splice(position, 1);
  return card;
};

var calculate = function(cards){
  score = 0;
  cards.forEach(function(card){
    score += card.val;
  });
  return score;
};

var checkAce = function(cards, player){
  cards.forEach(function(card){
    if(player.currentScore<12){
      if(card.rank==="ace"){
        card.val=11;
      };
    }
  player.updateScore(calculate(player.cards));
  });
  cards.forEach(function(card){
    if(player.currentScore>21){
      if(card.rank==="ace"){
        card.val=1;
      };
    };
  });
};


var compare = function(user, computer){
  if (user > computer) {
    return "userWins";
  } else if (computer > user) {
    return "compWins";
  } else {
    return "tie";
  }
};

var initPlayers = function(name1,name2){
  player1= new Player(name1, [getCard(deck),getCard(deck)],0,[]);
  player2= new Player(name2, [getCard(deck), getCard(deck)],0,[]);
}



compScore = calculate(compCards);
compare(userScore, compScore);



$(document).ready(function(){


  $("button#start").click(function(event){
    $(".tie").hide();
    $("#winner").hide();
    $(".userScore").empty();
    $(".compScore").empty();
    $("ul#userCards").empty();
    $("ul#compCards").empty();
    $("#hit").attr("disabled",false);
    $("#start").attr("disabled",true);
    $("#show").attr("disabled",false);
    inputName1=("Lina");
    inputName2=("Diego");
    deck = buildDeck();
    initPlayers(inputName1, inputName2);
    player1.updateScore(calculate(player1.cards));
    player2.updateScore(calculate(player2.cards));
    checkAce(player1.cards, player1);
    checkAce(player2.cards, player2);

    player1.updateScore(calculate(player1.cards));
    player2.updateScore(calculate(player2.cards));

    $("#userCards").append("<li>The " + player1.cards[0].rank + " of " + player1.cards[0].suit +"</li><li>  the " + player1.cards[1].rank + " of " + player1.cards[1].suit+"</li>");
    $("#compCards").append("<li>The " + player2.cards[0].rank + " of " + player2.cards[0].suit + "</li>");
    $(".userScore").text(player1.currentScore);
    $(".compScore").text(player2.cards[0].val);


  event.preventDefault();
  });
  $("button#hit").click(function(event){
    $(".tie").hide();
    $("#winner").hide();
    player1.addCard(getCard(deck));
    player1.updateScore(calculate(player1.cards));
    $("#userCards").append("<li>The " + player1.cards[player1.cards.length-1].rank + " of " + player1.cards[player1.cards.length-1].suit +"</li>");
    $(".userScore").text(player1.currentScore);
    if (player1.currentScore >21 ){
        $(".winner").text("Computer wins!");
        $("#winner").show();
    }
    event.preventDefault();
  });

  $("button#show").click(function(event){
    $(".tie").hide();
    $("#winner").hide();
    $("#hit").attr("disabled",true);
    $("#start").attr("disabled",false);
    $("#show").attr("disabled",true);
    $("#compCards").append("<li> the " + player2.cards[1].rank + " of " + player2.cards[1].suit+"</li>");
    $(".compScore").text(player2.currentScore);
    if (player1.currentScore <=21 || player2.currentScore <=21){
      if(compare(player1.currentScore, player2.currentScore) === "userWins"){
        $(".winner").text("You win!");
        $("#winner").show();
      }
      else if (compare(player1.currentScore, player2.currentScore) === "compWins") {
        $(".winner").text("Computer wins.");
        $("#winner").show();
      }
      else {
        $(".tie").text("it's a tie!");
        $(".tie").show();

      }
    };
    event.preventDefault();
  });
});
