import { isImageUrl, isValidUrl } from "@/lib/utils";

export function validateUsername(name: string): string | null {
  if (name.length < 4 || name.length > 24) {
    return "Name must be between 4 and 24 characters";
  }

  return null;
}

export function validateImageUrl(url: string): string | null {
  if (url === "") {
    return null;
  }

  if (!isValidUrl(url)) {
    return "Invalid URL";
  }

  if (!isImageUrl(url)) {
    return "URL must point to an image (jpg, png, etc.)";
  }

  return null;
}
