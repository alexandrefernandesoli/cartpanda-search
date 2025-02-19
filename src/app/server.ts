import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setAuthCookies(formData: FormData) {
  "use server";

  // Extract form data
  const slug = formData.get("slug") as string;
  const token = formData.get("token") as string;

  // Validate inputs (basic example)
  if (!slug || !token) {
    throw new Error("Missing required fields");
  }

  const c = await cookies();

  // Set cookies with secure options
  c.set("slug", slug, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  c.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Optional: Redirect after setting cookies
  redirect(`/products`);
}
