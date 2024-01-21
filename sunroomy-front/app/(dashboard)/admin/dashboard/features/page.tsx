"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import FeaturesTable from "@/components/admin/featuresTable";
import { ISubProductFeature } from "@/types/types";
import { Button, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeaturesPage() {
  const { data: session } = useSession();
  const [features, setFeatures] = useState<ISubProductFeature[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState("projectId");
  useEffect(() => {
    setIsLoading(true);
    const fetchFeatures = async (token: any) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/features/`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setIsLoading(false);
        setFeatures(response.data);
      } catch (error) {
        console.error("Error fetching subproducts:", error);
      }
    };

    if (session?.user.token) {
      fetchFeatures(session?.user.token);
    }
  }, [session?.user.token]);

  const handleSelectionChange = (event: any) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };
  const filteredFeatures = features?.filter((feature: ISubProductFeature) => {
    if (selected === "projectId") {
      return !feature.icon;
    } else if (selected === "subProductId") {
      return !!feature.icon;
    }
    return true; 
  });
  console.log(filteredFeatures);
  return (
    <>
      {isLoading ? (
        <div className="h-screen">
          <Preloader />
        </div>
      ) : (
        <PageWrapper>
          <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
            <h1 className="text-5xl mb-4">Features data</h1>
            <div className="flex justify-between">
              <Button
                as={Link}
                href="/admin/dashboard/features/new"
                className="mb-4"
                color="primary"
                size="lg"
              >
                New
              </Button>
              <Select
                variant="bordered"
                onChange={handleSelectionChange}
                selectionMode="single"
                placeholder="Feature type"
                className="max-w-xs"
                aria-label="Feature type"
              >
                <SelectItem key={"projectId"} value={"projectId"}>
                  Project
                </SelectItem>
                <SelectItem key={"subProductId"} value={"subProductId"}>
                  Subproduct
                </SelectItem>
              </Select>
            </div>
            <FeaturesTable features={filteredFeatures!} />
          </div>
        </PageWrapper>
      )}
    </>
  );
}
