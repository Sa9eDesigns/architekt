'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
//safe-action
import { action } from '@/library/SAGEAI/safe-action';
import { z } from 'zod';

//Continue the conversation with the AI
//-- input validation schema
const userMessageSchema = z.object({
  message: z.string(),
  user: z.string(),
});

export const assistant = action(userMessageSchema, async (messages: CoreMessage[]) => {
  const result = await streamText({
    model: openai('gpt-4'),
    messages,
  });

  const stream = createStreamableValue(result.textStream);
  return stream.value;
});