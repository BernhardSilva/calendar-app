import { useDispatch } from 'react-redux';

export const DeleteEventFab = () => {
  const dispatch = useDispatch();
  const deleteEvent = () => {
    // dispatch();
  };
  return (
    <button className="btn btn-danger fab-delete" onClick={deleteEvent}>
      <i className="fas fa-trash" />
    </button>
  );
};
