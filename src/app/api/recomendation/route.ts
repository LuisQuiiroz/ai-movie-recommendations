import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from "ai"

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

const google = createGoogleGenerativeAI({ apiKey })

export async function POST (request: Request){
  try {
    // Obtener el texto generado por la IA
    const { query } = await request.json()
    const prompt = `I just watched ${query}, what do you recommend I watch? 
    Returns only names separated by commas.
    Avoid giving recommendations with many years of deference.
    That I can see them on some streaming service`

    const { text } = await generateText({
      model: google('models/gemini-1.5-flash-latest'),
      prompt
    })
    return Response.json(text)
  } catch (error) {
    return Response.json({ error: 'Error generation text'}, {status: 500})
  }
}
