// import multer from "multer";

// const storage = multer.memoryStorage();

// export const singleUpload = multer({storage}).single("file");

// import multer from "multer";

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// app.post("/api/users/profile/update", upload.single("resume"), updateProfile);


import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory as buffers

const singleUpload = multer({ storage }).single("resume"); // Changed from "file" to "resume" to match frontend

export { singleUpload };
