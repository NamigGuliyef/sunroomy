import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: [
    // "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
    "/admin/:path*",
  ],
};
export default withAuth({
  pages: {
    signIn: "/admin/auth/signin",
  },
});
