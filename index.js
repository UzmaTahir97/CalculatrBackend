// // const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI)
// .then(()=> console.log("MongoDb connect"))
// .catch(err => console.log(err));

// const calcSchema = new mongoose.Schema({
//   expression: String,
//   result: Number
// });

// const Calc = mongoose.model("Calc", calcSchema);

// app.post("/calculator", async (req, res) => {

//   console.log("BODY:", req.body);

//   try {
//     const { expression } = req.body;

//     console.log("EXPRESSION:", expression);

//     if (!expression) {
//       return res.json({ err: "No Expression Received" });
//     }

//     const result = eval(expression);

//     const data = new Calc({ expression, result });
//     await data.save();

//     res.json({ result });

//   } catch (error) {
//     res.json({ err: "Invalid Expression" });
//   }
// });

// app.get("/history", async (req, res) => {
//   const data = await Calc.find();
//   res.json(data);
// });

// app.listen(5000, () =>
//   console.log("Server Running on Port 5000")
// );
const express = require("express");

const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDb connect"))
.catch(err => console.log(err));

const calcSchema = new mongoose.Schema({
  expression: {
    type: String,
    required: true
  },
  result: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Calc = mongoose.model("Calc", calcSchema);

app.post("/calculator", async (req, res) => {

  console.log("BODY:", req.body);

  try {
    const expression = req.body.expression;

if (!expression) {
  return res.json({ err: "No Expression Received" });
}

console.log("EXPRESSION:", expression);

const result = Function("return " + expression)();

const data = new Calc({ expression, result });
await data.save();

res.json({ result });
    //  const expression = req.body.expression;
    // // const { expression } = req.body;

    // console.log("EXPRESSION:", expression);

    // if (!expression) {
    //   return res.json({ err: "No Expression Received" });
    // }

    // const result = eval(expression);

    // const data = new Calc({ expression, result });
    // await data.save();

    // res.json({ result });

  } catch (error) {
     console.log(error);
    res.json({ err: "Invalid Expression" });
  }
});
// app.get("/history", async (req, res) => {
//   const data = await Calc.find();
//   res.json(data);
// });

app.get("/history", async (req, res) => {
  const data = await Calc.find().sort({ createdAt: -1 });
  res.json(data);
});
app.listen(5000, () =>
  console.log("Server Running on Port 5000")
);