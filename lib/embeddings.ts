import { OpenAIApi, Configuration, ResponseTypes } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  try {
    // Log the input text for debugging
    console.log('Input text:', text);

    // Check if the input text is undefined or null
    if (!text) {
      throw new Error('Input text is undefined or null');
    }

    // Make the API call to OpenAI
    const response = await openai.createEmbedding({
      model: "text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    });

    // Log the API response for debugging
    const result = (await response.json()) as ResponseTypes['createEmbedding'];
    console.log('API response:', result);

    // Check if the response data is undefined or null
    if (!result.data || !result.data[0] || !result.data[0].embedding) {
      throw new Error('API response is undefined or null');
    }

    // Return the embeddings
    return result.data[0].embedding as number[];
  } catch (error) {
    // Log any errors that occur
    console.error('Error in getEmbeddings:', error);
    throw error;
  }
}
