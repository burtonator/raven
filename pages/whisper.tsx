import { useWhisper } from '@chengsokdara/use-whisper';
import { useCallback, useEffect, useRef, useState } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { CircularProgress, IconButton } from '@mui/material';

const API_KEY_INPUTNEURON = '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'


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
    apiKey: API_KEY_INPUTNEURON,
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

interface WhisperControlProps {
  readonly autoStart?: boolean
  readonly onTranscription?: (text: string) => void
}

export function WhisperControl(props: WhisperControlProps) {

  console.log("FIMXE: whispercontrol rendered")

  const {onTranscription} = props
  const [listening, setListening] = useState<boolean>(props.autoStart ?? false)

  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: API_KEY_INPUTNEURON,
    removeSilence: true,
    // streaming: true,
    // timeSlice: 1500
  })

  const autoStartedRef = useRef(false)

  const startedRecordingRef = useRef(false)
  const startedSpeakingRef = useRef(false)
  const stopRecordingRef = useRef(false)
  const transcribedRef = useRef(false)

  const handleStopRecording = useCallback(() => {

    setListening(false)

    stopRecording()
      .catch(err => console.error(err))

  }, [stopRecording])

  const handleStartRecording = useCallback(() => {

    if (! startedRecordingRef.current) {
      console.log("Going to autostart recording")
      startedRecordingRef.current = true
      setListening(true)
      startRecording()
        .catch(err => console.error(err))
    }

  }, [startRecording])

  useEffect(() => {

    if(! startedSpeakingRef.current && speaking) {
      console.log("OK... we started speaking!")
      startedSpeakingRef.current = true
    }

    if (startedSpeakingRef.current && ! speaking) {

      if (! stopRecordingRef.current) {
        console.log("OK... we stopped speaking! Let's stop recording...")
        stopRecordingRef.current = true
        handleStopRecording()
      }
    }

  }, [speaking, handleStopRecording])

  useEffect(() => {

    if (!autoStartedRef.current && props.autoStart) {
      autoStartedRef.current = true
      handleStartRecording()
    }

  }, [props.autoStart, handleStartRecording])

  useEffect(() => {

    console.log("FIXME: 1")

    if (stopRecordingRef.current) {
      console.log("FIXME: 2")
      if (transcript.text) {
        console.log("FIXME: 3")

        if (!transcribedRef.current) {
          console.log("FIXME: 4")

          transcribedRef.current = true
          onTranscription?.(transcript.text)
          // reset for next iteration...
          startedRecordingRef.current = false
          startedSpeakingRef.current = false
          stopRecordingRef.current = false
          transcribedRef.current = false

        }
      }
    }
  }, [onTranscription, transcript])

  if (listening) {
    return (
      <IconButton size='medium' onClick={handleStopRecording}>
        <CircularProgress variant='indeterminate' size={24} />
      </IconButton>
    )
  }

  return (
    <IconButton size='medium' onClick={handleStartRecording}>
      <KeyboardVoiceIcon/>
    </IconButton>
  )
}
export default function Whisper() {

  return (
    <WhisperControl autoStart={true} onTranscription={text => console.log("Got transcription: " + text)}/>
  )
  // return (
  //   <WhisperDebug/>
  // )
}