import { useState } from 'react';
import ReactModal from 'react-modal';
import { FaRegSave } from 'react-icons/fa';
import { addHours, differenceInSeconds } from 'date-fns';
import '../components/calendarIoModal.css';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.all';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useUiStore from '../../hooks/useUiStore';
import { useEffect } from 'react';
import useCalendarIoStore from '../../hooks/useCalendarIoStore';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#root');

const CalendarIoModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarIoStore();

  const [formValues, setFormValues] = useState({
    title: 'Mateo Cervellon',
    notes: 'Mateo loquito',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const onInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onDateChange = (e, changing) => {
    setFormValues({ ...formValues, [changing]: e });
  };

  const closeModal = () => {
    // console.log('closing modal');
    closeDateModal();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Dates are wrong!', 'Check the dates entered', 'error');
      return;
    }

    if (formValues.title.length <= 0 || formValues.notes <= 0) {
      Swal.fire(
        'This input cannot be sent empty!',
        'Check title and notes',
        'error'
      );
      return;
    }

    console.log(formValues);

    startSavingEvent(formValues);
    closeDateModal();
    // setFormValues(false);
  };

  useEffect(() => {
    if (activeEvent !== 'null') {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  return (
    <ReactModal
      isOpen={isDateModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <div className="text-primary bg-vintage px-4 py-1 md:px-6 md:py-2">
        <h1 className="text-lg font-semibold"> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="py-2">
            <div className="pb-1">
              <label className="text-md">Fecha y hora inicio</label>
            </div>

            <DatePicker
              selected={formValues.start}
              onChange={(e) => onDateChange(e, 'start')}
              dateFormat="Pp"
              // showTimeSelect
            />

            {/* <input placeholder="Fecha inicio" className="p-1" /> */}
          </div>

          <div className="py-2">
            <div className="pb-1">
              <label className="text-md">Fecha y hora fin</label>
            </div>
            <DatePicker
              minDate={formValues.start}
              selected={formValues.end}
              onChange={(e) => onDateChange(e, 'end')}
              dateFormat="Pp"
              // showTimeSelect
            />
            {/* <input placeholder="Fecha inicio" className="p-1" /> */}
          </div>

          <hr />
          <div className="py-2">
            <div className="pb-1">
              <label className="text-md">Titulo y notas</label>
            </div>
            <input
              type="text"
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              className="p-1"
              value={formValues.title}
              onChange={onInputChange}
            />
            <div>
              <small id="emailHelp">Una descripción corta</small>
            </div>
          </div>

          <div>
            <textarea
              type="text"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={formValues.notes}
              onChange={onInputChange}
            ></textarea>
            <div>
              <small id="emailHelp">Información adicional</small>
            </div>
          </div>

          <button
            type="submit"
            className="flex text-vintage font-semibold justify-center items-center bg-space hover:bg-secondary px-4 py-1 rounded-md"
          >
            <FaRegSave />
            <span className="ml-2"> Guardar</span>
          </button>
        </form>
      </div>
    </ReactModal>
  );
};

export default CalendarIoModal;
