import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Box,
  Text,
} from "@chakra-ui/react";
import SignupForm from "./SignupForm";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <Box mx="5">
          <SignupForm />
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
