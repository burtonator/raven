import { useWhisper } from '@chengsokdara/use-whisper';
import { useEffect, useRef } from 'react';

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
}

export function WhisperControl(props: WhisperControlProps) {

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

  useEffect(() => {

    if(! startedSpeakingRef.current && speaking) {
      console.log("OK... we started speaking!")
      startedSpeakingRef.current = true
    }

    if (startedSpeakingRef.current && ! speaking) {

      if (! stopRecordingRef.current) {
        console.log("OK... we stopped speaking! Let's stop recording...")
        stopRecordingRef.current = true
        stopRecording()
          .catch(err => console.error(err))
      }
    }

  }, [speaking, stopRecording])

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

  return (
    <div>
      <p>Recording: {recording ? 'true' : 'false'}</p>
      <p>Speaking: {speaking ? 'true' : 'false'}</p>
      <p>Transcribing: {transcribing ? 'true' : 'false'}</p>
      <p>Transcribed Text: {transcript.text}</p>
      {/*<button onClick={() => startRecording()}>Start</button>*/}
      {/*<button onClick={() => pauseRecording()}>Pause</button>*/}
      {/*<button onClick={() => stopRecording()}>Stop</button>*/}
    </div>
  )
}
export default function Whisper() {

  return (
    <WhisperControl autoStart={true}/>
  )
  // return (
  //   <WhisperDebug/>
  // )
}