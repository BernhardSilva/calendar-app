import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../redux/actions/ui';

export const AddNewFab = () => {
  const dispatch = useDispatch();
  const openModalfab = () => {
    dispatch(uiOpenModal(true));
  };
  return (
    <div>
      <button className="btn btn-primary fab" onClick={openModalfab}>
        <i className="fas fa-plus" />
      </button>
    </div>
  );
};
