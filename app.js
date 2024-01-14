require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs")
const URI = process.env.MONGODB_URI

async function main() {
  mongoose.connect(URI);

  const expenseSchema = {
    expense: {
      type: String,
      required: true,
    },
    place: String,
    time: String,
  };

  const Expense = mongoose.model("Expense", expenseSchema);

  let date = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  app.get("/", async (req, res) => {
    const items = await Expense.find()
    if (items.length === 0) {
        const intro = new Expense({
          expense: "Track",
          place: "Expense",
          time: "Your Pocket"
        })
        await intro.save()
        res.redirect("/")
    } else {
        res.render("list", {currDate: date, kharcha: items} );
    }
  });

  app.post("/", (req, res) => {
    const expenseEntered = req.body.kharcha;
    const placeEntered = req.body.jagah;
    const timeEntered = new Date().toLocaleTimeString();
    const ex = new Expense({
      expense: expenseEntered,
      place: placeEntered,
      time: timeEntered,
    })
    ex.save()
    res.redirect("/");
  });

  app.post("/delete", async (req, res) => {
    const checkedItemId = req.body.checkbox;
    await Expense.findByIdAndDelete(checkedItemId)
    res.redirect("/");
  })

}
app.listen(1234, () => {
  console.log("Server running on port http://localhost:1234");
});
main()