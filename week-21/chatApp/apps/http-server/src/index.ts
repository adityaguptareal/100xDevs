import express from "express"
const app = express()
const port = 300;

app.get("/", (req, res) => {
    
    res.send("Hello world")
})
app.get("/signup", (req, res) => {
    res.send("Hello world")
})
app.get("/signin", (req, res) => {
    res.send("Hello world")
})
app.get("/chat", (req, res) => {
    res.send("Hello world")
})

app.listen(port, () => {
    console.log("App is running at port", port)
})
