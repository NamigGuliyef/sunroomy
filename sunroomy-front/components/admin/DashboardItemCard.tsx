import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui/card";
import { Button, Divider } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface DashboardItemCardProps {
  title: string;
  count?: number;
  href: string;
  component?: boolean;
}

const DashboardItemCard: React.FC<DashboardItemCardProps> = ({
  title,
  count,
  href,
  component,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{title}</CardTitle>
        {count ? (
          <CardDescription>
            Total count of {title.toLowerCase()}
          </CardDescription>
        ) : (
          <CardDescription>
            Proceed to edit {title.toLowerCase()}{" "}
            {component ? "component" : "page"}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <p className="text-right text-3xl font-bold">{count}</p>
          <Link href={href}>
            <Button
              size="md"
              className="flex items-center text-xl"
              color="default"
              variant="faded"
            >
              visit
              <ArrowRight
                className="text-inherit"
                strokeWidth={"2px"}
                size={"20px"}
              />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardItemCard;
