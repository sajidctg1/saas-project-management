"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from "~/components/ui-ext/modal";

import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";
import { CreateWorkspaceForm } from "./create-workspace-form";

export const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen } = useCreateWorkspaceModal();

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Create new workspace</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <CreateWorkspaceForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
