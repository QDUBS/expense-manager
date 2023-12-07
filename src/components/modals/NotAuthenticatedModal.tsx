import Modal from "react-overlays/Modal";

type Props = {
  visible: boolean;
};

const NotAuthenticatedModal = ({ visible }: Props) => {
  return (
    <Modal show={visible} className="grid h-screen place-items-center">
      <h2>You must be signed in to enroll for a course</h2>
    </Modal>
  );
};

export default NotAuthenticatedModal;
