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

export interface WhisperStatus {
  readonly recording: boolean
  readonly speaking: boolean
  readonly transcribing: boolean
}

interface WhisperControlProps {
  readonly disabled?: boolean
  readonly autoStart?: boolean
  readonly onStartRecording?: () => void
  readonly onStopRecording?: () => void
  readonly onTranscription?: (text: string) => void
  readonly onStatus?: (status: WhisperStatus) => void
  readonly size?: string | number
}

export function WhisperControl(props: WhisperControlProps) {

  // FIXME I need onTranscripting... here...

  const {onTranscription, onStartRecording, onStopRecording, onStatus} = props
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
    // removeSilence: true,
    // streaming: true,
    // timeSlice: 1500
  })

  const autoStartedRef = useRef(false)

  const startedRecordingRef = useRef(false)
  const startedSpeakingRef = useRef(false)
  const stopRecordingRef = useRef(false)
  const transcribedRef = useRef(false)

  const handleStopRecording = useCallback(() => {

    onStopRecording?.()
    setListening(false)

    stopRecording()
      .catch(err => console.error(err))

  }, [onStopRecording, stopRecording])

  const handleStartRecording = useCallback(() => {

    onStartRecording?.()

    if (! startedRecordingRef.current) {
      startedRecordingRef.current = true
      setListening(true)
      startRecording()
        .catch(err => console.error(err))
    }

  }, [onStartRecording, startRecording])

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
      console.log("Going to autostart recording")
      autoStartedRef.current = true
      handleStartRecording()
    }

  }, [props.autoStart, handleStartRecording])

  useEffect(() => {

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

  useEffect(() => {
    onStatus?.({recording, transcribing, speaking})
  }, [onStatus, recording, transcribing, speaking])

  const size='200px'

  if (listening) {
    return (
      <IconButton onClick={handleStopRecording}>
        <CircularProgress variant='indeterminate' size={size} />
      </IconButton>
    )
  }

  return (
    <IconButton disabled={props.disabled ?? false} style={{height: size, width: size}} onClick={handleStartRecording} color="primary">
      <KeyboardVoiceIcon style={{height: size, width: size}}/>
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