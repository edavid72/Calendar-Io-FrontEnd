import '../components/fabAddNew.css';
import { IoMdAddCircleOutline } from 'react-icons/io';
import useCalendarIoStore from '../../hooks/useCalendarIoStore';
import useUiStore from '../../hooks/useUiStore';
import { addHours } from 'date-fns';

const FabAddNew = () => {
  const { setActiveEvent } = useCalendarIoStore();
  const { openDateModal } = useUiStore();

  const handleClickNew = () => {
    openDateModal();
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#827397',
      user: {
        _id: '2319',
        name: 'Mateo',
      },
    });
  };

  return (
    <>
      <button className="fab bg-space text-white" onClick={handleClickNew}>
        <IoMdAddCircleOutline className="text-5xl" />
      </button>
    </>
  );
};

export default FabAddNew;
