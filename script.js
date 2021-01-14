class Player
{
  constructor(name){
    this.name = name
    this.globalScore = 0
    this.roundScore = 0
    this.endRound = false

  }

  // Roll dice and return result. if gets 1 
  rollDice(){
    const roll = Math.floor(Math.random() * 6 ) + 1
    if ( roll === 1) {
      this.roundScore = 0
    } else {
      this.roundScore += roll
    }
    return roll
  }

  // call when player hold score or if gets 1
  finishRound(){
    this.endRound = true
    this.globalScore += this.roundScore
    this.roundScore = 0
  }

  // return if player win 
  isWinner(){
    return this.globalScore >= 100
  }


}

class Party
{
  constructor(playerOne, playerTwo){
    this.players = [ playerOne, playerTwo ]
    this.curentPlayer = 0;
    this.isFinish = false
    this.displayInHtml("player0", playerOne.name)
    this.displayInHtml("player1", playerTwo.name)
  }

  rollDice(){
    if(this.isFinish) return
    const playerNumber = this.curentPlayer
    const player = this.players[playerNumber]
    const result = player.rollDice()
    this.displayInHtml("resultOfDice", result)
    document.getElementById("roundScorePlayer" + playerNumber).innerText = player.roundScore

    if (result === 1){
      player.finishRound()
      this.nextPlayer()
    }
  }

  finishRound(){
    const playerNumber = this.curentPlayer
    const player = this.players[playerNumber]
    player.finishRound()
    document.getElementById("globalScorePlayer" + playerNumber).innerText = player.globalScore
    if(player.isWinner()) {
      alert(player.name + " a gagné")
    }
    this.nextPlayer()

  }

  displayInHtml(id, value){
    document.getElementById(id).innerText = value
  }

  nextPlayer(){
    this.curentPlayer = ( this.curentPlayer + 1 ) % 2
  }

  newParty(){
    if (this.isFinish) {
      this.isFinish = false

    }
  }
}

playerOne = new Player("Golgoth")
playerTwo = new Player("Actarus")

partyOfDice = new Party(playerOne, playerTwo)