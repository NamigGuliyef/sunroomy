"use client";
import {
  INeeds,
  IProjectNeed,
  ISubProductPlacement,
  ISubProductPlacementItem,
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
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

function SubProdPlacementItemTable({ placements }: { placements: ISubProductPlacement }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleDeleteItem = (id: string) => {
    const res = axios
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/subproduct-placementItem/${id}`,
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
        {placements?.itemIds.map((item: ISubProductPlacementItem, idx: number) => (
          <TableRow className="flex items-center" key={idx}>
            <TableCell className="w-full">
              <Image
                src={item.photo}
                className="w-1/2"
                width={500}
                height={500}
                alt=""
              />
            </TableCell>
            <TableCell className="w-full">{item.description}</TableCell>
            <TableCell className="flex h-full gap-2 !text-xl">
              <Button
                className=""
                onClick={() => handleDeleteItem(item._id)}
                size="md"
                color="primary"
              >
                Delete
              </Button>
              <Link
                href={`/admin/dashboard/subproduct-placement/item/${item._id}`}
              >
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

export default SubProdPlacementItemTable;
