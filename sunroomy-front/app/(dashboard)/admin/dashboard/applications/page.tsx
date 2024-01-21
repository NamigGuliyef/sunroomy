"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import ApplicationsTable from "@/components/admin/applicationsTable";
import { ISubProduct } from "@/types/types";
import { Button, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
export default function ApplicationsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subProducts, setSubProducts] = useState<ISubProduct[] | null>(null);
  const [selectedSubProduct, setSelectedSubProduct] = useState<ISubProduct | null>(
    subProducts && subProducts.length > 0 ? subProducts[0] : null
  );

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSubProductId = e.target.value;
    setSelectedSubProduct(subProducts?.find((subproduct) => subproduct._id === selectedSubProductId) || null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subproducts`);
        setSubProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <PageWrapper>
      {isLoading ? <div className="h-screen"><Preloader /></div> : <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
        <h1 className="text-5xl mb-4">Applications data</h1>
        <div className="flex w-full mb-8 justify-between">
          <Button
            as={Link}
            href="/admin/dashboard/applications/new"
            className="mb-4"
            variant="shadow"
            color="primary"
            size="lg"
          >
            New
          </Button>
          {subProducts && (
            <Select
              items={subProducts}
              variant="bordered"
              onChange={handleSelectionChange}
              selectionMode="single"
              placeholder="Select subproduct"
              className="max-w-xs"
              aria-label="Select subproduct"
              value={selectedSubProduct?._id || ''}
            >
              {({ _id, title }) => (
                <SelectItem key={_id} value={_id}>
                  {title}
                </SelectItem>
              )}
            </Select>
          )}
        </div>
        <ApplicationsTable applications={selectedSubProduct?.applicationIds || []} />
      </div>}
    </PageWrapper>
  );
}