import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";

const AboutModal = ({ session, isOpen, onOpenChange, reloadPage, whyOutdorr }: any) => {
  const [secondaryText, setSecondaryText] = useState("");
  const router = useRouter();
  const [mainText, setMainText] = useState("");
  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const postData = {
      key: mainText,
      value: secondaryText,
      why_outdorr: whyOutdorr,
    };
    const res = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/about-outdorr/`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
          },
        }
      )
      .then((response) => {
        toast.success("Successfully added aboutItem!");
        onOpenChange();
        reloadPage()
      })
      .catch((err) => {});
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Create About Component!
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Main text"
                  type="title"
                  name="maintext"
                  size="lg"
                  onChange={(e) => setMainText(e.target.value)}
                  id="description"
                  variant="underlined"
                  placeholder="Enter your main text"
                />
                <Input
                  label="Secondary Text"
                  type="title"
                  name="secondarytext"
                  size="lg"
                  onChange={(e) => setSecondaryText(e.target.value)}
                  id="secondarytext"
                  variant="underlined"
                  placeholder="Enter your secondary text"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="shadow" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" variant="shadow" type="submit">
                  Create!
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;
