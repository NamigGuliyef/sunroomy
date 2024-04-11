import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui/card";
import { Button } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";

const DashboardNotFoundPage = () => {
  return (
    <div className="container mx-auto mt-6 max-w-[1280px] px-6">
      <h1 className="mb-5 text-3xl md:mb-14">Dashboard Page Not Found</h1>
      <div className="grid grid-cols-1 gap-14">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">Oops!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-8 text-2xl">
              The dashboard page you&apos;re looking for doesn&apos;t exist.
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
  );
};

export default DashboardNotFoundPage;
