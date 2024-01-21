import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  text: string | React.JSX.Element;
  link: string;
  cardClass?: string;
};

const Helper = ({ title, text, link, cardClass }: Props) => {
  return (
    <Card className={cardClass}>
      <CardHeader className="flex gap-3 items-center">
        <div className="w-10 h-10 bg-darkgray text-white shadow rounded-sm flex justify-center items-center font-bold font-sf text-2xl">
          {title[0].toUpperCase()}
        </div>
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">The Sunroomy Inc</p>
        </div>
        <Button
          as={Link}
          href={link}
          color="primary"
          variant="shadow"
          className="ml-auto"
          size="sm"
        >
          Go!
        </Button>
      </CardHeader>
      <Divider />
      <CardBody className="text-lg">{text}</CardBody>
    </Card>
  );
};

export default Helper;
