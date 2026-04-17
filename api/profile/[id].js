import { profiles } from "../../db.js";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { id } = req.query;

  const index = profiles.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Profile not found",
    });
  }

  if (req.method === "GET") {
    return res.status(200).json({
      status: "success",
      data: profiles[index],
    });
  }

  if (req.method === "DELETE") {
    profiles.splice(index, 1);
    return res.status(204).end();
  }

  return res.status(405).json({
    status: "error",
    message: "Method not allowed",
  });
}