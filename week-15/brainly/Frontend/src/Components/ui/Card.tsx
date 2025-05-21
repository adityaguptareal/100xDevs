import { Tweet } from "react-tweet";
import { Delete } from "./Icons/Delete";
import { Share } from "./Icons/Share";
import { SiGitter, SiYoutube } from "react-icons/si";
import axios from "axios";
import toast from "react-hot-toast";
import ShareContent from "./Icons/ShareContent";
import { useState } from "react";

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter";
    id?: string;
    refreshContent?: () => void;
}

function youtubeLinkConversion(link: string) {
    if (link.includes("watch?v=")) {
        return link.replace("watch?v=", "embed/");
    } else if (link.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${link.split("https://youtu.be/")[1]}`;
    }
    return link;
}

async function handleDelete(id: string, refreshContent?: () => void) {
    try {
        console.log("Delete button clicked, ID:", id);
        toast.loading("Deleting...");
        const response = await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,
            {
                headers: { Authorization: localStorage.getItem("SecondBrainToken") },
                data: { contentId: id },
            }
        );
        toast.dismiss();
        if (response.status === 200) {
            toast.success("Content deleted successfully!");
        } else {
            toast.error(response.data?.message || "Failed to delete content.");
        }
    } catch (error: any) {
        console.log(error);
        toast.dismiss();
        toast.error(
            error?.response?.data?.message ||
            "An unexpected error occurred while deleting."
        );
    } finally {
        if (refreshContent) refreshContent();
    }

}
function YoutubeCard({ title, link, type, id, refreshContent }: CardProps) {

    const [showShareConent, setShowShareContet] = useState(false)
    return (
        <div
            id={String(id)}
            className="bg-white rounded-xl p-4 border-gray-200 shadow border max-w-80 max-h-fit relative"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="text-gray-500 flex-shrink-0">
                        <SiYoutube color="#0f0f0f" />
                    </span>
                    <div className="text-gray-700 font-medium truncate">{title}</div>
                    <span className="text-sm text-white bg-purple-700/50 px-3 rounded-full flex-shrink-0">
                        {type}
                    </span>
                </div>
                <div className="flex gap-2 text-gray-500 ml-2 items-center flex-shrink-0 z-50">
                    <button type="button" className="cursor-pointer" onClick={() => setShowShareContet(true)}>
                        {showShareConent ? <ShareContent link={link} open={showShareConent} onClose={() => setShowShareContet(false)} /> : null}
                        <span className="cursor-pointer">
                            <Share size="xl" />
                        </span>
                    </button>
                    <button className="cursor-pointer"
                        type="button"
                        onClick={() => {
                            if (id) handleDelete(id, refreshContent);
                        }}
                    >
                        <Delete size="xl" /> </button>
                </div>
            </div>

            {/* Content */}
            <div className="py-4 pointer-events-none">
                <iframe
                    className="w-full"
                    src={youtubeLinkConversion(link)}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{ border: 0 }}
                ></iframe>
            </div>
        </div>
    );
}

function TweetCard({ title, link, type, id, refreshContent }: CardProps) {
    const tweetId = link.includes("/status/") ? link.split("/status/")[1] : "";
    const isValidTweetId = tweetId.length > 0;
const [showShareConent, setShowShareContet] = useState(false)


    return (
        <div
            id={String(id)}
            data-theme="light"
            className="bg-white rounded-xl p-4 border-gray-200 shadow border max-w-80 max-h-fit"
        >
            {/* Header */}
            <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="text-gray-500">
                        <SiGitter color="#0f0f0f" />
                    </span>
                    <div className="text-gray-700 font-medium truncate">{title}</div>
                    <span className="text-sm text-white bg-purple-700/50 px-3 rounded-full">
                        {type}
                    </span>
                </div>
                <div className="flex gap-2 text-gray-500 ml-2 items-center flex-shrink-0">
                   <button type="button" className="cursor-pointer" onClick={() => setShowShareContet(true)}>
                        {showShareConent ? <ShareContent link={link} open={showShareConent} onClose={() => setShowShareContet(false)} /> : null}
                        <span className="cursor-pointer">
                            <Share size="xl" />
                        </span>
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (id) handleDelete(id, refreshContent);
                        }}
                        className="bg-red-500 text-white text-sm px-2 py-1 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Tweet */}
            <div className="mt-2">
                {isValidTweetId ? (
                    <Tweet id={tweetId} />
                ) : (
                    <div className="text-red-500 text-sm">Invalid Twitter link</div>
                )}
            </div>
        </div>
    );
}

export function Card({ title, link, type, id, refreshContent }: CardProps) {
    return (
        <>
            {type === "twitter" && (
                <TweetCard
                    link={link}
                    type={type}
                    title={title}
                    id={id}
                    refreshContent={refreshContent}
                />
            )}
            {type === "youtube" && (
                <YoutubeCard
                    link={link}
                    type={type}
                    title={title}
                    id={id}
                    refreshContent={refreshContent}
                />
            )}
        </>
    );
}
