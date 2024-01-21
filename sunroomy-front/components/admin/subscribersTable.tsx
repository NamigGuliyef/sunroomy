"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import moment from "moment";
const columns = [
  {
    key: "email",
    label: "EMAIL",
  },
  {
    key: "date",
    label: "DATE",
  },
];
const SubscribersTable = ({ results }: any) => {
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody>
        {results?.map((item: any, idx: number) => (
          <TableRow className="" key={idx}>
            <TableCell className="!text-lg">{item.email}</TableCell>
            <TableCell className="!text-lg">
              {moment(item.createdAt).format("MMMM, DD YYYY")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SubscribersTable;
