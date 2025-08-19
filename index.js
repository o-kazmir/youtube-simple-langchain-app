const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require('@langchain/core/prompts');
const dotenv = require("dotenv");

dotenv.config();

const SENTIMENTS = ["positive", "negative", "neutral"];

const PROMPT_TEMPLATE = `
    Проаналізуй настрій відгуку одним словом.  
    Використай лише одне з наступних: {sentiments}  

    Відгук: {review}`

const model = new ChatOpenAI({
    model: "gpt-5",
    apiKey: process.env.OPENAI_API_KEY
});

const prompt = new PromptTemplate({
    template: PROMPT_TEMPLATE,
    inputVariables: ["review", "sentiments"],
});

const analyze = async () => {
    const review = 'Подобається якість камери, але батарея швидко розряджається!';
    const formattedPrompt = await prompt.format({
        review,
        sentiments: SENTIMENTS.join(", ")
    });

    const response = await model.invoke(formattedPrompt);

    console.log({
        sentiment: response.content,
        review
    });
}

analyze()