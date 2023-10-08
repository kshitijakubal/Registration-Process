const bcrypt = require('bcrypt');


const encryptDecryptData =  async (plainText, type, encryptedData=null) => {
    // console.log(plainText)
      if ( type === "hash") {
        const salt = await bcrypt.genSalt(10)
        const result = await bcrypt.hash(plainText, salt);
        // console.log(result)
        return result;
      }
      if ( type === "compare") {
        const result = bcrypt.compare(plainText, encryptedData)
        return result;
      }
}

module.exports = { encryptDecryptData }