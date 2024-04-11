"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import Helper from "@/components/admin/helper";
import SubProductsTable from "@/components/admin/subProductsTable";
import { IProduct, ISubProduct } from "@/types/types";
import { Button, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

export default function SubproductsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let selectedProductId = e.target.value;
    if (products) {
      let foundProduct = products.find(
        (product) => product._id === selectedProductId,
      );
      setSelectedProduct(foundProduct || null);
    } else {
      setSelectedProduct(null);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await axios
          .get(process.env.NEXT_PUBLIC_BACKEND_URL + "/products")
          .then((res) => {
            setIsLoading(false);
            return res;
          });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    };
    fetchProducts();
  }, []);
  return (
    <PageWrapper>
      {isLoading ? (
        <div className="h-screen">
          <Preloader />
        </div>
      ) : (
        <div className="container mx-auto mt-6 flex max-w-[1280px] flex-col items-start gap-6 px-6">
          <h1 className="mb-4 text-5xl">Subproducts data</h1>
          <div className="mb-8 flex w-full justify-between">
            <Button
              as={Link}
              href="/admin/dashboard/subproducts/new"
              className="mb-4"
              variant="shadow"
              color="primary"
              size="lg"
            >
              New
            </Button>
            {products && (
              <Select
                items={products}
                variant="bordered"
                onChange={handleSelectionChange}
                selectionMode="single"
                placeholder="Select subproduct"
                className="max-w-xs"
                aria-label="Select subproduct"
              >
                {(product) => (
                  <SelectItem key={product._id} value={product._id}>
                    {product.title}
                  </SelectItem>
                )}
              </Select>
            )}
          </div>
          <SubProductsTable subproducts={selectedProduct?.subProductIds!} />
          <div className="flex w-full justify-between gap-6">
            <Helper
              cardClass="w-1/3"
              link="/admin/dashboard/subproduct-custom"
              title="Subproduct custom"
              text={
                <p>
                  After creating subproduct, you should go to{" "}
                  <span className="font-medium underline">
                    Create Subproduct custom page
                  </span>{" "}
                  {/* and create it, then you need to come back to this page and add
                  it to your product via{" "} */}
                  {/* <span className="font-medium underline">Edit button</span> */}
                </p>
              }
            />
            <Helper
              cardClass="w-1/3"
              link="/admin/dashboard/subproduct-placement"
              title="Placement"
              text={
                <p>
                  After creating subproduct, you should go to{" "}
                  <span className="font-medium underline">
                    Create Subproduct Placement page
                  </span>{" "}
                  {/* and create it, then you need to come back to this page and add
                it to your product via{" "} */}
                  {/* <span className="font-medium underline">Edit button</span> */}
                </p>
              }
            />
            <Helper
              cardClass="w-1/3"
              link="/admin/dashboard/specifications/new"
              title="Specifications"
              text={
                <p>
                  After creating subproduct, you should go to{" "}
                  <span className="font-medium underline">
                    Create specification page
                  </span>{" "}
                  and create it, then you need to come back to this page and add
                  it to your product via{" "}
                  <span className="font-medium underline">Edit button</span>
                </p>
              }
            />
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
