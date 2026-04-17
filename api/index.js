export default function handler(req, res) {
  res.status(200).json({
    status: "success",
    message: "API is running",
    endpoints: {
      classify: "/api/classify?name=John"
    }
  });
}