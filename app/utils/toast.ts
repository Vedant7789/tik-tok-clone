import { toast } from "react-toastify";

export const success = (content: string) => toast.success(content, {toastId: content})

export const error = (content: string) => toast.error(content, {toastId: content})