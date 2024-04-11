"use client";
import { PageWrapper } from "@/components/PageWrapper";
import SubProdCustomTable from "@/components/admin/subProdCustomTable";
import { ISubProduct, ISubProductCustom } from "@/types/types";
import {
  Button,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const { data: session } = useSession();
  const [subproductCustoms, setSubproductCustoms] = useState<
    null | ISubProductCustom[]
  >(null);
  const [loading, setLoading] = useState(true);
  const [subProducts, setSubProducts] = useState<ISubProduct[] | null>(null);
  const [selectedSubProduct, setSelectedSubProduct] =
    useState<ISubProduct | null>(
      subProducts && subProducts.length > 0 ? subProducts[0] : null,
    );
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user.token) {
          const customResponse = await fetchCustom(session.user.token);
          setSubproductCustoms(customResponse.results);

          const productsResponse = await fetchProducts();
          setSubProducts(productsResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.user.token]);

  const fetchCustom = async (token: any) => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL +
          "/admin/dashboard/subproduct-custom",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      return { results: response.data };
    } catch (error) {
      console.error("Error fetching custom data:", error);
      throw error;
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/subproducts`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };
  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSubProductId = e.target.value;
    setSelectedSubProduct(
      subProducts?.find(
        (subproduct) => subproduct._id === selectedSubProductId,
      ) || null,
    );
    console.log(selectedSubProduct);
  };
  const handleDeleteItem = (productId: string) => {
    const res = axios
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/subproduct-custom/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      )
      .then((response) => {
        router.refresh();
        toast.success("Successfully deleted");
      });
  };
  return (
    <PageWrapper>
      <div className="container mx-auto mt-6 max-w-[1280px] px-6">
        <h1 className="mb-4 text-5xl">Subproduct Custom Combinations data</h1>
        {!loading && (
          <>
            <div className="flex justify-between">
              <Button
                as={Link}
                href="/admin/dashboard/subproduct-custom/new"
                className="mb-4"
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
                  value={subProducts[0]._id || ""}
                >
                  {({ _id, title }) => (
                    <SelectItem key={_id} value={_id}>
                      {title}
                    </SelectItem>
                  )}
                </Select>
              )}
            </div>

            <Table aria-label="Example empty table">
              <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>actions</TableColumn>
              </TableHeader>
              {selectedSubProduct?.customId ? (
                <TableBody>
                  <TableRow key="1">
                    <TableCell className="w-2/3">
                      {selectedSubProduct.customId.title} {selectedSubProduct.customId._id}
                    </TableCell>
                    <TableCell className="flex h-full gap-2 !text-xl">
                      <Button
                        className=""
                        onClick={() =>
                          handleDeleteItem(selectedSubProduct.customId._id)
                        }
                        size="md"
                        color="primary"
                      >
                        Delete
                      </Button>
                      <Link
                        href={
                          "./subproduct-custom/" +
                          selectedSubProduct.customId._id
                        }
                      >
                        <Button className="" size="md" color="primary">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody emptyContent={"Select subproduct first."}>
                  {[]}
                </TableBody>
              )}
            </Table>
          </>
        )}
      </div>
    </PageWrapper>
  );
}
