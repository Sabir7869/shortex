import Modal from '@mui/material/Modal';
import CreateNewShorten from './CreateNewShorten';
import PropTypes from 'prop-types';

const ShortenPopUp = ({ open, setOpen, refetch}) => {

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='flex justify-center items-center h-full w-full'>
            <CreateNewShorten setOpen={setOpen} refetch={refetch} />
        </div>
      </Modal>
  )
}

ShortenPopUp.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired
};

export default ShortenPopUp;