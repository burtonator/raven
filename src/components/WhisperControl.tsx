import { useWhisper } from '@chengsokdara/use-whisper';
import { useCallback, useEffect, useRef, useState } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { CircularProgress, IconButton } from '@mui/material';
import { useLocalStorage } from '@/src/useLocalStorage';
import { useProxyURL } from '@/src/useProxyURL';

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

  const endpoint = useProxyURL('openai')

  const {onTranscription, onStartRecording, onStopRecording, onStatus} = props
  const [listening, setListening] = useState<boolean>(props.autoStart ?? false)

  const apiKey = useLocalStorage('OPENAI_API_KEY')

  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    apiKey: apiKey ?? 'none',
    endpoint: endpoint ?? null,
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