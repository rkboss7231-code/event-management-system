const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let db;
let users;

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();

        db = client.db("eventify");
        users = db.collection("users");

        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
    }
}

connectDB();


// Home
app.get("/", (req, res) => {
    res.send("Eventify Server is Running");
});


// Get all users
app.get("/users", async (req, res) => {
    try {
        const result = await users.find().toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


// Register user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login request:", email);

        const user = await users.findOne({
            email: email,
            password: password
        });

        if (!user) {
            console.log("User not found");

            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        console.log("Login successful:", user.name);

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log("Login error:", error);

        res.status(500).json({
            error: error.message
        });
    }
});



// Start server
app.listen(3000, () => {
    console.log("🚀 Eventify server running on port 3000");
});