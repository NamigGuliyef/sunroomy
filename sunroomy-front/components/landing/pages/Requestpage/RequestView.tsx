import RequestHeading from "./RequestHeading";
import dynamic from "next/dynamic";
const SendRequest = dynamic(() => import("./SendRequest"));
const RequestView = () => {
  return (
    <>
      <RequestHeading />
      <SendRequest />
    </>
  );
};

export default RequestView;
