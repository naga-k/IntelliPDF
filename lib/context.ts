import { PineconeClient } from "@pinecone-database/pinecone"
import { convertToAscii } from "./utils"
import { getEmbeddings } from "./embeddings"

type Metadata = {
  text: string,
  pageNumber: number
}

export async function getMatchesFromEmbeddings(embeddings: number[], fileKey: string) {
  try {
    const pinecone = new PineconeClient()
    await pinecone.init({
      apiKey: process.env.PINECONE_API!,
      environment: process.env.PINECONE_REGION!,
    })
    const index = await pinecone.Index('pdfreader')

    const namespace = convertToAscii(fileKey)
    const queryResult = await index.query({
      queryRequest: {
        topK: 5,
        vector: embeddings,
        includeMetadata: true,
        namespace
      }
    })
    return queryResult.matches || []
  } catch (error) {
    console.log('error querying embeddings', error)
    throw error
  }
}

export async function getContext(query: string, fileKey: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );

  let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
  return docs.join("\n").substring(0, 3000);
}