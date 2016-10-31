var compare = function(user, computer){
  if (user > computer) {
    return "userWins";
  } else if (computer > user) {
    return "compWins";
  } else {
    return "tie";
  }
};

checkAce(userCards);
checkAce(compCards);

userScore = calculate(userCards);
compScore = calculate(compCards);
compare(userScore, compScore);



$(document).ready(function(){
  $("button").click(function(event){
    var deck=buildDeck();

    newGame= new Blackjack(deck,)

    $(".userCard").text("The " + userCards[0].rank + " of " + userCards[0].suit + " and the " + userCards[1].rank + " of " + userCards[1].suit);
    $(".compCard").text("The " + compCards[0].rank + " of " + compCards[0].suit + " and the " + compCards[1].rank + " of " + compCards[1].suit);
    $(".userScore").text(userScore);
    $(".compScore").text(compScore);
    if(compare(userScore, compScore) === "userWins"){
      $(".winner").text("You win!");
      $("#winner").show();
    }
    else if (compare(userScore, compScore) === "compWins") {
      $(".winner").text("Computer wins.");
      $("#winner").show();
    }
    else {
      $(".tie").text("it's a tie!");

    }
event.preventDefault();
  });
});
