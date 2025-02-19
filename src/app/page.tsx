import { setAuthCookies } from "./server";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Set Auth Cookies
        </h2>
        <form action={setAuthCookies} className="space-y-6">
          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              User Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              placeholder="Enter user slug"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
            />
          </div>
          <div>
            <label
              htmlFor="token"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Authentication Token
            </label>
            <input
              type="text"
              id="token"
              name="token"
              required
              placeholder="Enter auth token"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Set Cookies
          </button>
        </form>
      </div>
    </div>
  );
}

// // Optional: Middleware for cookie protection (in middleware.ts)
// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("auth-token");
//   const slug = request.cookies.get("user-slug");

//   // Example of protected route logic
//   if (!token || !slug) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*"],
// };
