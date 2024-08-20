'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAiModal'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'


function RecordAnswerSection({mockInterviewQuestion, activeQuestionIndex, interviewData}) {
    const [userAnswer, setUserAnswer] = useState('');
    const user = useUser();
    const [loading,setLoading] = useState(false);

    const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) => (
        setUserAnswer(prevAns => prevAns+result?.transcript)
    ))
  },[results]);

  useEffect(() => {
    if(!isRecording&&userAnswer.length>0){
      UpdateUserAnswer();
    }

  },[userAnswer])

   const StartStopRecording = async() => {
    if (isRecording) {
      console.log('Stopping recording...');
      
      stopSpeechToText();
      

    } else {
      console.log('Starting recording...');
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async() => {
    setLoading(true);
    const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
      ", userAnswer:"+userAnswer+", Depending on question and answer for given interview question"+
      ",please give us rating for answer, correct answer and feedback as area for improvement if any "+
      "in just 3-5 lines to improve it in JSON format with rating field, correctAns field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp =(result.response.text()).replace('```json','').replace('```','');

      console.log(mockJsonResp);
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp=await db.insert(UserAnswer)
      .values({
        mockIdRef:interviewData?.mockId,
        question:mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns:userAnswer,
        feedback:JsonFeedbackResp?.feedback,
        rating:JsonFeedbackResp?.rating,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('YYYY-MM-DD')

      })

      if(resp){
        toast("User Answer recorded successfully");
        setUserAnswer('');
        console.log(resp);
        setResults([]);
      }
      setResults([]);
      setLoading(false);


  }

  if (error) return <p>Web Speech API is not available in this browser 🤷‍. Please use another browser for interview.</p>;

  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col mt-10 justify-center items-center bg-black rounded-lg'>
      <Image src={'/webcam.png'} height={200} width={200}
        className='absolute'
      />
      <Webcam
      mirrored={true}
        style = {{
            height:300,
            width:'100%',
            zIndex:10,
        }}
      />
    </div>
    <Button variant="outline" className='my-10'
    disabled={loading}
    onClick = {StartStopRecording}
    // onClick = {()=>console.log('button pressed')}
    >
    {isRecording?
    <h2 className='text-red-500 animate-pulse flex gap-2 items-center'>
        <StopCircle/> Stop Recording..
    </h2>
    :
    <h2 className='text-primary flex gap-2 items-center'>
      <Mic/>Record Answer
    </h2>}</Button>
  
    </div>
  )
}

export default RecordAnswerSection
