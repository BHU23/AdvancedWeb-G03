const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const config = require("./config");
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200"); // อนุญาตให้เข้าถึงจากโดเมนนี้
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	// ถ้าเป็น OPTIONS request ให้ส่งกลับ 204 No Content
	if (req.method === "OPTIONS") {
		return res.sendStatus(204);
	}

	next();
});

app.use(
	cors({
		origin: "http://localhost:4200",
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/auth", authRoutes);

app.use("/api", authMiddleware, apiRoutes);

// Connect to MongoDB
mongoose
	.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB successfully");
	})
	.catch((err) => {
		console.error("Failed to connect to MongoDB:", err);
	});

const PORT = config.port || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;
