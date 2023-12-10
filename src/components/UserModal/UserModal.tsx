import { Box, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  interface UserModalProps {
    handleCloseOrOpen: () => void;
    open: boolean;
    message: string;
  }

const UserModal: React.FC<UserModalProps> = ({
    handleCloseOrOpen: handleClose,
    open,
    message,
}) => {

    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {message}
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
  export default UserModal;