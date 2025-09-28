import { useNavigate } from "react-router-dom";

// Custom hook for navigation
export function useNav() {
  const navigate = useNavigate();

  const goToDetails = (id, type = "movie") => {
    navigate(`/${type}/${id}`);
  };

  return { goToDetails };
}
