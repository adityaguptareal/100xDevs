import './App.css'
import {motion} from "motion/react"
function App() {
  
  const brandName = ['React','Vite','Tailwind CSS',  'Next.js','Node.js','Express.js','MongoDB','Firebase','AWS','Docker','Kubernetes','GraphQL','TypeScript','Redux Toolkit','Jest','Enzyme','Storybook','Webpack','Babel','ESLint','Prettier','GitLab CI/CD']
const brandName2=["Naman","Rahul","Saurabh","Shubham","Aman","Ankit","Abhishek","Naman","Rahul","Saurabh","Shubham","Aman","Ankit","Abhishek"]
  return (
    <>
    <div className="h-screen w-screen bg-gray-900 flex gap-8 flex-col justify-center items-center">
    <div className='h-[100px] scrollGradient w-[800px] flex justify-center items-center text-2xl overflow-hidden mx-auto bg-white text-black'>
      <div className='flex space-x-6 justify-center items-center shrink-0'>
        <motion.div initial={{x:"0"}} animate={{x:"-100%"}} transition={{duration:60,repeat:Infinity,delay:0,ease:'linear'}} className='flex cursor-pointer space-x-6'>
          {brandName.map((item,index)=>{
            return(
              <div className='flex' key={index}>{item}</div>
            )
          })}
          {brandName.map((item,index)=>{
            return(
              <div className='flex' key={index+1}>{item}</div>
            )
          })}
          {brandName.map((item,index)=>{
            return(
              <div className='flex' key={index+3}>{item}</div>
            )
          })}
        </motion.div>
      </div>
    </div>

    <div className='h-[100px] scrollGradient w-[800px] flex justify-center items-center text-2xl overflow-hidden mx-auto bg-white text-black'>
      <div className='flex space-x-6 justify-center items-center shrink-0'>
        <motion.div initial={{x:"0"}} animate={{x:"100%"}} transition={{duration:60,repeat:Infinity,delay:0,ease:'linear'}} className='flex cursor-pointer space-x-6'>
          {brandName2.map((item,index)=>{
            return(
              <div className='flex' key={index}>{item}</div>
            )
          })}
          {brandName2.map((item,index)=>{
            return(
              <div className='flex' key={index+1}>{item}</div>
            )
          })}
          {brandName2.map((item,index)=>{
            return(
              <div className='flex' key={index+3}>{item}</div>
            )
          })}
        </motion.div>
      </div>
    </div>
    </div>
    </>
    )
}

export default App
