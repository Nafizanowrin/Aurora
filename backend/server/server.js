require('dotenv').config();
const express = require ("express");
const cors = require('cors')
const app = express();
// const router = require ("./router/auth-router")
const authRouter = require ("./router/auth-router")
const payRouter = require("./router/pay-router")
const connectDB = require("./utils/db")
const errorMiddleware = require("./middlewares/error-middleware")
const blogRouter = require('./router/blogRouter');

const feedbackRouter = require('./router/feedbackRouter');

const appointmentRouter = require('./router/appointmentRouter');

const productRouter = require('./router/productRouter')

app.use(express.static('dist'));

const corsOptions = {
    origin:"http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE" ,
    credentials:true
}


app.use(cors(corsOptions))

app.use(express.json());

// app.use("/api/auth", router);

app.use("/api/auth", authRouter);

app.use("/api/pay",payRouter)

app.use('/api/blogs', blogRouter);

app.use('/api/feedbacks',feedbackRouter  );

app.use('/api/appointment', appointmentRouter );

app.use('/api/product', productRouter)

app.use(errorMiddleware)

const port = 5000;

// app.get("/", (req, res) => {
//     res.status(200).send("Welcome");
// })


connectDB().then(() => {

app.listen(port, () => {
    // console.log(`Server running at ${port}`)
    console.log(`Server is running at http://localhost:${port}`)
})

})
