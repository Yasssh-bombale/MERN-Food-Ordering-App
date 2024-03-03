import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
app.get("/test", (req: Request, res: Response) => {
  return res.json({
    message: "test",
  });
});

app.listen(8000, () => {
  console.log(`Backend server running on http://localhost:8000`);
});
