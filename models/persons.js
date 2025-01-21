const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const numValidator = (number) => {
  const digits = number.split('-')
  if( digits.length !== 2 || !/^\d+$/.test(digits[0])  || !/^\d+$/.test(digits[1]) )
    return false
  else
    return true
}
const numCodeValidator = (number) => {
  const digits = number.split('-')
  if (digits[0].length > 3 || digits[0].length < 2)
    return false
  else
    return true
}
const validateMany = [
  { validator: numValidator, msg: 'Number should only be comprised of digits and one hyphen(-) to separate them' }
  ,{ validator: numCodeValidator, msg: 'Incorrect syntax, first part should have 2 or 3 numbers' }
]

const contactSchema = new mongoose.Schema({
  name:{
    type: String,
    minLength: [3, 'Name must be at least 3 characters long'],
    required: [true, 'Contact name is required']
  },
  number: {
    type: String,
    minLength: [8, 'Numbers minimum length is 8'],
    validate: validateMany,
    required: [true, 'Contact number is required']
  }
})
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', contactSchema)
