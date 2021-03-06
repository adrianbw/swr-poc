import { useEffect } from "react";

import { useMessages, DATA_LOAD_ERROR_MESSAGES } from "../../messages";
import { UseThingsStateResult } from "./types";

export const useThingsStateEffects = ({
  data,
  isError,
  isValidating,
}: UseThingsStateResult) => {
  const { displayMessage, dismissMessage } = useMessages();

  useEffect(() => {
    if (!isValidating) {
      if (isError) {
        if (data) {
          displayMessage(DATA_LOAD_ERROR_MESSAGES.REFRESH);
        } else {
          displayMessage(DATA_LOAD_ERROR_MESSAGES.LOAD);
        }
      } else {
        dismissMessage(DATA_LOAD_ERROR_MESSAGES.ID);
      }
    }
  }, [displayMessage, dismissMessage, isValidating, isError, data]);
};
