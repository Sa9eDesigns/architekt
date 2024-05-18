// Import the openai function from the @ai-sdk/openai library
// This function likely provides an interface to interact with the OpenAI API
import { openai } from "@ai-sdk/openai";

// Import the necessary functions and types from the 'ai' library
// StreamingTextResponse: A class representing a streaming text response
// streamText: A function for streaming text based on a model and messages
// StreamData: A class for handling additional data to be sent with the response
import { StreamingTextResponse, streamText, StreamData } from "ai";

// Export an asynchronous function named POST
// This function is likely used as a route handler for HTTP POST requests
export async function POST(req: Request) {
  // Extract the 'messages' property from the request body (expected to be in JSON format)
  const { messages } = await req.json();

  // Call the streamText function with the OpenAI GPT-4 Turbo model and the provided messages
  // The result is awaited and stored in the 'result' constant
  const result = await streamText({
    model: openai("gpt-4-turbo"), // Initialize the OpenAI GPT-4 Turbo model
    messages, // Pass the messages extracted from the request body
  });

  // Create a new instance of StreamData
  // This class is likely used for handling additional data to be sent with the response
  const data = new StreamData();

  // Append an object with a 'test' property set to 'value' to the StreamData instance
  data.append({ test: "value" });

  // Convert the 'result' object into a stream using the toAIStream method
  // Pass an object with an 'onFinal' callback function
  // This callback function is executed when the stream is finalized
  // Inside the callback, the 'close' method is called on the 'data' object
  const stream = result.toAIStream({
    onFinal(_) {
      data.close();
    },
  });

  // Create a new instance of StreamingTextResponse
  // This class likely represents a streaming text response
  // Pass the following arguments:
  // 1. 'stream': The stream created from the 'result' object
  // 2. '{}': An empty object, which might be used for setting headers or other response options
  // 3. 'data': The StreamData instance created earlier
  return new StreamingTextResponse(stream, {}, data);
}