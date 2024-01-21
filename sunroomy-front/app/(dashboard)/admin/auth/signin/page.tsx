import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui/card";
import SignInForm from "@/components/admin/views/auth/SignInForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession();
  if (session) redirect("/admin/dashboard");
  return (
    <div className="container  h-[75vh] flex items-center w-full mt-6 mx-auto px-6 max-w-[1280px]">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-normal mb-4">
            Sign In to get access to all pages
          </CardTitle>
          <CardDescription className="text-md">
            You can log in with various sign-in options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
