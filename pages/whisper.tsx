import { useWhisper } from '@chengsokdara/use-whisper';
import { useCallback, useEffect, useRef, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

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
    // streaming: true,
    // timeSlice: 1500
  })

  const startedRecordingRef = useRef(false)
  const startedSpeakingRef = useRef(false)
  const stopRecordingRef = useRef(false)
  const transcribedRef = useRef(false)

  const handleStopRecording = useCallback(() => {

    setListening(false)
    stopRecording()
      .catch(err => console.error(err))

  }, [stopRecording])

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
    if (props.autoStart) {

      if (! startedRecordingRef.current) {
        console.log("Going to autostart recording")
        startedRecordingRef.current = true
        startRecording()
          .catch(err => console.error(err))
      }
    }
  }, [props.autoStart, startRecording])

  useEffect(() => {
    console.log("FIXME1")

    if (stopRecordingRef.current) {
      console.log("FIXME2")
      if (transcript.text) {
        console.log("FIXME3")
        if (!transcribedRef.current) {
          transcribedRef.current = true
          onTranscription?.(transcript.text)
        } else {
          console.log("FIXME 3.1")
        }
      } else {
        console.log("FIXME 2.1")
      }
    } else {
      console.log("FIXME 1.1")
    }

  }, [onTranscription, transcript])

  return (
    <LoadingButton loading={listening} color="primary" variant="contained" size="large" startIcon={<KeyboardVoiceIcon/>}/>

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