const router = require("express").Router();

const authRoute = require("./auth");
const userRoute = require("./user");

// Test route to verify API is working
router.get("/test", (req, res) => {
  res.json({ 
    status: "success", 
    message: "API is working!", 
    timestamp: new Date().toISOString() 
  });
});

router.use("/auth", authRoute);
router.use("/user", userRoute);

module.exports = router;