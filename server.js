const express = require("express")
const bookRouter = require("./routes/bookRouter")
const reviewRouter = require("./routes/reviewRouter")


const app = express()
const port = 3000

app.use(express.json())

app.use("/", bookRouter)
app.use("/", reviewRouter)

app.listen(port, ()=>{
    console.log(`Server is listening on port: ${port}`)
})