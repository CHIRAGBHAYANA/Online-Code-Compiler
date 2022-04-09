const express = require("express");
const { generateFile } = require("./generateFile");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ key: "heeleo" });
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "Empty code body" });
  }

  // need to generate a c++ file with content from the request

  const filePath = await generateFile(language, code);

  // we need to run the file and send the message

  return res.json({ filePath });
});

app.listen(5000, () => {
  console.log(`Server is listening on 5000`);
});
