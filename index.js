
import dotenv from "dotenv";
import OpenAIApi from "openai";
import chalk from "chalk";
import readline from "readline";
// const app = express();
// app.use(express.json());
dotenv.config()

console.log(process.env.OPENAI_API_KEY);

const openai = new OpenAIApi({
  api_key: process.env.OPENAI_API_KEY,
});

const port = process.env.PORT || 1212;


const logRed = (text) => console.log(chalk.red(text));

const logGreen = (text) => console.log(chalk.green(text));



// app.post("/ask", async (req, res) => {
//   const prompt = req.body.prompt;

//   try {
//     if (prompt == null) {
//       throw new Error("Uh oh, no prompt was provided");
//     }

//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt,
//       max_tokens: 64,
//     });

//     const completion = response.data.choices[0].text;

//     return res.status(200).json({
//       success: true,
//       message: completion,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// });

// make this request a commmand line req

const askOpenAI = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });


  logRed("Please enter the prompt:");

  const prompt = await new Promise((resolve) => {
    rl.question("", (answer) => {
      resolve(answer);
      rl.close();
    });
  });

  try {
    if (!prompt) {
      throw new Error("Uh oh, no prompt was provided");
    }

    logGreen(`User prompt: ${prompt}`);

    const response = await  openai.chat.completions.create({
      model: "text-davinci-003",
      prompt,
      max_tokens: 64,
    });

    const completion = response.data.choices[0].text;

    // Log the response in green color
    logGreen(`Response: ${completion}`);
  } catch (error) {
    console.log(chalk.red(error.message));
  }
};

askOpenAI();