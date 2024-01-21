"use client";
import {
  IApplications,
  INeeds,
  IProductApplication,
  IProjectNeed,
  IUsedProduct,
  IUsedProducts,
} from "@/types/types";
import {
  Button,
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
import toast from "react-hot-toast";

const columns = [
  {
    key: "title",
    label: "TITLE",
  },

  {
    key: "actions",
    label: "ACTIONS",
  },
];

function UsedProductsTable({ usedProducts }: IUsedProducts) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleDeleteUsedProducts = (id: string) => {
    const res = axios
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/usedproducts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      )
      .then((response) => {
        router.refresh();
        toast.success("Successfully deleted product");
      });
  };
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody>
        {usedProducts?.map((item: IUsedProduct, idx: number) => (
          <TableRow className="" key={idx}>
            <TableCell className="!text-2xl w-full">{item.title}</TableCell>
            <TableCell className="!text-xl flex gap-2 h-full">
              <Button
                className=""
                onClick={() => handleDeleteUsedProducts(item._id)}
                size="md"
                color="primary"
              >
                Delete
              </Button>
              <Link href={"./usedproducts/" + item._id}>
                <Button className="" size="md" color="primary">
                  Edit
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default UsedProductsTable;
