import React from "react";

// You can adjust these colors to match your app's palette
const PRIMARY_COLOR = "#6366F1"; // Example: Indigo-500
const BG_COLOR = "#F5F7FF"; // Example: Light background
const CARD_COLOR = "#fff";
const BORDER_COLOR = "#E0E7FF";
const SUCCESS_COLOR = "#22C55E";

interface ShareOption {
    name: string;
    icon: React.ReactNode;
    url: (link: string) => string;
    color: string;
}

const shareOptions: ShareOption[] = [
    {
        name: "WhatsApp",
        icon: (
            <svg width="24" height="24" fill="#25D366" viewBox="0 0 24 24">
                <path d="M12.004 2.003c-5.523 0-10 4.477-10 10 0 1.768.463 3.497 1.341 5.01l-1.409 5.157 5.289-1.389c1.47.803 3.13 1.222 4.779 1.222 5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.182c-1.464 0-2.899-.387-4.142-1.12l-.296-.174-3.142.825.837-3.08-.192-.314c-.797-1.302-1.215-2.797-1.215-4.319 0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8zm4.406-6.009c-.242-.121-1.434-.707-1.655-.788-.222-.081-.384-.121-.545.122-.161.242-.625.788-.767.951-.141.161-.282.182-.524.061-.242-.122-1.022-.376-1.946-1.199-.72-.642-1.207-1.433-1.35-1.675-.141-.242-.015-.373.106-.494.109-.108.242-.282.363-.423.122-.141.162-.242.242-.403.081-.161.04-.303-.02-.424-.061-.121-.545-1.314-.747-1.799-.197-.474-.398-.41-.545-.418l-.463-.008c-.161 0-.424.061-.646.303-.222.242-.848.828-.848 2.018 0 1.19.868 2.341.989 2.504.121.161 1.708 2.609 4.141 3.553.579.199 1.029.317 1.38.406.579.147 1.106.126 1.523.077.465-.055 1.434-.586 1.637-1.152.202-.566.202-1.051.142-1.152-.061-.101-.222-.162-.464-.283z"/>
            </svg>
        ),
        url: (link) => `https://wa.me/?text=${encodeURIComponent(link)}`,
        color: "#25D366",
    },
    {
        name: "Facebook",
        icon: (
            <svg width="24" height="24" fill="#1877F3" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.593 1.325-1.326v-21.349c0-.734-.592-1.326-1.325-1.326z"/>
            </svg>
        ),
        url: (link) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
        color: "#1877F3",
    },
    {
        name: "Twitter",
        icon: (
            <svg width="24" height="24" fill="#1DA1F2" viewBox="0 0 24 24">
                <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482c-4.083-.205-7.697-2.162-10.125-5.134a4.822 4.822 0 0 0-.664 2.475c0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417a9.867 9.867 0 0 1-6.102 2.104c-.396 0-.787-.023-1.175-.069a13.945 13.945 0 0 0 7.548 2.212c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636a9.936 9.936 0 0 0 2.457-2.548z"/>
            </svg>
        ),
        url: (link) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`,
        color: "#1DA1F2",
    },
];

interface ShareContentProps {
    link: string;
    open: boolean;
    onClose: () => void;
}

const ShareContent: React.FC<ShareContentProps> = ({ link, open, onClose }) => {
    const [copied, setCopied] = React.useState(false);

    const handleShare = (option: ShareOption) => {
        window.open(option.url(link), "_blank", "noopener,noreferrer");
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(30, 41, 59, 0.45)" }}
            onClick={onClose}
        >
            <div
                className="relative rounded-3xl shadow-2xl p-7 w-full max-w-md mx-4 animate-fadeIn"
                style={{
                    background: CARD_COLOR,
                    border: `2px solid ${BORDER_COLOR}`,
                    boxShadow: "0 8px 32px 0 rgba(99,102,241,0.15)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2
                    className="text-2xl font-bold mb-6 text-center"
                    style={{ color: PRIMARY_COLOR, letterSpacing: 1 }}
                >
                    Share this content
                </h2>
                <div className="flex flex-col gap-4">
                    <div
                        className="flex items-center bg-gray-50 rounded-xl px-3 py-2 border"
                        style={{
                            borderColor: copied ? SUCCESS_COLOR : BORDER_COLOR,
                            transition: "border-color 0.2s",
                        }}
                    >
                        <span
                            className="truncate text-gray-700 text-sm"
                            style={{ maxWidth: "calc(100% - 44px)" }}
                        >
                            {link}
                        </span>
                        <button
                            className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition"
                            style={{
                                background: copied ? SUCCESS_COLOR : PRIMARY_COLOR,
                                color: "#fff",
                                marginLeft: 12,
                                fontSize: 14,
                                fontWeight: 500,
                                minWidth: 80,
                            }}
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <>
                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 13l4 4L19 7" stroke={CARD_COLOR} />
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="9" y="9" width="8" height="8" rx="2" stroke={CARD_COLOR} />
                                        <rect x="5" y="5" width="8" height="8" rx="2" stroke={CARD_COLOR} />
                                    </svg>
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                    <div className="flex flex-col gap-3 mt-2">
                        {shareOptions.map((option) => (
                            <button
                                key={option.name}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl transition font-semibold text-base"
                                style={{
                                    border: `1.5px solid ${option.color}`,
                                    color: option.color,
                                    background: "transparent",
                                }}
                                onClick={() => handleShare(option)}
                            >
                                <span>{option.icon}</span>
                                <span>{option.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(40px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s cubic-bezier(.4,0,.2,1);
                }
            `}</style>
        </div>
    );
};

export default ShareContent;