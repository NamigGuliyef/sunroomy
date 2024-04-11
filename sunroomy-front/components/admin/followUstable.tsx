"use client";
import {
  IFollowUsLinks,
  IHomePageHero,
  IHomePageHeros,
  IProjects,
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
    key: "name",
    label: "NAME",
  },
  {
    key: "link",
    label: "LINK",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

function FollowUsTable({ followUs }: IFollowUsLinks) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleDeleteItem = (id: string) => {
    const res = axios
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/followUs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      )
      .then((response) => {
        router.refresh();
        toast.success("Successfully deleted item!");
      });
  };
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody>
        {followUs?.map((item, idx) => (
          <TableRow className="" key={idx}>
            <TableCell className="w-[30%] !text-2xl">{item.name}</TableCell>
            <TableCell className="w-[30%] !text-2xl">{item.link}</TableCell>
            <TableCell className="flex h-full gap-2 !text-xl">
              <Button
                className=""
                onClick={() => handleDeleteItem(item._id)}
                size="md"
                color="primary"
              >
                Delete
              </Button>
              <Link href={"./follow-us/" + item._id}>
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

export default FollowUsTable;
