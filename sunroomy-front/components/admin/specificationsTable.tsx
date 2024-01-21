"use client";
import {
  IProjectNeed,
  ISubProductSpecification,
  ISubProductSpecifications,
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
    key: "value",
    label: "VALUE",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

function SpecificationsTable({ specifications }: ISubProductSpecifications) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleDeleteItem = (id: string) => {
    const res = axios
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/specifications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Successfully deleted specification!");
        router.refresh();
      });
  };
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody>
        {specifications ? (
          specifications?.map((item: ISubProductSpecification, idx: number) => (
            <TableRow className="" key={idx}>
              <TableCell className="!text-2xl">{item.key}</TableCell>
              <TableCell className="!text-2xl">{item.value}</TableCell>
              <TableCell className="!text-xl w-full flex gap-2 h-full">
                <Button
                  className=""
                  onClick={() => handleDeleteItem(item._id)}
                  size="md"
                  color="primary"
                >
                  Delete
                </Button>
                <Link href={"./specifications/" + item._id}>
                  <Button className="" size="md" color="primary">
                    Edit
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow className="" key={"2"}>
            <TableCell className="!text-2xl">
              <h1>Please select subproduct first</h1>
            </TableCell>
            <TableCell className="!text-2xl">
              <p></p>
            </TableCell>
            <TableCell className="!text-xl w-full flex gap-2 h-full">
              <p></p>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default SpecificationsTable;
