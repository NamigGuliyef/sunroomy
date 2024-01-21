// pages/404.js
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui/card";
import { Button } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import LandingLayout from "./(landing)/layout";

const NotFoundPage = () => {
  return (
    <LandingLayout>
      <div className="container mx-auto mb-24 mt-24 max-w-[1280px] px-6">
        <div className="grid grid-cols-1 gap-14">
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl">Oops!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-8 text-2xl">
                The page you&apos;re looking for doesn&apos;t exist.
              </p>
              <Link href="/" className="flex justify-end">
                <Button
                  size="md"
                  className="flex items-center text-xl"
                  color="default"
                  variant="faded"
                >
                  Go Home
                  <ArrowRight
                    className="text-inherit"
                    strokeWidth={"2px"}
                    size={"20px"}
                  />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </LandingLayout>
  );
};

export default NotFoundPage;
