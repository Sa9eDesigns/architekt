'use client'
/*This Defines the Chat Component for the AI Assistant 
- This component is responsible for rendering the chat interface for the AI Assistant
- it also handles the user input and sends it to the assistant action
- it can stream the response from the assistant action to the user
- capable of Generative AI responses using React Server Components
*/

import React, { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { assistant } from "@/actions/SageAI/assistant";

