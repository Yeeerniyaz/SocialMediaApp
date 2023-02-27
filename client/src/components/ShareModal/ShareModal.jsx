import { Modal } from "@mantine/core";
import PostShare from "../PostShare/PostShare";

function ShareModal({ openedModal, setOpenedModal }) {
  return (
    <Modal
      withCloseButton={false}
      size="60%"
	  padding={0}
	  radius={50}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={openedModal}
      onClose={() => {
        setOpenedModal(false);
      }}
    >
      <div style={{color: "white"}}>
        <PostShare />
      </div>
    </Modal>
  );
}

export default ShareModal;
