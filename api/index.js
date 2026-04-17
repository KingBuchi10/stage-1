// import express from "express";
// import cors from "cors";
// import { v7 as uuidv7 } from "uuid";
// import { profiles } from "./db.js";
// import { classifyName } from "./classify.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// // POST /api/profiles
// app.post("/api/profiles", async (req, res) => {
//   try {
//     const { name } = req.body;

//     if (!name) {
//       return res.status(400).json({
//         status: "error",
//         message: "Missing or empty name",
//       });
//     }

//     if (typeof name !== "string") {
//       return res.status(422).json({
//         status: "error",
//         message: "Invalid type",
//       });
//     }

//     const lowerName = name.toLowerCase();

//     // Check existing
//     const existing = profiles.find(
//       (p) => p.name.toLowerCase() === lowerName
//     );

//     if (existing) {
//       return res.status(200).json({
//         status: "success",
//         message: "Profile already exists",
//         data: existing,
//       });
//     }

//     const data = await classifyName(name);

//     const newProfile = {
//       id: uuidv7(),
//       name,
//       ...data,
//       created_at: new Date().toISOString(),
//     };

//     profiles.push(newProfile);

//     res.status(201).json({
//       status: "success",
//       data: newProfile,
//     });
//   } catch (err) {
//     res.status(err.status || 500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// });

// // GET single
// app.get("/api/profiles/:id", (req, res) => {
//   const profile = profiles.find((p) => p.id === req.params.id);

//   if (!profile) {
//     return res.status(404).json({
//       status: "error",
//       message: "Profile not found",
//     });
//   }

//   res.json({
//     status: "success",
//     data: profile,
//   });
// });

// // GET all (filters)
// app.get("/api/profiles", (req, res) => {
//   let result = [...profiles];

//   const { gender, country_id, age_group } = req.query;

//   if (gender) {
//     result = result.filter(
//       (p) => p.gender.toLowerCase() === gender.toLowerCase()
//     );
//   }

//   if (country_id) {
//     result = result.filter(
//       (p) => p.country_id.toLowerCase() === country_id.toLowerCase()
//     );
//   }

//   if (age_group) {
//     result = result.filter(
//       (p) => p.age_group.toLowerCase() === age_group.toLowerCase()
//     );
//   }

//   res.json({
//     status: "success",
//     count: result.length,
//     data: result.map((p) => ({
//       id: p.id,
//       name: p.name,
//       gender: p.gender,
//       age: p.age,
//       age_group: p.age_group,
//       country_id: p.country_id,
//     })),
//   });
// });

// // DELETE
// app.delete("/api/profiles/:id", (req, res) => {
//   const index = profiles.findIndex((p) => p.id === req.params.id);

//   if (index === -1) {
//     return res.status(404).json({
//       status: "error",
//       message: "Profile not found",
//     });
//   }

//   profiles.splice(index, 1);

//   res.status(204).send();
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

export default function handler(req, res) {
  res.status(200).json({
    status: "success",
    message: "Profiles endpoint working 🚀",
  });
}