"use client";
import { IDesignDetailsData } from "@/types/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
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
    label: "STEP",
  },
  {
    key: "actions",
    label: "ACTIONS",
  },
];
interface ISteps {
  steps: IDesignDetailsData[];
}
function StepsTable({ steps }: ISteps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleDeleteStep = (stepId: string) => {
    const res = axios
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/project-design-details/${stepId}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      )
      .then((response) => {
        router.refresh();
        toast.success("Successfully deleted step");
      });
  };
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody>
        {steps?.map((item, idx) => (
          <TableRow className="" key={idx}>
            <TableCell className="!text-2xl w-full">{item.title}</TableCell>
            <TableCell className="!text-xl flex gap-2 h-full">
              <Button
                className=""
                onClick={() => handleDeleteStep(item._id)}
                size="md"
                color="primary"
              >
                Delete
              </Button>
              <Link href={"./steps/" + item._id}>
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

export default StepsTable;
