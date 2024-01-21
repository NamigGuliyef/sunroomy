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
import { Input as ShadInput } from "@/components/admin/ui/input";

const DesignModal = ({
  session,
  isOpen,
  onOpenChange,
  reloadPage,
  projectDesign,
}: any) => {
  const [step, setStep] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const router = useRouter();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const postData = {
        step: step,
        title: title,
        description: description,
        project_design: projectDesign,
        photo: files && files[0],
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/project-design-details/`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Successfully added aboutItem!");
      reloadPage();
    } catch (err) {
      console.error(err);
    } finally {
      onOpenChange();
    }
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={onSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Create Design Details Component!
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Step"
                  type="text"
                  name="step"
                  size="lg"
                  onChange={(e) => setStep(e.target.value)}
                  id="description"
                  variant="underlined"
                  placeholder="Enter your step (Example: Step 1)"
                />
                <Input
                  label="Title"
                  type="text"
                  name="title"
                  size="lg"
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  variant="underlined"
                  placeholder="Enter your title"
                />{" "}
                <Input
                  label="Description"
                  type="text"
                  name="description"
                  size="lg"
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  variant="underlined"
                  placeholder="Enter your description"
                />
                <ShadInput
                  id="file"
                  placeholder="file"
                  onChange={(e) => setFiles(e?.target?.files || null)}
                  color="primary"
                  className="file:bg-primary flex items-center justify-center h-[64px] file:shadow-lg file:hover:cursor-pointer file:text-white hover:file:bg-primary/90 file:py-2 file:mt-1 file:px-4 file:rounded-large"
                  type="file"
                  multiple
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

export default DesignModal;
