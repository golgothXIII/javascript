//--- class Player manages the actions of a player
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

// Class DisplayDice that only manages the display of the dice
class DisplayDice
{

  displayDice(number) {
    this.resetDice()
    switch(number){
      case 1 :
        this.displayFaceOne()
        break
      case 2 :
        this.displayFaceTwo()
        break
      case 3 :
        this.displayFaceThree()
        break
      case 4 :
        this.displayFaceFour()
        break
      case 5 :
        this.displayFaceFive()
        break
      case 6 :
        this.displayFaceSix()
        break
        
    }
  }

  resetDice(){
    document.getElementById("1.1").style.display = "none"
    document.getElementById("1.3").style.display = "none"
    document.getElementById("2.1").style.display = "none"
    document.getElementById("2.2").style.display = "none"
    document.getElementById("2.3").style.display = "none"
    document.getElementById("3.1").style.display = "none"
    document.getElementById("3.3").style.display = "none"
  }
  displayFaceOne(){
    document.getElementById("2.2").style.display = "block"
  }
  displayFaceTwo(){
    document.getElementById("1.1").style.display = "block"
    document.getElementById("3.3").style.display = "block"
  }
  displayFaceBackTwo(){
    document.getElementById("1.3").style.display = "block"
    document.getElementById("3.1").style.display = "block"
  }
  displayFaceThree(){
    this.displayFaceOne()
    this.displayFaceTwo()
  }
  displayFaceFour(){
    this.displayFaceTwo()
    this.displayFaceBackTwo()
  }
  displayFaceFive(){
    this.displayFaceThree()
    this.displayFaceBackTwo()
  }
  displayFaceSix(){
    this.displayFaceFour()
    document.getElementById("2.1").style.display = "block"
    document.getElementById("2.3").style.display = "block"
  }
}
//-------------------------------------------------------------//


//--- Class Party manages the game
class Party
{
  constructor(playerOne, playerTwo){
    this.curentPlayer = 0
    this.players = [ playerOne, playerTwo ]
    this.displayDice = new DisplayDice()
    this.displayDice.resetDice()
    this.isFinish = true
    this.changePlayerMark()
    this.newParty()
  }

  rollDice(){
    if(this.isFinish) return
    const playerNumber = this.curentPlayer
    const player = this.players[playerNumber]
    const result = player.rollDice()
    this.displayDice.displayDice(result)
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
    this.displayInHtml("roundScore" + playerNumber, player.roundScore )
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
    this.changePlayerMark()
  }

  /* Change mark current player */
  changePlayerMark(){
    if (this.curentPlayer === 0) {
      document.getElementById("playerMark0").style.display = ""
      document.getElementById("playerMark1").style.display = "none"
    } else {
      document.getElementById("playerMark0").style.display = "none"
      document.getElementById("playerMark1").style.display = ""
    }
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
    this.displayDice.resetDice()
    for (var i = 0; i <= 1; i++){
      this.displayInHtml("name" + i,this.players[i].name)
      this.displayInHtml("globalScore" + i,this.players[i].globalScore)
      this.displayInHtml("roundScore" + i,this.players[i].roundScore)
    }
  }
}

party = new Party(new Player("Golgoth"), new Player("Actarus"))
