import { React, useState, useEffect } from 'react'
import { Presentation, SendToBack } from 'lucide-react';
import Button from '../Components/Button';
import toast from 'react-hot-toast';

function Signup() {
    const [btn, setbtn] = useState(true)
    const [data, setData] = useState("")
    useEffect(() => {

        if (data == "") {
            setbtn(true)
        }
        else (
            setbtn(false)
        )
    }, [data]) 

 
    // Improving User Interface  

    return (
        <div className='h-screen w-screen bg-primary flex justify-start py-30 flex-col items-center'>
            <main className='flex flex-col gap-5 justify-center items-center'>
                <header className='flex text-3xl items-center text-center '>
                    <div className='px-4'>
                        <Presentation size={"40"} />
                    </div>
                    <span className='text-accent w-fit'>Webinar</span>
                    .gg
                </header>
                <div className='text-[40px] font-bold py-16'>Verify Your Age</div>
                <p className='text-text text-center '>Please confirm your birth year. This data will not be stored. </p>

                <input className='outline-white border-none bg-secondary text-slate-400 w-9/12  px-3 py-3 rounded-lg' placeholder='Your Birth Year' value={data} type="text" name="" id=""
                    onChange={
                        (e) => {
                            setData(e.target.value)

                        }} />


                <Button onClick={() => {

                    if (data == "") {
                        console.log("Get clicked")
                        toast.error("Please Enter Date of Birthh")
                    }
                    else {
                        console.log("Got Clicked")
                        toast.success("Succefully Submited")
                    }
                }} btnStatus={btn} >Continue Click</Button>

            </main>

        </div>
    )

}

export default Signup
