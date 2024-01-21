"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import Helper from "@/components/admin/helper";
import SpecificationsTable from "@/components/admin/specificationsTable";
import { ISubProduct, ISubProductSpecification } from "@/types/types";
import { Button, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SpecsPage() {
  const { data: session } = useSession();
  const [specs, setSpecs] = useState<ISubProductSpecification[] | null>(null);
  const [subproducts, setSubproducts] = useState<ISubProduct[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSubproduct, setSelectedSubproduct] =
    useState<ISubProduct | null>(null);
  const [filteredSpecs, setFilteredSpecs] = useState<
    ISubProductSpecification[] | null
  >(null);

  useEffect(() => {
    const fetchSubproducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/subproducts/`
        );
        setSubproducts(response.data);
      } catch (error) {
        console.error("Error fetching subproducts:", error);
      }
    };

    if (session?.user.token) {
      fetchSubproducts();
    }
  }, [session?.user.token]);

  const handleSelectionChange = (e: any) => {
    const selectedSubproductId = e.target.value;
    setSelectedSubproduct(
      subproducts?.find(
        (subproduct) => subproduct._id === selectedSubproductId
      ) || null
    );
  };

  useEffect(() => {
    const fetchSpecs = async (token: any) => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            "/admin/dashboard/specifications",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setSpecs(response.data);
      } catch (error) {
        console.error("Error fetching specifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user.token) {
      fetchSpecs(session?.user.token);
    }
  }, [session?.user.token]);

  useEffect(() => {
    if (selectedSubproduct && specs) {
      const filtered = specs.filter(
        (spec) => spec.subProductId === selectedSubproduct._id
      );
      setFilteredSpecs(filtered);
    }
  }, [selectedSubproduct, specs]);

  return (
    <PageWrapper>
      <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
        <h1 className="text-5xl mb-4">Specifications data</h1>

        {isLoading ? (
          <div className="h-screen">
            <Preloader />
          </div>
        ) : (
          <>
            {subproducts && (
              <div className="flex mb-8 justify-between">
                <Button
                  as={Link}
                  href="/admin/dashboard/specifications/new"
                  className="mb-4"
                  color="primary"
                  size="lg"
                >
                  New
                </Button>
                <Select
                  items={subproducts}
                  variant="bordered"
                  onChange={handleSelectionChange}
                  selectionMode="single"
                  placeholder="Select subproduct"
                  className="max-w-xs"
                  aria-label="Select subproduct"
                >
                  {(subproduct) => (
                    <SelectItem key={subproduct._id} value={subproduct._id}>
                      {subproduct.title}
                    </SelectItem>
                  )}
                </Select>
              </div>
            )}
            <SpecificationsTable specifications={filteredSpecs!} />
          </>
        )}
        <div className="flex w-full mt-12 gap-6 justify-center">
          <Helper
            cardClass="w-1/2"
            link="/admin/dashboard/subproducts"
            title="Subproducts"
            text={
              <p>
                After creating specs, you should go to{" "}
                <span className="font-medium underline">
                  Edit subproducts page
                </span>{" "}
                and create it, then you need to come back to this page and add
                it to your subproduct via{" "}
                <span className="font-medium underline">Edit button</span>
              </p>
            }
          />
        </div>
      </div>
    </PageWrapper>
  );
}
