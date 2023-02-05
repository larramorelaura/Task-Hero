const express= require ("express");
const app= express();
const port=8000;
const cors=require("cors");
const jwt = require("jsonwebtoken");
const bodyParser= require("body-parser");
const {User}= require("./models/user.model")
const {ChildAccount}= require("./models/child.model")
const cookieParser = require('cookie-parser');

require('dotenv').config();

require("./config/mongoose.config");


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Change the app.use(cors()) to the one below
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));


//using the access token for rbac
app.use(async (req, res, next) => {
    if (req.headers["x-access-token"] && !(req.headers["child"])) {
        const accessToken = req.headers["x-access-token"];
        // console.log(accessToken)
        const { userId,  exp } = await jwt.verify(accessToken, process.env.SECRET_KEY);
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) { 
        return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
        } 
        // console.log(userId)
        res.locals.loggedInUser = await User.findById(userId); next();  
        
        } else if(req.headers["x-access-token"] && req.headers["child"]){
            const accessToken = req.headers["x-access-token"];
        // console.log(accessToken)
        const { childId,  exp } = await jwt.verify(accessToken, process.env.SECOND_SECRET_KEY);
        // Check if token has expired
        if (exp < Date.now().valueOf() / 1000) { 
        return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
        } 
        // console.log(userId)
        res.locals.loggedInUser = await ChildAccount.findById(childId); next();
        }
        
        else{
            next(); 
            }
    });

require("./routes/user.routes")(app);
require("./routes/child.routes")(app);
require("./routes/chore.routes")(app);
require("./routes/reward.routes")(app);
require("./routes/message.routes")(app);


const server= app.listen(port, ()=>console.log(`Listening on port: ${port}`));

const io = require('socket.io')(server, { cors: true });

io.on("connection", socket=>{
    console.log(socket.id);
    socket.on("event", data=>{
        socket.broadcast.emit("send to others", data)
    })
    socket.on("chore awaiting approval", data=>{
        console.log("chore is done" + data)
        io.emit("chore completed", data)
    })
    socket.on("reward chosen", data=>{
        console.log("reward is awaiting approval" + data)
        io.emit("reward awaiting approval", data)
    })

    socket.on("reward approval", data=>{
        console.log("reward is approved" + data)
        io.emit("reward approved", data)
    })
    socket.on("chore approved", data=>{
        console.log("chore approved" + data)
        io.emit("update approved chores", data)
    })
    socket.on("chore added", data=>{
        console.log("chore added" + data)
        io.emit("update added chores", data)
    })
    socket.on("reward added", data=>{
        console.log("reward added" + data)
        io.emit("update added reward", data)
    })
    socket.on("try again", data=>{
        console.log("try again" + data)
        io.emit("back in queue", data)
    })
    socket.on("new message", data=>{
        console.log("new message" + data)
        io.emit("incoming message", data)
    })
})