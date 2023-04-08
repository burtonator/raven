- what I need next
  - stream results
    -  
    - I need to do this NEXT so that I get the first data packets from the backend to 
      immediately start streaming the results to the TTS API ... 
    - The streaming stuff doesn't help a ton because I need a way to make the
      TTS work with this... and make it stream the text... 

    - What I tried:
      - calling .on on res.data (no method)
      - I can pass onDownloadProgress and execute the request like:
        ({...req, stream: true}
      - but I cna't read individual chunks... 
        - I could split them if I wanted but that's hacky for now.

  - Ability to cancel generating
  - latency / duration
  - Chagne the system prompt
  - proper icons for system and user... 
  - copy raw output, copy tables...
  - store the OpenAI API key in localStorage for now... 
  
  - Figure out what models you have and let you select them by running /models
  - Plugin model so that you can define your own credentials
  - view markdown from GPT 
  - buttons to trigger other apps ... 

  - dock on the left so that can trigger new sessions...  
  - improve table support
  - stories/chromatic
  - light / dark theme... 
  - get syntax highlighting for source code to work
  - get history to work including up/down arrow keys...
  - ability to copy raw output.. .
  - ability to ask GPT4 the same thing...
    - 


- https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
- custom syntax highlightings