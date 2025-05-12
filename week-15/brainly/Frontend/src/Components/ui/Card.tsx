import { Tweet } from "react-tweet";
import { Delete } from "./Icons/Delete";
import { Document } from "./Icons/Document";
import { Share } from "./Icons/Share";

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter";
    id?: String
}

function youtubeLinkConversion(link: string) {
    if (link.includes("watch?v=")) {
        return link.replace("watch?v=", "embed/");
    } else if (link.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${link.split("https://youtu.be/")[1]}`;
    }
    return link;
}


function YoutubeCard({ title, link, type, id }: CardProps) {
    return (
        <>
            <div id={String(id)} className="bg-white rounded-xl p-4 border-gray-200 shadow border max-w-80 max-h-fit">
                {/* Header */}
                <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-2 ">
                        <span className="text-gray-500">
                            <Document size="md" />
                        </span>
                        <div className="text-gray-700 font-medium">{title}</div>
                        <span className="text-sm text-gray-800 bg-purple-700/20">{type}</span>
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
                {/* Content */}
                <div className="py-4">

                    <iframe
                        className="w-full"
                        src={youtubeLinkConversion(link)}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>

                </div>
            </div>
        </>
    )
}



function TweetCard({ title, link, type, id }: CardProps) {
    // Use the passed id prop if available, otherwise extract from link
    const tweetId = (link.includes("/status/") ? link.split("/status/")[1] : '');
    
    return (
        <>
            <div id={String(id)} data-theme="light" className="bg-white rounded-xl light p-4 border-gray-200 shadow border max-w-80 max-h-fit">
                {/* Header */}
                <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-2 ">
                        <span className="text-gray-500">
                            <Document size="md" />
                        </span>
                        <div className="text-gray-700 font-medium">{title}</div>
                        <span className="text-sm text-gray-800 bg-purple-700/20">{type}</span>

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

                {tweetId && <Tweet id={tweetId} />}

            </div>
        </>
    )
}

export function Card({ title, link, type, id }: CardProps) {
    // Extract Tweet ID only if the link contains "/status/"
    const tweetId = link.includes("/status/") ? link.split("/status/")[1] : null;

    console.log("Link:", link);
    console.log("Tweet ID:", tweetId);

    return (

        <>
            {type == "twitter" && <TweetCard link={link} type={type} title={title} />}
            {type == "youtube" && <YoutubeCard link={link} type={type} title={title} id={id} />}

        </>
    );
}