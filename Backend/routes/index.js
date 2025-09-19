const router = require("express").Router();

const authRoute = require("./auth");
const userRoute = require("./user");
const mediaRoute = require("./media");
const friendRequestRoute = require("./friendRequestRoutes");

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
router.use("/media", mediaRoute);
router.use("/friends", friendRequestRoute);

module.exports = router;