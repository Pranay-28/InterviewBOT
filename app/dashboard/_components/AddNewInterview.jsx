"use client"
import React, { useState } from 'react'
import { sendMessage } from '@/utils/GeminiAiModal'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAiModal'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { InterviewBot } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {user} = useUser();

  const onSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition,jobDescription, jobExperience);

    const InputPrompt = "Job Position : "+jobPosition+", Job Decription: "+jobDescription+", Years of experience: "+jobExperience+". Depending on this information please give me 5 interview question and answers in json format. Give question and answers as field in JSON"

    const result = await chatSession.sendMessage(InputPrompt);

    const MockJsonResp=(result.response.text()).replace('```json','').replace('```','');
    console.log(JSON.parse(MockJsonResp));

    if(MockJsonResp){
    const resp = await db.insert(InterviewBot).values(
      {
        mockId: uuidv4(),
        jsonMockResp:MockJsonResp,
        jobDesc:jobDescription,
        jobPosition:jobPosition,
        jobExperience:jobExperience,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD.MM.YYYY')
      }
    ).returning({mockId:InterviewBot.mockId});

    console.log("Inserted ID:",resp)
    if(resp){
      setLoading(false);
      router.push('/dashboard/interview/'+resp[0]?.mockId)

    }


   }else{
    console.log("ERROR");
   }


    setLoading(false);

    
  }


  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary
      hover:scale-105 hover:shadow-md cursor-pointer transition-all'
      onClick={()=>setOpenDialog(true)}
      >
        <h2 className='font-bold text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        
         <DialogContent>
         <DialogHeader>
         <DialogTitle className="text-2xl">Tell me about job you are interviewing</DialogTitle>
         <DialogDescription>
         <form onSubmit={onSubmit}>
           <div>
            <h2>Add Details about your Job position, Your skills, Years of experience</h2>
            <div className='mt-7 my-3'>
              <label>Job Role/Job Position</label>
              <Input placeholder="Ex. Full Stack Developer" required
              onChange = {(event) => setJobPosition(event.target.value)}
              ></Input>
            </div>
            <div className=' my-3'>
              <label>Job Requirements/ Tech Stack</label>
              <Textarea placeholder="Ex. React, Angular, NodeJs etc.." required
              onChange = {(event) => setJobDescription(event.target.value)}
              ></Textarea>
            </div>
            <div className=' my-3'>
              <label>Years of Experience</label>
              <Input placeholder="5" type="number" max="60" required
              onChange = {(event) => setJobExperience(event.target.value)}
              ></Input>
            </div>
           </div>
           <div className='flex gap-5 justify-end my-2'>
           
            <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" disabled = {loading}>
            {loading?
            <>
              <LoaderCircle className='animate-spin'/>'Generating from AI'
            </>:'Start Interview'
            }
            </Button>
           </div>
           </form>
          </DialogDescription>
         </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview
