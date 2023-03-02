import { Router } from "express";
import fs from "fs";
const router = Router();

router.post("/", async (req, res) => {
  try {
    const file = req.files.file;

    const fileName =
      Date.now() + "-" + Buffer.from(file.name, "latin1").toString("utf8");

    if (!fs.existsSync("files")) {
      fs.mkdirSync("files");
    }

    const allowedTypes = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "video/mp4",
      "audio/mp3",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ message: "Invalid file type" });
    }

    file.mv(`files/` + fileName);

    res.json("files/" + fileName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    fs.unlinkSync(`files/${filename}`);
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
