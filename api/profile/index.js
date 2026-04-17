import { v7 as uuidv7 } from "uuid";
import { profiles } from "../../db.js";
import { classifyName } from "../../classify.js";

export default async function handler(req, res) {
  // ✅ CORS (required)
  res.setHeader("Access-Control-Allow-Origin", "*");

  // ✅ Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // =========================
    // POST → Create Profile
    // =========================
    if (req.method === "POST") {
      const { name } = req.body || {};

      if (!name) {
        return res.status(400).json({
          status: "error",
          message: "Missing or empty name",
        });
      }

      if (typeof name !== "string") {
        return res.status(422).json({
          status: "error",
          message: "Invalid type",
        });
      }

      const existing = profiles.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );

      if (existing) {
        return res.status(200).json({
          status: "success",
          message: "Profile already exists",
          data: existing,
        });
      }

      const data = await classifyName(name);

      const newProfile = {
        id: uuidv7(),
        name,
        ...data,
        created_at: new Date().toISOString(),
      };

      profiles.push(newProfile);

      return res.status(201).json({
        status: "success",
        data: newProfile,
      });
    }

    // =========================
    // GET → All Profiles
    // =========================
    if (req.method === "GET") {
      let result = [...profiles];

      const { gender, country_id, age_group } = req.query;

      if (gender) {
        result = result.filter(
          (p) => p.gender.toLowerCase() === gender.toLowerCase()
        );
      }

      if (country_id) {
        result = result.filter(
          (p) =>
            p.country_id.toLowerCase() === country_id.toLowerCase()
        );
      }

      if (age_group) {
        result = result.filter(
          (p) =>
            p.age_group.toLowerCase() === age_group.toLowerCase()
        );
      }

      return res.status(200).json({
        status: "success",
        count: result.length,
        data: result.map((p) => ({
          id: p.id,
          name: p.name,
          gender: p.gender,
          age: p.age,
          age_group: p.age_group,
          country_id: p.country_id,
        })),
      });
    }

    // =========================
    // METHOD NOT ALLOWED
    // =========================
    return res.status(405).json({
      status: "error",
      message: "Method not allowed",
    });

  } catch (err) {
    return res.status(err.status || 500).json({
      status: "error",
      message: err.message,
    });
  }
}