import { Router } from "express";
import fs from "fs";
const router = Router();

router.post("/", async (req, res) => {
  try {
    const file = req.files.file;

    const fileName =
      Date.now() +
      "-" +
      (file.name = Buffer.from(file.name, "latin1").toString("utf8"));

    const isValidType = fileName.split(".").pop();
    if (
      (isValidType !== "jpg") &
      "mp4" & "jpeg" & "gif" & "png" &
      "svg" &
      "webp" &
      "mp4" &
      "webm" &
      "mp3" &
      "wav"
    ) {
      return res.status(400).json({ message: "unsupported type" });
    }
    file.mv(`files/` + fileName);
    res.json("files/" + fileName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
