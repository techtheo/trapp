const express = require("express"); // web framework for Node.js.
const morgan = require("morgan"); // HTTP request logger middleware for node.js

const routes = require("./routes/index");

const rateLimit = require("express-rate-limit"); // Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
const helmet = require("helmet"); // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!


// const mongosanitize = require("express-mongo-sanitize"); // Temporarily disabled due to Express v5 compatibility issue



// const xss = require("xss-clean"); // Temporarily disabled due to Express v5 compatibility issue

// const bodyParser = require("body-parser"); // Not needed in Express v5 - using built-in parsing

const cors = require("cors"); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const cookieParser = require("cookie-parser"); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
const session = require("cookie-session"); // Simple cookie-based session middleware.



const app = express();

app.use(
  cors({
    origin: "*",

    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],

    credentials: true, //

    //   Access-Control-Allow-Credentials is a header that, when set to true , tells browsers to expose the response to the frontend JavaScript code. The credentials consist of cookies, authorization headers, and TLS client certificates.
  })
);

app.use(cookieParser());

// Setup express response and body parser configurations
app.use(express.json({ limit: "10kb" })); // Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'.
app.use(express.urlencoded({ extended: true })); // Built-in Express v5 body parsing

app.use(
  session({
    secret: "keyboard cat",
    proxy: true,
    resave: true,
    saveUnintialized: true,
    cookie: {
      secure: false,
    },
  })
);

// app.use(helmet()); // Temporarily disabled for debugging

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000, // In one hour
  message: "Too many Requests from this IP, please try again in an hour!",
});

app.use("/trapp", limiter);

// app.use(mongosanitize()); // Temporarily disabled due to Express v5 compatibility issue

// app.use(xss()); // Temporarily disabled due to Express v5 compatibility issue

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// Root route for testing
app.get("/", (req, res) => {
  res.json({ 
    status: "success", 
    message: "Trapp Backend Server is running!", 
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 8000
  });
});

app.use("/api/v1", routes);

module.exports = app;