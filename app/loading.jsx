'use client';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const LoadingPage = ({ loading }) => {
  return (
    <ClipLoader
      // color={color}
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Carregando..."
      // data-testid="loader"
    />
  );
};

export default LoadingPage;
