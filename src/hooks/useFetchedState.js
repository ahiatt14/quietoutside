import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

export const DEFAULT_FETCH_STATE = {
  data: null,
  error: {
    statusCode: null,
    message: ""
  }
};

export default (
  resource,
  defaultState
) => {

  const [state, setState] = useState(defaultState);

  async function fetchAndSetState() {

    try {

      const response = await fetch(resource);

      if (!response.ok) {
        setState({
          ...DEFAULT_FETCH_STATE,
          error: {
            statusCode: response.status,
            message: response.statusText
          }
      });
        return state;
      }
      
      const data = await response.json();

      setState({
        ...DEFAULT_FETCH_STATE,
        data
      });

    } catch(err) {

      setState({
        ...DEFAULT_FETCH_STATE,
        error: {
          statusCode: null,
          message: "A network error occurred."
        }
      });
    }
  }

  useEffect(() => {
    fetchAndSetState();
  }, [resource]);

  return state;
}