
// import { Card } from "./Card";

import { Tweet } from "react-tweet";
import { Document } from "./Icons/Document";
import { Share } from "./Icons/Share";
import { Delete } from "./Icons/Delete";

interface CardProps {
    title: string;
    link: string;
    type?: "youtube" | "twitter";
}

function TweetCard({ title, link, type }: CardProps) {

  return (
    <>
    <div data-theme="light" className="bg-white rounded-xl light p-4 border-gray-200 shadow border max-w-80 max-h-fit">
                            {/* Header */}
                            <div className="flex justify-between items-center px-2">
                                <div className="flex items-center gap-2 ">
                                    <span className="text-gray-500">
                                        <Document size="md" />
                                    </span>
                                    <div className="text-gray-700 font-medium">{title}</div>
                                </div>
                                <div className="flex gap-4 text-gray-500">
                                    <span className="cursor-pointer">
                                        <Share size="md" />
                                    </span>
                                    <span className="cursor-pointer">
                                        <Delete size="md" />
                                    </span>
                                </div>
                            </div>
       
        <Tweet id={link.includes("/status/") ? link.split("/status/")[1] : ''} />

      </div>

    </>
  )
}

export default TweetCard