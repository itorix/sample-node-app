const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config");
const blogRouter = require("./routes/BlogRoutes");

const {
    SECRET_KEY,
} = config;

// setting config
require('reqres-middleware')
.setConfig({
    baseUrl: 'https://stage-api.apiwiz.io/v1/compliance/detect',
    workspace: 'acme-team-gcp-stage',
    contentType: 'application/json',
    secretKey: SECRET_KEY
})
// 

const complianceMiddleware = require('reqres-middleware').middleware();

// using as middleware
app.use(express.json());
app.use(complianceMiddleware);
// 

app.use("/api/blogs", blogRouter);

app.use("/", (req, res) => {
    res.status(200).json({ message: "Hi" });
})
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

const mongoOptions = {
    poolSize: 10,
    keepAlive: true,
    keepAliveInitialDelay: 30000,
    connectTimeoutMS: 30000,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    user: '',
    pass: '',
};

try {
    
    const connection = mongoose.createConnection("mongodb://localhost:27017/myDatabase", mongoOptions);
    connection.on('error', (err) => {
        console.log(`mongodb error ${err.stack}`);
    });

    connection.once('open', () => {
        console.log('mongodb connection established');
    });

    connection.on('close', () => {
        console.log('mongodb connection closed');
    });

} catch (error) {
    console.log('error', error)
}

module.exports = app;
