import { clsx, type ClassValue } from "clsx";
import { error } from "console";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatErrors(error: any) {
  console.log(error.name, error.code);
  if (error.name === "ZodError") {
    // Handle zod error
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    const field = error.meta?.target ? error.meta?.target[0] : "Field";

    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

export function getAvatarInitials(name: string): string {
  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    // Jedna reč — uzmi prva 2 slova
    return words[0].slice(0, 2).toUpperCase();
  }

  // Dve reči — uzmi prvo slovo prve i prvo slovo druge
  return (words[0][0] + words[1][0]).toUpperCase();
}

export const formatResponse = <T>(returnData: {
  success: boolean;
  message: string;
  data?: T;
}) => returnData;

export const formatSuccess = <T>(message: string, data?: T) =>
  formatResponse({
    success: true,
    message,
    data,
  });

export const formatError = <T = null>(err: any, data?: T) =>
  formatResponse({
    success: false,
    message: formatErrors(err),
    data,
  });
