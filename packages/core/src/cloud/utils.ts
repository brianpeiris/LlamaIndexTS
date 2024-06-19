import * as LlamaCloud from "@llamaindex/cloud";
import { OpenAPI } from "@llamaindex/cloud";
import { getEnv } from "@llamaindex/env";
import type { ClientParams } from "./types.js";
import { DEFAULT_BASE_URL } from "./types.js";

function getBaseUrl(baseUrl?: string): string {
  return baseUrl ?? getEnv("LLAMA_CLOUD_BASE_URL") ?? DEFAULT_BASE_URL;
}

export function getAppBaseUrl(baseUrl?: string): string {
  return getBaseUrl(baseUrl).replace(/api\./, "");
}

export function getClient({
  apiKey,
  baseUrl,
}: ClientParams = {}): typeof LlamaCloud {
  // Get the environment variables or use defaults
  baseUrl = getBaseUrl(baseUrl);
  apiKey = apiKey ?? getEnv("LLAMA_CLOUD_API_KEY");

  if (!apiKey) {
    throw new Error(
      "API Key is required for LlamaCloudIndex. Please pass the apiKey parameter",
    );
  }

  if (baseUrl) {
    OpenAPI.BASE = baseUrl;
  }

  if (!OpenAPI.HEADERS) OpenAPI.HEADERS = {};

  Object.assign(OpenAPI.HEADERS, {
    Authorization: `Bearer ${apiKey}`,
  });

  console.log({
    baseUrl: OpenAPI.BASE,
    headers: OpenAPI.HEADERS,
  });

  return LlamaCloud;
}
