"use client";

import React, { useEffect, useState } from "react";
import UploadLayout from "../layouts/UploadLayout";
import { BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/user";
import { UploadError } from "../types";
import { useCreatePost } from "../hooks/posts/index";
import useKeyPress from "../hooks/useKeyPress";

export default function Upload() {
  const contextUser = useUser();
  const router = useRouter();

  let [fileDisplay, setFileDisplay] = useState<string>("");
  let [caption, setCaption] = useState<string>("");
  let [catalystLink, setCatalystLink] = useState<string>("");
  let [twitterLink, setTwitterLink] = useState<string>("");
  let [file, setFile] = useState<File | null>(null);
  let [error, setError] = useState<UploadError | null>(null);
  let [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (!contextUser?.user) router.push("/");
  }, [contextUser]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setError(null);
      const file = files[0];
      const fileSizeInGB = file.size / (1024 * 1024 * 1024); // Convert size to GB

      if (fileSizeInGB > 2) {
        setError({
          type: "File",
          message: "The video size should not exceed 2 GB",
        });
        return;
      }

      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        if (video.duration > 99) {
          setError({
            type: "File",
            message: "The video duration should not exceed to 99 seconds",
          });
          URL.revokeObjectURL(fileDisplay);
          setFileDisplay("");
          setFile(null); 
        } else {
          const fileUrl = URL.createObjectURL(file);
          setFileDisplay(fileUrl);
          setFile(file);
        }
      };
      video.src = URL.createObjectURL(file);

      // const fileUrl = URL.createObjectURL(file);
      // setFileDisplay(fileUrl);
      // setFile(file);
    }
  };

  const discard = () => {
    setFileDisplay("");
    setFile(null);
    setCaption("");
    router.refresh();
  };

  const clearVideo = () => {
    setFileDisplay("");
    setFile(null);
  };

  const validate = () => {
    let catalyst_expression =
      /\bhttps?:\/\/(?:[a-zA-Z0-9-]+\.)?cardano\.ideascale\.com(?:\/\S*)?\b/;
    let twitter_expression =
      /^(https?:\/\/)?([\w-]+\.)?(x\.com|twitter\.com)(\/\S*)?$/;

    setError(null);
    let isError = false;
    if (!catalyst_expression.test(catalystLink)) {
      setError({
        type: "catalystLink",
        message: "Invalid Catalyst Proposal Link !!",
      });
      isError = true;
    }
    if (!twitter_expression.test(twitterLink)) {
      setError({ type: "twitterLink", message: "Invalid Twitter Link !!" });
      isError = true;
    }

    if (!file) {
      setError({ type: "File", message: "A video is required" });
      isError = true;
    } else if (!caption) {
      setError({ type: "caption", message: "A caption is required" });
      isError = true;
    } else if (!catalystLink) {
      setError({
        type: "catalystLink",
        message: "A catalyst link is required",
      });
      isError = true;
    } else if (!twitterLink) {
      setError({ type: "twitterLink", message: "A twitter link is required" });
      isError = true;
    }
    return isError;
  };

    const createNewPost = async () => {
        setError(null);
        let isError = validate();
        if (isError) {setIsUploading(false); return;};
        if (!file || !contextUser?.user) {setIsUploading(false); return;};
        
        setIsUploading(true);

        try {
            await useCreatePost(file, contextUser?.user?.id, caption, catalystLink, twitterLink);
            router.push(`/profile/${contextUser?.user?.id}`);
            setIsUploading(false);
        } catch (error) {
            console.log(error);
            setIsUploading(false);
            // alert(error);
        }
    };

  useKeyPress(createNewPost, "Enter");

  return (
    <>
      <UploadLayout>
        <div className="w-full mt-[40px] mb-[40px] bg-[#121316] shadow-lg rounded-xl py-6 md:px-10 px-4">
          <div>
            <h1 className="text-[23px] font-semibold font-offbit-101-bold tracking-wider">
              Upload video
            </h1>
            <h2 className="text-gray-400 font-helvetica-light leading-[1] mt-1">
              Post a video to your account
            </h2>
          </div>

          <div className="mt-8 md:flex gap-6 font-neue-regular">
            {!fileDisplay ? (
              <label
                htmlFor="fileInput"
                className="
                                    md:mx-0
                                    mx-auto
                                    mt-4
                                    mb-6
                                    flex 
                                    flex-col 
                                    items-center 
                                    justify-center 
                                    w-full 
                                    max-w-[260px] 
                                    h-[470px] 
                                    text-center 
                                    p-3 
                                    border-2 
                                    border-dashed 
                                    border-gray-300 
                                    rounded-lg 
                                    hover:bg-white/10 
                                    cursor-pointer
                                "
                            >
                                <BiSolidCloudUpload size="40" color="#b3b3b1" />
                                <p className="mt-4 text-[17px]">Select video to upload</p>
                                <p className="mt-1.5 text-gray-500 text-[13px]">
                                    Or drag and drop a file
                                </p>
                                <p className="mt-12 text-gray-400 text-sm">MP4</p>
                                <p className="mt-2 text-gray-400 text-[13px]">
                                    Up to 99 seconds
                                </p>
                                <p className="mt-2 text-gray-400 text-[13px]">Less than 100 MB</p>
                                <label
                                    htmlFor="fileInput"
                                    className="px-2 py-1.5 mt-8 text-black text-[15px] w-[80%] bg-[#fff] rounded-sm cursor-pointer"
                                >
                                    Select file
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    onChange={onChange}
                                    hidden
                                    accept=".mp4"
                                />
                            </label>
                        ) : (
                            <div
                                className="
                                    md:mx-0
                                    mx-auto
                                    mt-4
                                    md:mb-12
                                    mb-16
                                    flex 
                                    items-center 
                                    justify-center 
                                    w-full 
                                    max-w-[260px] 
                                    h-[540px] 
                                    p-3 
                                    rounded-2xl
                                    cursor-pointer
                                    relative
                                "
              >
                {isUploading ? (
                  <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
                    <div className="mx-auto flex items-center justify-center gap-1">
                      <BiLoaderCircle
                        className="animate-spin"
                        color="#F12B56"
                        size={30}
                      />
                      <div className="text-white font-bold">Uploading...</div>
                    </div>
                  </div>
                ) : null}

                <img
                  className="absolute z-20 pointer-events-none"
                  src="/images/mobile-case.png"
                />
                <video
                  autoPlay
                  loop
                  muted
                  className="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
                  src={fileDisplay}
                />

                <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300">
                  <div className="flex items-center truncate">
                    <AiOutlineCheckCircle size="16" className="min-w-[16px]" />
                    <p className="text-[11px] pl-1 truncate text-ellipsis">
                      {File.name}
                    </p>
                  </div>
                  <button
                    onClick={() => clearVideo()}
                    className="text-[11px] ml-2 font-semibold"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 mb-6 w-full">
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="mb-1 text-[15px]">Caption</div>
                  <div className="text-gray-400 text-[12px]">
                    {caption.length}/150
                  </div>
                </div>
                <input
                  maxLength={150}
                  type="text"
                  placeholder="Write your caption here ..."
                  className="
                                        w-full
                                        border
                                        bg-[#121316]
                                        p-2.5
                                        rounded-md
                                        focus:outline-none
                                        placeholder:opacity-50
                                    "
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                />
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between ">
                  <div className="mb-1 text-[15px]">Catalyst proposal link</div>
                </div>
                <input
                  maxLength={150}
                  type="text"
                  placeholder="Write your Catalyst proposal link..."
                  className="
                                        w-full
                                        border
                                        bg-[#121316]
                                        p-2.5
                                        rounded-md
                                        focus:outline-none
                                        placeholder:opacity-50
                                    "
                  value={catalystLink}
                  onChange={(event) => setCatalystLink(event.target.value)}
                  required
                />
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="mb-1 text-[15px]">Twitter Link</div>
                </div>
                <input
                  maxLength={150}
                  type="text"
                  placeholder="Write your twitter link here ..."
                  className="
                                        w-full
                                        border
                                        bg-[#121316]
                                        p-2.5
                                        rounded-md
                                        focus:outline-none
                                        placeholder:opacity-50
                                    "
                  value={twitterLink}
                  onChange={(event) => setTwitterLink(event.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  disabled={isUploading}
                  onClick={() => discard()}
                  className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-white/10 rounded-sm font-offbit-101-bold tracking-widest"
                  style={{ fontVariant: "small-caps" }}
                >
                  Discard
                </button>
                <button
                  disabled={isUploading}
                  onClick={() => createNewPost()}
                  className="px-10 py-2.5 mt-8 border text-[16px] text-black bg-[#Fff] rounded-sm font-offbit-101-bold tracking-widest"
                  style={{ fontVariant: "small-caps" }}
                >
                  {isUploading ? (
                    <BiLoaderCircle
                      className="animate-spin"
                      color="#ffffff"
                      size={25}
                    />
                  ) : (
                    "Post"
                  )}
                </button>
              </div>

              {error ? (
                <div className="text-red-600 mt-4">{error.message}</div>
              ) : null}
            </div>
          </div>
        </div>
      </UploadLayout>
    </>
  );
}
