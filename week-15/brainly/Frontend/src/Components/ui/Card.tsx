import { Delete } from "./Icons/Delete";
import { Document } from "./Icons/Document";
import { Share } from "./Icons/Share";
import { useEffect, useRef } from "react";

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter"
}
function youtubeLinkConversion(link: string) {
    if (link.includes("watch?v=")) {
        return link.replace("watch?v=", "embed/");
    } else if (link.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${link.split("https://youtu.be/")[1]}`;
    }
    return link; 
}

function twitterLinkConversion(link:string) {
        // Handle Twitter/X.com embedding errors
        if (link.includes('twitter.com') || link.includes('x.com')) {
            // Convert x.com to twitter.com
            const twitterLink = link.replace('x.com', 'twitter.com');
            // Add oembed endpoint to fetch embeddable content
            return `https://publish.twitter.com/oembed?url=${encodeURIComponent(twitterLink)}`;
        }
        return link;
}

export function Card({ title, link, type }: CardProps) {
    const twitterRef = useRef<HTMLDivElement>(null);
useEffect(() => {
    // Load Twitter widgets when component mounts and type is twitter
    if (type === "twitter" && twitterRef.current) {
        const loadTwitterWidget = () => {
            if (window.twttr) {
                window.twttr.widgets.load(twitterRef.current || undefined);
                return true;
            }
            return false;
        };

        // Try to load immediately first
        if (!loadTwitterWidget()) {
            // If not loaded yet, wait for it
            const interval = setInterval(() => {
                if (loadTwitterWidget()) {
                    clearInterval(interval);
                }
            }, 100);

            // Clear interval on component unmount
            return () => clearInterval(interval);
        }
    }
}, [type]);
            }
        }
    }, [link, type]);
    
    console.log("Converted YouTube Link:", youtubeLinkConversion(link));
    console.log("Twitter Link:", link.replace("x.com", "twitter.com"));
    return (
        <div className="bg-white rounded-xl  p-4 border-gray-200 shadow border max-w-80 max-h-fit">


            {/* Header */}

            <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-2 ">
                    <span className="text-gray-500"><Document size="md" /></span>
                    <div className=" text-gray-700 font-medium">{title}</div>
                </div>
                <div className="flex gap-4 text-gray-500">
                    <span className="cursor-pointer"><Share size="md" /></span> <span className="cursor-pointer"><Delete size="md" /></span>
                </div>

            </div>
            {/* Content */}
            <div className="py-4">

                
                {type === "youtube" && <iframe className="w-full" src={youtubeLinkConversion(link)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
                }
                {type === "twitter" && 
                    <div ref={twitterRef}>
                        <blockquote className="twitter-tweet">
                            <a href={link.replace('x.com', 'twitter.com')}>{title}</a>
                        </blockquote>
                    </div>
                }

            </div>
        </div>
    )
}