const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set('view engine', 'ejs')

let expenses = []
let expense = ""
let places = []
let place = ""
let times = []
let time = ""

let date = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
})


app.get("/", (req, res) => {
    res.render("list", {currDate: date, kharcha: expenses, jagah : places, currTimes: times})
})

app.post("/", (req, res) => {
    expense = req.body.kharcha
    expenses.push(expense)
    place = req.body.jagah
    places.push(place)
    time = new Date().toLocaleTimeString()
    times.push(time)
    res.redirect("/")
})

app.listen(1234, () => {
    console.log("Server running on port http://localhost:1234")
})