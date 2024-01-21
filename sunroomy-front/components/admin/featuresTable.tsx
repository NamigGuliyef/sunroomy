"use client";
import {
  IProducts,
  ISubProductFeature,
  ISubProductFeatures,
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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const columns = [
  {
    key: "title",
    label: "TITLE",
  },
  {
    key: "image",
    label: "IMAGE",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

function FeaturesTable({ features }: ISubProductFeatures) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleDeleteProduct = (id: string) => {
    const res = axios
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/features/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      )
      .then((response) => {
        router.refresh();
        router.push('./features');
        toast.success("Successfully deleted product");
      });
  };
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody>
        {features?.map((item: ISubProductFeature, idx: number) => (
          <TableRow className="" key={idx}>
            <TableCell className="!text-2xl w-full">{item.title}</TableCell>
            <TableCell className="!text-2xl w-[150%]">
              {item.icon ? (
                <Image alt="" width={150} height={150} src={item.icon} />
              ) : (
                <h1>No Icons in Project Feature</h1>
              )}
            </TableCell>
            <TableCell className="!text-xl flex gap-2 h-full">
              <Button
                className=""
                onClick={() => handleDeleteProduct(item._id)}
                size="md"
                color="primary"
              >
                Delete
              </Button>
              <Link href={"./features/" + item._id}>
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

export default FeaturesTable;
