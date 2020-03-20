const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://fullstacku:${password}@hhcluster-yslhn.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`
  

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  
})

const Person = mongoose.model('Person', noteSchema)



if (process.argv[3] === undefined && process.argv[4] === undefined ){
    Person.find({}).then(result => {
        console.log('Puhelinluettelo:');
        result.forEach(person => {
          console.log(person.name +" "+ person.number)
        })
        mongoose.connection.close()
      })

}
else{
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
       })
    
    person.save().then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })}

