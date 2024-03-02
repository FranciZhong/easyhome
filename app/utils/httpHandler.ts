import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { toast } from "react-toastify";

// todo encapsulate success/error response

export interface ResponseData {
  success: boolean;
  message?: string;
  data?: any;
}

export async function catchServerError(
  req: NextRequest,
  handleRequest: (req: NextRequest) => Promise<NextResponse<unknown>>,
) {
  try {
    // todo logging request
    return await handleRequest(req);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong in server.",
      },
      {
        status: HttpStatusCode.InternalServerError,
      },
    );
  }
}

export async function catchClientError(
  clientAction: () => Promise<AxiosResponse>,
  onSuccess: (data: ResponseData) => void,
  onError: (err: AxiosError) => void,
  callback: () => void,
) {
  try {
    const res = await clientAction();
    onSuccess(res.data);
  } catch (err) {
    console.error(JSON.stringify(err));
    if (err instanceof AxiosError) {
      toast.error(err?.response?.data?.message || "No response.");
      onError && onError(err);
    } else {
      toast.error("Request failed.");
    }
  } finally {
    callback();
  }
}
