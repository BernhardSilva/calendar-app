import { useDispatch, useSelector } from 'react-redux';
import { eventStartDelete } from '../../redux/actions/events';

export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const { activeEvent } = useSelector((state) => state.calendar);

  const handleDelete = () => {
    dispatch(eventStartDelete());
  };
  return (
    <>
      {activeEvent && (
        <button
          className="btn btn-danger fab fab-delete"
          onClick={handleDelete}
        >
          <i className="fas fa-trash" />
        </button>
      )}
    </>
  );
};
