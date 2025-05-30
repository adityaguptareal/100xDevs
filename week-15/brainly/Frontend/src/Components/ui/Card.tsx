import { Tweet } from "react-tweet";
import { Delete } from "./Icons/Delete";
import { Share } from "./Icons/Share";
import { SiGitter, SiYoutube } from "react-icons/si";
import axios from "axios";
import toast from "react-hot-toast";
import ShareContent from "./ShareContent";
import { useState } from "react";
import { Trash } from "lucide-react";

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
            className="bg-white rounded-xl p-4 border-gray-200 shadow border w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-fit relative"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2">
            <div className="flex items-center gap-2 min-w-0 w-full">
                <span className="text-gray-500 flex-shrink-0">
                <SiYoutube color="#0f0f0f" />
                </span>
                <div className="text-gray-700 font-medium truncate flex-1">{title}</div>
                <span className="text-sm text-white bg-purple-700/70 px-3 rounded-full flex-shrink-0">
                {type}
                </span>
            </div>
            <div className="flex gap-2 text-gray-500 mt-2 sm:mt-0 ml-0 sm:ml-2 items-center flex-shrink-0 ">
                <button type="button" className="cursor-pointer" onClick={() => setShowShareContet(true)}>
                {showShareConent ? <ShareContent link={link} open={showShareConent} onClose={() => setShowShareContet(false)} /> : null}
                <span className="cursor-pointer">
                    <Share size="md" />
                </span>
                </button>
                 <button
                type="button"
                onClick={() => {
                    if (id) handleDelete(id, refreshContent);
                }}
                className="cursor-pointer"
                >
                <Trash size={18} />
                </button>
            </div>
            </div>

            {/* Content */}
            <div className="py-4 pointer-events-none">
            <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                className="w-full h-full rounded-lg"
                src={youtubeLinkConversion(link)}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ border: 0 }}
                ></iframe>
            </div>
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
            className="bg-white rounded-xl p-4 border-gray-200 shadow border max-w-full sm:max-w-96 w-full max-h-fit"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-2">
            <div className="flex items-center gap-2 min-w-0 w-full">
                <span className="text-gray-500 flex-shrink-0">
                <SiGitter color="#0f0f0f" />
                </span>
                <div className="text-gray-700 font-medium truncate flex-1">{title}</div>
                <span className="text-sm text-white bg-purple-700/70 px-3 rounded-full flex-shrink-0">
                {type}
                </span>
            </div>
            <div className="flex gap-2 text-gray-500 mt-2 sm:mt-0 ml-0 sm:ml-2 items-center flex-shrink-0">
                <button type="button" className="cursor-pointer" onClick={() => setShowShareContet(true)}>
                {showShareConent ? <ShareContent link={link} open={showShareConent} onClose={() => setShowShareContet(false)} /> : null}
                <span className="cursor-pointer">
                    <Share size="md" />
                </span>
                </button>
                <button
                type="button"
                onClick={() => {
                    if (id) handleDelete(id, refreshContent);
                }}
                className="cursor-pointer"
                >
                <Trash size={18} />
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
