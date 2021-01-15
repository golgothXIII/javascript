class Player
{
  constructor(name){
    this.name = name
    this.reset()
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
    this.globalScore += this.roundScore
    this.roundScore = 0
  }

  // return if player win 
  isWinner(){
    return this.globalScore >= 100
  }

  reset(){
    this.globalScore = 0
    this.roundScore = 0
  }

}

class Party
{
  constructor(playerOne, playerTwo){
    this.players = [ playerOne, playerTwo ]
    for (var i = 0; i <= 1; i++){
      this.displayInHtml("name" + i,this.players[i].name)
      this.displayInHtml("globalScore" + i,this.players[i].globalScore)
      this.displayInHtml("roundScore" + i,this.players[i].roundScore)
    }
    this.isFinish = false
    this.curentPlayer = 0
  }

  rollDice(){
    if(this.isFinish) return
    const playerNumber = this.curentPlayer
    const player = this.players[playerNumber]
    const result = player.rollDice()
    this.displayInHtml("resultOfDice", result)
    this.displayInHtml("roundScore" + playerNumber, player.roundScore )
    if (result === 1){
      player.finishRound()
      this.nextPlayer()
    }
  }

  finishRound(){
    if (this.isFinish) {
      return
    }
    const playerNumber = this.curentPlayer
    const player = this.players[playerNumber]
    player.finishRound()
    document.getElementById("globalScore" + playerNumber).innerText = player.globalScore
    if(player.isWinner()) {
      alert(player.name + " a gagné")
      this.isFinish = true
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
    if (!this.isFinish) {
      this.isFinish = false
      alert('The game is not over ')
      return
    }
    this.isFinish = false
    this.players[0].reset()
    this.players[1].reset()

  }
}

partyOfDice = new Party(
  new Player("Golgoth"),
  new Player("Actarus")
)