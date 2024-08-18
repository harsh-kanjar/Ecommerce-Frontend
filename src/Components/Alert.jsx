import Button from '@mui/material/Button';
import {useSnackbar } from 'notistack';

function Alert(props) {
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar( props.message ||'This is a success message!', { variant });
  };

  return (
    <>
      <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
    </>
  );
}

export default Alert;

// dectrped