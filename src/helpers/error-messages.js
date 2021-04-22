import Swal from 'sweetalert2';

export const errorMessage = (error) => {
  console.log(error);
  Swal.fire('Error', error, 'error');
};
