import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

export const DEFAULT_STATE = {
  data: null,
  error: {
    statusCode: null,
    message: ""
  }
};

export default (resource, defaultData) => {

  const [state, setState] = useState({
    ...DEFAULT_STATE,
    data: defaultData
  });

  async function fetchAndSetState() {

    try {

      const response = await fetch(resource);

      if (!response.ok) {
        setState({
          ...DEFAULT_STATE,
          error: {
            statusCode: response.status,
            message: response.statusText
          }
      });
        return state;
      }
      
      const data = await response.json();

      setState({
        ...DEFAULT_STATE,
        data
      });

    } catch(err) {

      setState({
        ...DEFAULT_STATE,
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