import { Button } from "./Button";
import { CircleX } from 'lucide-react';

export function CreateContentModel({ setModalopen }: { setModalopen: (value: boolean) => void }) {
    return (
        <div className="bg-black/75 w-screen backdrop-blur-sm fixed text-white h-screen inset-0 flex justify-center items-center">
            {/* model form */}
            <div className="bg-white rounded-lg py-6 px-7 border-gray-200 shadow border relative  min-w-96 max-w-md max-h-fit">
                
                    <CircleX onClick={()=>{setModalopen(false)}} size="30px" className="absolute top-2 right-2 text-gray-900 cursor-pointer" />
                
                <h1 className="text-2xl font-semibold py-2 text-gray-800 ">Add Content to <br />Your Brain</h1>
                <div className="flex flex-col gap-4 text-gray-700 mt-4">
                        <div className="flex flex-col gap-4">
                            <label htmlFor="title" className="text-gray-700 font-semibold">Content Title</label>
                            <input type="text" id="title" className="border-2 active:outline-none outline-none border-gray-300 rounded p-2" placeholder="Enter title" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="link" className="text-gray-700 font-semibold">Content Type</label>
                            {/* <input type="text" id="link" className="border border-gray-300 rounded p-2" placeholder="Enter link" /> */}
                            <select className="border  border-gray-300 rounded outline-none text-gray-700 p-2" id="type">
                                <option value="youtube">Youtube</option>
                                <option value="twitter">Twitter</option>
                                <option value="web">Web</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="link" className="text-gray-700 font-semibold">Link</label>
                            <input type="text" id="link" className="border active:outline-none outline-none border-gray-300 rounded p-2" placeholder="Enter link" />
                        </div>
                        <div>

                        </div>
                        <div className="flex justify-center items-center mt-2">
                            <Button variant="primary" size="medium" text="Add Content" />
                        </div>
                </div>
            </div>
        </div>
    )
}
