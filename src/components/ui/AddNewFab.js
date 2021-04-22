import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/ui';
import { clearActiveEvent } from '../../redux/actions/events';

export const AddNewFab = () => {
  const dispatch = useDispatch();
  const openModalfab = () => {
    dispatch(clearActiveEvent());
    dispatch(uiOpenModal(true));
  };
  return (
    <div>
      <button className="btn btn-primary fab fab-add" onClick={openModalfab}>
        <i className="fas fa-plus" />
      </button>
    </div>
  );
};
