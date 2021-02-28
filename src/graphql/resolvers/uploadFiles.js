const { Upload } = require('../../models')
const { GenerateRandomString } = require("../../helpers/generateRandomeString")

const path = require('path')
const fs = require('fs')

module.exports = {
  Mutation: {
    uploadFile: async (parent, { file }) => {
      const { createReadStream, filename } = await file
      const { ext } = path.parse(filename)
      const randomName = GenerateRandomString(14) + ext
      const stream = createReadStream()
      const pathName = path.join(__dirname, `../../../uploads/images/${randomName}`)
      await stream.pipe(fs.createWriteStream(pathName))

      const images = new Upload({
        url: `/${randomName}`
      })

      return await images.save()
    }
  }
}