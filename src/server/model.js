import db from './db.js'
const userDatabase = require('./userdatabase.js')
const mongoose = require('mongoose');

const model = {

  getChickens: async () => {
    return 'chickens'
  },
  getGameState: async (gameID) => {
    try {
      const gameState = await db.GameState.findOne({gameId: gameID})
      return gameState
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  createGame: async ({users, phase}) => {
    console.log('creating game...')
    try {
      const gameId = new mongoose.Types.ObjectId()
      const gameState = new db.GameState({
        gameId: gameId,
        users: users,
        phase: phase
      })
      await gameState.save()
      return gameState
    } catch (error) {
      console.error(error)
      throw error
      console.error('SERVER ERROR: ', error.response.data.error)
    }
  },
  createLobby: async (gameID, user) => {
    const userFile = await userDatabase.Users.find({username: user})[0]
    let newLobby = new db.Lobby({
      username: userFile.username,
      role: "in lobby"
    })
    return newLobby.save()
  },
  updateLobby: async (gameID, user) => {
    const lobbyOccupants = await db.Lobby.find({
      gameID: gameID
    })[0][users]
    const userFile = await userDatabase.Users.find({username: user})[0]
    lobbyOccupants.push({
      username: userfile.username,
      rank: 1,
      role: "in lobby"
    })
    return db.Lobby.findOneAndUpdate({ gameID: gameID }, { users: lobbyOccupants }, { new: true })
  },
  getMessages: (gameID) => {
    return db.Message.find({ gameID: gameID })
  },
  postMessage: async (gameID, message) => {
    let newMessage = new db.Message({
      gameID: gameID,
      user: message.user,
      body: message.body,
      visibleTo: message.visibleTo
    })
    await newMessage.save()
    return db.Message.find({ gameID: gameID })
  },
  voteForUser: async ({ userID, count }, gameID) => {

  },
  toggleDead: async ({ userID }, gameID) => {

  },
  grantPermissions: async ({ userID, permissions }, gameID) => {

  },
  advanceGame: async (gameID) => {

  }
}

export default model