'use client'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { InterviewBot } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({params}) {
    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect (()=> {
        GetInterviewDetails();

    }, [])

    const GetInterviewDetails = async() => {
        const result = await db.select().from(InterviewBot).where(eq(InterviewBot.mockId, params.interviewId));
        console.log(result);
        try {
    const jsonMockResp = JSON.parse(result[0].jsonMockResp.trim());
    console.log("Parsed JSON:", jsonMockResp);

    setMockInterviewQuestion(jsonMockResp);  // Set the parsed JSON array
    setInterviewData(result[0]);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
    }



  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <QuestionsSection mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className='flex justify-end gap-6'>
        {activeQuestionIndex>0 && 
        <Button onClick = {() => setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex!=mockInterviewQuestion?.length-1&&
        <Button onClick = {() => setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex==mockInterviewQuestion?.length-1&&
        <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
        <Button>End Interview</Button>
        </Link>}
      </div>
    </div>
  )
}

export default StartInterview
