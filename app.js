// Joi me-return class
const Joi = require('joi')
const express = require('express')
const app = express()

// agar name di body bisa terbaca
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

// app.get('/api/courses', (req, res) => {
//     res.send([1, 2, 3])
// })

// hanya data tertentu saja yg diambil berdasarkan id / apapun yg kita mau(bebas namanya)
// req.params -> berisi parameter yg kita masukan
// req.params.[nama] -> berisi the actual data
// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id)
// })

// // memberikan lebih dari 1 parameter
// app.get('/api/posts/:year/:month', (req, res) => {
//     // res.send(req.params)

//     // query string ditulis di url setelah tanda tanya
//     // /api/posts/2022/25?sortBy=name
//     res.send(req.query)
// })

// akses ke data menggunakan url parameter
// req.params tipe datanya string
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

app.get('/api/courses', (req, res) => {
    res.send((courses))
})

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id))
    if(!course) res.status(404).send('There is no data with your given ID.')
    res.send(course)
})

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const { error } = validateCourse(req.body) // req.body.error
    if(error) return res.status(400).send(error.details[0].message)
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id))
    if(!course) res.status(404).send('There is no data with your given ID.')

    const { error } = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    course.name = req.body.name
    res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id))
    if(!course) res.status(404).send('There is no data with your given ID.')

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(course, schema)
}


// PORT
// set port terlebih dahulu di terminal
// memudahkan ketika me-hosting web
// set PORT = [no port]
const port = process.env.PORT || 3000

app.listen(port, console.log(`Listening on port ${port}...`))