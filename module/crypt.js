const bcrypt = require('bcrypt')
const saltRaund = 10

async function generateHash(data) {
   const salt = await bcrypt.genSalt(saltRaund)
   const hash = bcrypt.hash(data, salt)
   return hash
}

async function compareHash(data, hash) {
   const isSame = await bcrypt.compare(data, hash)
   return isSame
}

module.exports = {
   generateHash,
   compareHash
}