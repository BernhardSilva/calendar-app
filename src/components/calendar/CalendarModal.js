import Modal from 'react-modal';
import Swal from 'sweetalert2';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../redux/actions/ui';
import { customStyles } from '../../helpers/custom-styles';
import {
  addNewEvent,
  clearActiveEvent,
  updatedEvent,
} from '../../redux/actions/events';

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); //16:00
const nowPlusOneHour = now.clone().add(1, 'hours');

const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlusOneHour.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  //Modal is Open?
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(nowPlusOneHour.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);
  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    }
    // console.log(activeEvent);
  }, [activeEvent]);

  /************************* Close Modal *************************/
  const closeModal = () => {
    //TODO: Cerrar modal
    dispatch(uiCloseModal(false));
    dispatch(clearActiveEvent());
    setFormValues(initEvent); //limpiar form
  };
  /************************* /Close Modal *************************/

  const handleStartDateChange = (e) => {
    // console.log(e);
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    // console.log(e);
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  /************************* VALIDATIONS *************************/

  const handleSubmitForm = (e) => {
    e.preventDefault(); //avoid form spread
    // console.log(formValues);

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire('Error', 'La fecha debe de ser mayor a la de inicio', 'error');
      return;
    }
    if (title.trim() < 2) {
      return setTitleValid(false);
    }

    //TODO: realizar grabación db
    if (activeEvent) {
      dispatch(updatedEvent(formValues));
    } else {
      dispatch(
        addNewEvent({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: '12312312afsfasfas',
            name: 'Juan Pepo',
          },
        }),
      );
    }

    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-background"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={startDate}
            className="form-control react-datetimepicker react-datetimepicker__wrapper"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={endDate}
            minDate={startDate}
            className="form-control react-datetimepicker react-datetimepicker__wrapper"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control modal-textbox"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block fourty-border"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
