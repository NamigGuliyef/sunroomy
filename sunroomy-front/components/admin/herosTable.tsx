"use client";
import { IHomePageHero, IHomePageHeros, IProjects } from "@/types/types";
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
    key: "subtitle",
    label: "subtitle",
  },
  {
    key: "image",
    label: "image",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];

function HerosTable({ heros }: IHomePageHeros) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleDeleteItem = (id: string) => {
    const res = axios
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/homepage_hero/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
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
        {heros?.map((item, idx) => (
          <TableRow className="" key={idx}>
            <TableCell className="!text-2xl w-[30%]">{item.title}</TableCell>
            <TableCell className="!text-2xl w-[30%]">{item.subtitle}</TableCell>
            <TableCell className="!text-2xl w-full"><Image alt="" width={400} height={400} src={item.photo} /></TableCell>
            <TableCell className="!text-xl flex gap-2 h-full">
              <Button
                className=""
                onClick={() => handleDeleteItem(item._id)}
                size="md"
                color="primary"
              >
                Delete
              </Button>
              <Link href={"./hero/" + item._id}>
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

export default HerosTable;
