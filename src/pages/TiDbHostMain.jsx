import { useParams } from 'react-router-dom';

export const TiDbHostPage = () => {
  const { host } = useParams();
  return (
    <div>
      <h3>Host: {host}</h3>
    </div>
  )
};