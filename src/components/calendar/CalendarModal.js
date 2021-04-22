import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import Swal from 'sweetalert2';
import DateTimePicker from 'react-datetime-picker';
import { uiCloseModal } from '../../redux/actions/ui';
import { customStyles } from '../../helpers/custom-styles';
import {
  clearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
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
  //Modal is Open?
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(nowPlusOneHour.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);
  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
    // console.log(activeEvent);
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  /************************* Close Modal *************************/
  const closeModal = () => {
    dispatch(uiCloseModal());
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
      return Swal.fire(
        'Error',
        'End date needs to be greater than start date.',
        'error',
      );
    }
    if (title.trim() < 2) {
      return setTitleValid(false);
    }

    //save to db
    if (activeEvent) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
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
      <h1 className="modal-title">
        {' '}
        {!activeEvent ? 'New event ✍️' : 'Update event ✏️'}
      </h1>
      <button className="btn btn-danger fab fab-close" onClick={closeModal}>
        <i className="fa fa-times" />
      </button>

      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group date-start">
          <label>Start date and time</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={startDate}
            className="form-control react-datetimepicker react-datetimepicker__wrapper"
          />
        </div>

        <div className="form-group date-end">
          <label>End date and time</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={endDate}
            minDate={startDate}
            className="form-control react-datetimepicker react-datetimepicker__wrapper"
          />
        </div>

        <hr />
        <div className="form-group title-event">
          <label>Title and notes</label>
          <input
            type="text"
            className={`form-control ${!titleValid && 'is-invalid'}`}
            placeholder="Write here your title"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group content-event">
          <textarea
            type="text"
            className="form-control modal-textbox"
            placeholder="Enter here your note 📝"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block fourty-border btn-save"
        >
          <i className="far fa-save"></i>
          <span> Save</span>
        </button>
      </form>
    </Modal>
  );
};
