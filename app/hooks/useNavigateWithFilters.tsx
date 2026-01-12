import { useNavigate, useLocation } from 'react-router';

export const useNavigateWithFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (to: string) => {
    navigate({
      pathname: to,
      search: location.search,
    });
  };
};
