import { useState, useCallback } from "react";

const useQuery = (
  defaultState,
  asyncCallback = () => {},
  defaultLoading = false
) => {
  const [state, setState] = useState(defaultState);
  const [loading, setLoading] = useState(defaultLoading);
  const [errorMessage, setErrorMessage] = useState("");

  const get = useCallback(
    async (params) => {
      try {
        setLoading(true);
        setErrorMessage("");
        const articles = await asyncCallback(params);
        setState(articles);
      } catch (error) {
        setErrorMessage(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return [state, get, loading, errorMessage];
};

export default useQuery;