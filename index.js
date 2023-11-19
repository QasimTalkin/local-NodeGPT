require("dotenv").config();
const express = require("express");
const OpenAIApi = require("openai");

const app = express();
app.use(express.json());


console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAIApi({
  api_key: process.env.OPENAI_API_KEY,
});

const port = process.env.PORT || 1212;

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 64,
    });

    const completion = response.data.choices[0].text;

    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}!!`));
