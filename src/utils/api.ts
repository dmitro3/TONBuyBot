import fs from "fs";
import { pipeline } from "stream/promises";
import { errorHandler, log } from "./handlers";
import path from "path";

export async function apiFetcher<T>(
  url: string,
  headers?: Record<string, string>
) {
  const options: RequestInit = {
    headers: {
      ...(headers || {}),
    },
  };

  const response = await fetch(url, options);

  const data = (await response.json()) as T;
  return { response: response.status, data };
}

export async function apiPoster<T>(url: string) {
  const response = await fetch(url, { method: "POST" });
  const data = (await response.json()) as T;
  return { response: response.status, data };
}

export async function downloadFile(url: string, outputPath: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to download file. Status: ${response.status} ${response.statusText}`
      );
    }

    const filePath = path.join(process.cwd(), "public", "gifs", outputPath);
    const fileStream = fs.createWriteStream(filePath);
    const { body } = response;
    if (!body) {
      log("File download body empty");
      return false;
    }

    // @ts-expect-error Body type error
    await pipeline(body, fileStream);
    log(`File downloaded successfully to ${outputPath}`);

    return filePath;
  } catch (error) {
    errorHandler(error);
  }
}
