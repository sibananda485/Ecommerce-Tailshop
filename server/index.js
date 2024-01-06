require("dotenv").config()
const express = require("express");
const path = require('path');
const dbConnection = require("./dbConnect");
const cookieParser = require("cookie-parser");
const validator = require("./controllers/Validator");
const productRouter = require("./routers/Products");
const categoryRouter = require("./routers/Category");
const brandRouter = require("./routers/Brand");
const userRouter = require("./routers/User");
const authRouter = require("./routers/Auth");
const cartRouter = require("./routers/Cart");
const orderRouter = require("./routers/Order");
const cors = require("cors");
const app = express();
dbConnection();

// middlewares
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ exposedHeaders: ["X-Total-Count"] }));


// Routers

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/brands", brandRouter);
app.use("/api/user", validator, userRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", validator, cartRouter);
app.use("/api/orders", validator, orderRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



// test req
app.get("/", (req, res) => {
  res.send("Hii from server");
});

app.listen(process.env.PORT, () => {
  console.log("server started in port 8000");
});
