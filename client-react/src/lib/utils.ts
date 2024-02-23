import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// extract error message
export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  let message = " some thing when wrong ";
  if (error) {
    if ("status" in error) {
      message =
        "error" in error
          ? error.error
          : JSON.stringify(error.data).substring(
              JSON.stringify(error.data).indexOf('"message":"') +
                '"message":"'.length,
              JSON.stringify(error.data).indexOf(
                '"',
                JSON.stringify(error.data).indexOf('"message":"') +
                  '"message":"'.length
              )
            );
    } else {
      message = error?.message ? error.message : "Some thing when wrong ";
    }
  }
  return message;
};
