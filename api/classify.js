import axios from "axios";

export default async function handler(req, res) {
  // Allow only GET requests
  if (req.method !== "GET") {
    return res.status(405).json({
      status: "error",
      message: "Method not allowed",
    });
  }

  try {
    const { name } = req.query;

    // Validate input
    if (!name || name === "") {
      return res.status(400).json({
        status: "error",
        message: "Missing or empty name parameter",
      });
    }

    if (typeof name !== "string") {
      return res.status(422).json({
        status: "error",
        message: "Name must be a string",
      });
    }

    // Call external API
    const response = await axios.get(
      `https://api.genderize.io?name=${encodeURIComponent(name)}`
    );

    const { gender, probability, count } = response.data;

    // Handle no prediction
    if (gender === null || count === 0) {
      return res.status(200).json({
        status: "error",
        message: "No prediction available for the provided name",
      });
    }

    // Process data
    const sample_size = count;

    const is_confident =
      probability >= 0.7 && sample_size >= 100;

    const processed_at = new Date().toISOString();

    // Send response
    return res.status(200).json({
      status: "success",
      data: {
        name: name.toLowerCase(),
        gender,
        probability,
        sample_size,
        is_confident,
        processed_at,
      },
    });

  } catch (error) {
    // Handle API errors
    if (error.response) {
      return res.status(502).json({
        status: "error",
        message: "Upstream API error",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

