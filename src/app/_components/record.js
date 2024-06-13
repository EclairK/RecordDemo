// components/Recorder.js  
'use client'
import React, { useState, useRef } from 'react';  
  
const Recorder = () => {  
  const [isRecording, setIsRecording] = useState(false);  
  const [audioURL, setAudioURL] = useState('');  
  const mediaRecorderRef = useRef(null);  
  const audioChunksRef = useRef([]);  
  
  const startRecording = async () => {  
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });  
    mediaRecorderRef.current = new MediaRecorder(stream);  
      
    mediaRecorderRef.current.ondataavailable = (event) => {  
      audioChunksRef.current.push(event.data);  
    };  
      
    mediaRecorderRef.current.onstop = () => {  
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });  
      const url = URL.createObjectURL(audioBlob);  
      setAudioURL(url);  
      audioChunksRef.current = [];  
    };  
  
    mediaRecorderRef.current.start();  
    setIsRecording(true);  
  };  
  
  const stopRecording = () => {  
    mediaRecorderRef.current.stop();  
    setIsRecording(false);  
  };  
  
  return (  
    <div>  
      <button onClick={isRecording ? stopRecording : startRecording}>  
        {isRecording ? 'Stop Recording' : 'Start Recording'}  
      </button>  
      {audioURL && (  
        <audio controls>  
          <source src={audioURL} type="audio/wav" />  
        </audio>  
      )}  
    </div>  
  );  
};  
  
export default Recorder;  
