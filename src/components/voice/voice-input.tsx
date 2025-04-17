'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface VoiceInputProps {
  onResult: (text: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onResult }) => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const SpeechRecognition =
    typeof window !== 'undefined' ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : null;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (!recognition) {
      console.log('Speech Recognition not supported.');
      return;
    }

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      console.log('Voice recognition started');
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        interimTranscript += result[0].transcript;
      }
      setTranscript(interimTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('Voice recognition ended');
      onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Recognition error:', event.error);
      setIsListening(false);
    };

    return () => {
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
    };
  }, [recognition, onResult, transcript]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  return (
    <div>
      <Textarea value={transcript} readOnly placeholder="Start speaking..." />
      <div className="mt-2 flex justify-around">
        <Button onClick={startListening} disabled={isListening}>
          {isListening ? 'Listening...' : 'Start Listening'}
        </Button>
        <Button onClick={stopListening} disabled={!isListening} variant="secondary">
          Stop Listening
        </Button>
      </div>
    </div>
  );
};

export default VoiceInput;
