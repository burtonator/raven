import { useWhisper } from '@burtonator/use-whisper';
import { useCallback, useEffect, useRef, useState } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { CircularProgress, IconButton } from '@mui/material';

function WhisperDebug () {

  console.log('here')

  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: 'none',
    // streaming: true,
    // timeSlice: 1500
  })

  return (
    <div>
      <p>Recording: {recording ? 'true' : 'false'}</p>
      <p>Speaking: {speaking ? 'true' : 'false'}</p>
      <p>Transcribing: {transcribing ? 'true' : 'false'}</p>
      <p>Transcribed Text: {transcript.text}</p>
      <button onClick={() => startRecording()}>Start</button>
      <button onClick={() => pauseRecording()}>Pause</button>
      <button onClick={() => stopRecording()}>Stop</button>
    </div>
  )
}

