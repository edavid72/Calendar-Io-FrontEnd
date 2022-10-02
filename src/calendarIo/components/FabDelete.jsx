import '../components/fabDelete.css';
import { FaTrashAlt } from 'react-icons/fa';
import useCalendarIoStore from '../../hooks/useCalendarIoStore';

const FabDelete = () => {
  const { startDeleteEvent, hasEventSelected } = useCalendarIoStore();

  // console.log(hasEventSelected);
  const handleDelete = () => {
    startDeleteEvent();
  };

  return (
    <>
      <button
        className="fab-delete bg-red-300 text-white"
        onClick={handleDelete}
        style={{ display: hasEventSelected ? '' : 'none' }}
      >
        <FaTrashAlt className="text-2xl" />
      </button>
    </>
  );
};

export default FabDelete;
