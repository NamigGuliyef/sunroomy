"use client";
import { IProjectNeed, IRequest, IRequests } from "@/types/types";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

function RequestsTable({ requests }: IRequests) {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody>
        {requests?.map((item: IRequest, idx: number) => (
          <TableRow className="" key={idx}>
            <TableCell className="!text-2xl w-full">
              {item.first_name}
            </TableCell>
            <TableCell className="!text-xl flex gap-2 h-full">
              <Link href={"./requests/" + item._id}>
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

export default RequestsTable;
