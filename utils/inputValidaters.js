let currentStr = "";

export const isString = (str = "") => {
  const isEmail = (errorMessage = "is not email") => {
    try {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(str)) {
        throw new Error(errorMessage);
        //return { isValid: false, error: errorMessage };
      }
    } catch (error) {
      return {
        error: error.message,
        isValid: false,
      };
    }
  };

  const minLength = (
    length = 0,
    errorMessage = "incorrect length too small"
  ) => {
    try {
      if (str.length >= length) {
        throw new Error(errorMessage);
        //  return { isValid: false, error: errorMessage };
      }
    } catch (error) {
      return {
        error: error.message,
        isValid: false,
      };
    }
  };

  try {
    if (typeof str !== "string") {
      throw new Error("type is not of string");
    }
    return { isValid: true, minLength, isEmail };
  } catch (error) {
    return {
      error: error.message,
      isValid: false,
      minLength,
      isEmail,
    };
  }
};

const validateInput = (validateArray = []) => {
  validateArray.forEach(() => {});

  return;
};
