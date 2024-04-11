"use client";
import { INeeds, IProjectNeed, ISubProductCustom } from "@/types/types";
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

function SubProdCustomTable({ customs }: { customs: ISubProductCustom[] }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleDeleteItem = (productId: string) => {
    const res = axios
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/projectneeds/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      )
      .then((response) => {
        router.refresh();
        toast.success("Successfully deleted need");
      });
  };
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody>
        {customs?.map((item: ISubProductCustom, idx: number) => (
          <TableRow className="" key={idx}>
            <TableCell className="w-full !text-2xl">{item.title}</TableCell>
            <TableCell className="flex h-full gap-2 !text-xl">
              <Button
                className=""
                onClick={() => handleDeleteItem(item._id)}
                size="md"
                color="primary"
              >
                Delete
              </Button>
              <Link href={"./subproduct-custom/" + item._id}>
                <Button className="" size="md" color="primary">
                  View
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SubProdCustomTable;
