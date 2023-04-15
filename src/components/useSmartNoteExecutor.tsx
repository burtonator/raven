import { useCallback } from 'react';
import {
  ChatCompletionRequestMessage,
  CreateChatCompletionRequest, CreateChatCompletionResponse
} from 'openai';
import { useOpenAPI } from '@/src/useOpenAPI';
import { useSmartNoteIndex } from '@/src/components/SmartNoteIndexProvider';
import YAML from 'yaml'

const SYSTEM_PROMPT = `
You are a research assistant. Your job is to answer the users questions. 

After you generate the answer to a question you must then generate a list of 
additional questions the user is likely to ask next.

You should have one additional question per line.

Additionally, we will give you a list of existing notes, and you will 
find which ones are related to the current question and answer. If they do not
seem related do not include them in the output.

Make sure the list of related notes is exhaustive.  Do not miss any related notes
that are in the list of existing notes.

Your output will be in YAML and must be prefixed by "---"

# Examples:

## Here's the first example:
  
  User message: 
  
    What is WWII?
  
    Existing notes:
      - What is Artificial Intelligence
      - What is AGI?
      - What was the Holocaust?  
      - What is artificial intelligence (AI) and how does it work?
      - How is AI currently being used in industries like healthcare or finance?
      - What are some potential risks and benefits of advancing AI technology?
      - How can AI be used to improve our daily lives?
      - What were the causes of World War II?
      - How did the war impact civilians and soldiers on both sides?
      - What were some of the major battles and turning points of World War II?
      - What was the impact of technology on the war effort?
  
  Assistant response:
    
    World War II (WWII) was a global war that lasted from 1939 to 1945. It 
    involved the majority of the world's nations, including all of the great
    powers, and was characterized by the widespread use of new technologies, 
    including tanks, aircraft, and chemical weapons, as well as the use of 
    concentration camps and the atomic bomb. The war resulted in the deaths of
    millions of people, including civilians and military personnel, and had a 
    profound impact on the world, leading to the formation of the United 
    Nations and other international organizations, as well as significant 
    changes in global politics and economics.    
    
    ---
    additional_questions: 
        - What were the main causes of World War II?
        - How did World War II differ from World War I?
        - What were some of the most significant battles of World War II?
        - What were some of the most notable technological advancements made during the war?
        - How did the Holocaust come about and what was its impact?
    related_notes: 
      - What were the causes of World War II?
      - How did the war impact civilians and soldiers on both sides?
      - What were some of the major battles and turning points of World War II?
      - What was the impact of technology on the war effort?
    
## Here's another example:

    User message:
      
      What is photosynthesis?
      
      Existing notes:
      - What is cellular respiration?
      - What is the role of chlorophyll in photosynthesis?
      - What are the two main stages of photosynthesis?
      - What is the Calvin cycle?
      - What are the inputs and outputs of photosynthesis?
      - What is Python programming language?
      - What are the basic data types in Python?
      - How do loops work in Python?
      - What are functions in Python?
      - How can I create and use classes in Python?
      - What is the history of ballet?
      - What are the basic positions in ballet?
      - What are some famous ballets?
      - What is the difference between classical and contemporary ballet?
      - How has ballet evolved over time?
      
    Assistant response:
      
      Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy in the form of glucose or other sugars. This process is essential for life on Earth, as it provides the oxygen we breathe and the energy that sustains the food chain. Photosynthesis occurs in the chloroplasts of plant cells, where chlorophyll and other pigments absorb light energy and initiate a series of chemical reactions that transform carbon dioxide and water into glucose and release oxygen as a byproduct.
      
      ---
      additional_questions:
        - What is the role of sunlight in photosynthesis?
        - How do plants store the energy produced during photosynthesis?
        - What factors can affect the rate of photosynthesis?
        - How are photosynthesis and cellular respiration related?
        - What are some adaptations plants have developed for efficient photosynthesis?
      
      related_notes:
        - What is cellular respiration?
        - What is the role of chlorophyll in photosynthesis?
        - What are the two main stages of photosynthesis?
        - What is the Calvin cycle?
        - What are the inputs and outputs of photosynthesis?    
          
`.trim()

const MODEL = 'gpt-4'
// const MODEL = 'gpt-3.5-turbo'

export interface SmartNoteCompletion {
  readonly content: string
  readonly items: ReadonlyArray<string>
  readonly related: ReadonlyArray<string>
  readonly model: string
}

export function parseSmartNoteResult(text: string): SmartNoteCompletion | undefined {

  const s = text.split('---\n')

  if (s.length === 2) {

    const yaml_data = s[1]

    const data = YAML.parse(yaml_data)

    return {
      content: s[0],
      items: data.additional_questions,
      related: data.related_notes,
      model: MODEL
    }
  }

  // either GPT3/GPT4 failed or it is not able to compute any follow-on questions.
  return {
    content: text,
    items: [],
    related: [],
    model: MODEL
  }

}

export function useSmartNoteExecutor() {

  const openai = useOpenAPI()

  const [index] = useSmartNoteIndex()

  return useCallback(async (question: string): Promise<SmartNoteCompletion | undefined> => {

    function createChatCompletionRequest(messages: ReadonlyArray<ChatCompletionRequestMessage>): CreateChatCompletionRequest {

      return {
        model: MODEL,
        temperature: 0.0,
        max_tokens: 2048,
        top_p: 1,
        n: 1,
        messages: [...messages]
      }

    }

    const messages: ReadonlyArray<ChatCompletionRequestMessage> = [
      {"role": "system", "content": SYSTEM_PROMPT.trim()},
      {
        role: 'user',
        content: `${question}\n\nExisting notes: ${Object.keys(index).join("\n")}`
      }
    ]


    const req = createChatCompletionRequest(messages)
    console.log("Executing chat: ", JSON.stringify(req, null, '  '))

    const before = Date.now()
    const res = await openai.createChatCompletion(req)
    const after = Date.now()
    const duration = after - before
    console.log("Got response: ", res)
    if (res.data.choices.length > 0) {
      const first = res.data.choices[0]
      if (first.message) {
        return parseSmartNoteResult(first.message.content)
      }
    }

    return undefined

  }, [openai])

}