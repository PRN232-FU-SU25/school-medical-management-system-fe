import { useParams } from 'react-router-dom';

export function useId() {
  const { id } = useParams();
  return id;
}
