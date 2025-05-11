import { Button } from "./Button";
import { useForm } from "react-hook-form";
import { Cross } from "./Icons/Cross";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

export function CreateContentModel({ setModalopen, refreshContent }: { setModalopen: (value: boolean) => void, refreshContent: () => void }) {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors},
    } = useForm();

    interface contentPostData{
        title:String;
        link:String;
        type:String
    }

    const onSubmit = (data: any) => {
        const { contentType, link, title } = data;

        // Validate Twitter links
        if (contentType === "twitter" && (!link.includes("/status/") || link.split("/status/")[1].trim() === "")) {
            toast.error("Invalid Twitter link. Please provide a valid link with a status ID.");
            return;
        }

        const contentData: contentPostData = {
            title: title,
            link: link,
            type: contentType,
        };

        setLoading(true);
        toast.promise(
            axios
                .post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`, contentData, {
                    headers: { Authorization: localStorage.getItem("SecondBrainToken") },
                })
                .then((response) => {
                    toast.success(response.data?.message || "Content Added");
                })
                .catch((error) => {
                    toast.error(error?.message || "Unexpected Error");
                }),
            {
                loading: "Adding Content",
            }
        ).finally(() => {
            setLoading(false);
            setModalopen(false);
            refreshContent();
        });
    };

    return (
        <div className="bg-black/75 w-screen backdrop-blur-sm fixed text-white h-screen inset-0 flex justify-center items-center">
            <div className="bg-white rounded-lg py-6 px-7 border-gray-200 shadow border relative min-w-96 max-w-md max-h-fit">
                <span onClick={() => setModalopen(false)} className="absolute cursor-pointer right-2 top-3">
                    <Cross size="size-8" />
                </span>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-2xl font-semibold py-2 text-gray-800">Add Content to <br />Your Brain</h1>
                    <div className="flex flex-col gap-4 text-gray-700 mt-4">
                        <div className="flex flex-col gap-4">
                            <label htmlFor="title" className="text-gray-700 font-semibold">Content Title</label>
                            <input
                                type="text"
                                id="title"
                                className="border-2 outline-none border-gray-300 rounded p-2"
                                placeholder="Enter title"
                                {...register("title", {
                                    required: "Content title is required",
                                    minLength: { value: 5, message: "Minimum 5 characters long" }
                                })}
                            />
                            {errors.title && <span className="text-sm text-red-500">{errors.title.message as string}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="contentType" className="text-gray-700 font-semibold">Content Type</label>
                            <select
                                {...register("contentType", { required: "Type is required" })}
                                className="border border-gray-300 rounded outline-none text-gray-700 p-2"
                                id="contentType"
                            >
                                <option value="youtube">Youtube</option>
                                <option value="twitter">Twitter</option>
                                <option value="web">Web</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.contentType && <span className="text-sm text-red-500">{errors.contentType.message as string}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="link" className="text-gray-700 font-semibold">Link</label>
                            <input
                                type="text"
                                id="link"
                                className="border outline-none border-gray-300 rounded p-2"
                                placeholder="Enter link"
                                {...register("link", {
                                    required: "Link is required",
                                    minLength: { value: 6, message: "Link must be at least 6 characters" }
                                })}
                            />
                            {errors.link && <span className="text-sm text-red-500">{errors.link.message as string}</span>}
                        </div>
                        <div className="flex justify-center items-center mt-2">
                            <Button
                                variant="primary"
                                size="medium"
                                text={loading ? "Content Adding..." : "Add Content"}
                                type="submit"
                                disabled={loading ? true:false} // important for form to recognize this as a submit button
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
