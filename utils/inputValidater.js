// we are using regular functions insted of arrow functions inorder to use the this keyword for changing
const inputValidater = () => {
  let validateArray = [];

  /*

   the validate function is use to loop over each validation tests with the provided value
   if the test returns an error it clears the validateArray and returns 
   isValid as false and the error else Valid as true and  error null
  
  */
  const validate = (value) => {
    for (let i = 0; i < validateArray.length; i++) {
      const error = validateArray[i](value);
      if (error) {
        validateArray = [];
        return { isValid: false, error: error };
      }
    }
    validateArray = [];
    return { isValid: true, error: null };
  };

  /*
  validateSchema is use to validate a user defind schema 
  best used when validatiing more than one input value

*/

  const validateSchema = (schema = {}, obj = {}) => {
    /*
    'schema': is user defind obj that  hold all the validation tests
    for each input value  example:

    const mySchema = {
      name: ()=> string().isEmail()
      password:()=>string().minLength(5)
    }



    'obj': is and object with the input values that should be tested example:

    const myUser = {
      name: "john"
      password:"mypassword"
    }
    */

    const keys = Object.keys(schema); // get keys for schema
    for (let i = 0; i < keys.length; i++) {
      const value = obj[keys[i]]; //get value from obj
      const { isValid, error } = schema[keys[i]]().validate(value);

      if (!isValid) {
        return { isValid, error };
      }
    }
    return { isValid: true, error: null };
  };

  function string() {
    //string has different validation tests

    function isEmail(errorMessage = "Email format is incorrect") {
      // when called as anonymous function for testing if value is email is pushed in to the validate array
      // which will later be used. for now it is just storing the function.
      validateArray.push((value) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(value)) {
          return errorMessage; //if not email then we return error message else we return null
        }
        return null;
      });
      return this; // this keyword is bind to this function parent. it is returing the parent
    }

    function isString(errorMessage = "error is not string") {
      validateArray.push((value) => {
        if (typeof value !== "string") {
          return errorMessage;
        }
        return null;
      });
      return this;
    }

    function isNotBlank(errorMessage = "string is empty") {
      validateArray.push((value) => {
        if (value == "") {
          return errorMessage;
        }
        return null;
      });
      return this;
    }

    function minLength(
      length = 0,
      errorMessage = "error text length to small"
    ) {
      validateArray.push((value) => {
        if (value.length < length) {
          return errorMessage;
        }
        return null;
      });
      return this;
    }

    function maxLength(length = 0, errorMessage = "error text length to long") {
      validateArray.push((value) => {
        if (value.length > length) {
          return errorMessage;
        }
        return null;
      });
      return this;
    }

    return { isEmail, isString, minLength, maxLength, isNotBlank, validate };
  }

  //  ========================================================================
  //                                  boolean
  //  ========================================================================
  function bool() {
    function isBool(errorMessage = "error is not type of boolean") {
      validateArray.push((value) => {
        if (typeof value !== "boolean") {
          return errorMessage;
        }
        return null;
      });
      return this;
    }

    function isTrue(errorMessage = "error is boolean is false") {
      validateArray.push((value) => {
        if (!value) {
          return errorMessage;
        }
        return null;
      });
      return this;
    }

    function isFalse(errorMessage = "error is boolean is true") {
      validateArray.push((value) => {
        if (value) {
          return errorMessage;
        }
        return null;
      });
      return this;
    }

    return {
      isBool,
      isTrue,
      isFalse,
      validate,
    };
  }
  return { string, bool, validateSchema };
};

export default inputValidater;
