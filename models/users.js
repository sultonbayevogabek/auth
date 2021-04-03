const path = require('path')
const fs = require('fs/promises')
const pathToDB = path.join(__dirname, '..', 'data', 'db.json')

class Users {
   static async getAllUsers() {
      const data = await fs.readFile(pathToDB,'utf-8')
      return JSON.parse(data)['users']
   }

   static async getUserById(id) {
      const users = await Users.getAllUsers()
      return  users.find(user => user.id === id)
   }
}