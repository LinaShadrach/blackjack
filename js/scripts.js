var compCards = [];
var userCards = [];
var userIndex = [];
var compIndex = [];
var ranks = ["ace","two","three","four","five","six","seven","eight","nine","ten","jack","queen","king"];
var suits = ["hearts", "clubs", "spades", "diamonds"];
var deck = [];
suits.forEach(function(suit){
  ranks.forEach(function(rank){
    deck.push(rank + " of " + suit);
  });
});
var deck2 = deck.slice();
for (var i = 0; i <2; i++){
  var position = Math.round(Math.random() * (deck2.length-1));
  userCards.push(deck2.splice(position, 1).toString());
  position = Math.round(Math.random() * (deck2.length-1));
  compCards.push(deck2.splice(position,1).toString());
}

deck.forEach(function(card){
  userCards.forEach(function(userCard){
    if (card === userCard){
      userIndex.push(deck.indexOf(card));
    }
  });
  compCards.forEach(function(compCard){
    if (card === compCard){
      compIndex.push(deck.indexOf(card));
    }
  });
});

var sum = function(rank1, rank2){
   return rank1 + rank2;
};

var toRank = function(array){
  rank1 = ((array[0]) % 13) +1;
  if (rank1>10){
    rank1 = 10;
  }
  rank2 = ((array[1]) % 13) +1;
  if (rank2>10){
    rank2 = 10;
  }
  var total = sum(rank1, rank2);
  if(total > 12){
    if(rank1 === 11){
      rank1 = 1;
    }
    else if(rank2 === 11){
      rank2 = 1;
    }
    total = sum(rank1, rank2);
  }
  if(total < 12){
    if(rank1 === 1){
      rank1 = 11;
    }
    else if(rank2 === 1){
      rank2 = 11;
    }
    total = sum(rank1, rank2);
  }
  return total;
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

var userTotal = toRank(userIndex);
var compTotal = toRank(compIndex);
compare(userTotal, compTotal);


$(document).ready(function(){
  $("button").click(function(event){
    $(".userCard").text(userCards.join(', '));
    $(".compCard").text(compCards.join(', '));
    $(".userScore").text(userTotal);
    $(".compScore").text(compTotal);
    if(compare(userTotal, compTotal) === "userWins"){
      $(".winner").text("You win!");
      $("#winner").show();
    }
    else if (compare(userTotal, compTotal) === "compWins") {
      $(".winner").text("Computer wins.");
      $("#winner").show();
    }
    else {
      $(".tie").text("it's a tie!");

    }
event.preventDefault();
  });
});
