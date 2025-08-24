const TextField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
  }) => {
    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className={`${className ? className : ""} block text-sm font-medium text-gray-700 mb-2`}
        >
          {label}
        </label>
  
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={`${
            className ? className : ""
          } w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bitly-lightBlue focus:border-transparent outline-none transition-all duration-200 ${
            errors[id]?.message ? "border-red-500 focus:ring-red-500" : ""
          }`}
          {...register(id, {
            required: { value: required, message },
            minLength: min
              ? { value: min, message: "Minimum 6 characters required" }
              : null,
  
            pattern:
              type === "email"
                ? {
                    value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                    message: "Please enter a valid email address",
                  }
                : type === "url"
                ? {
                    value:
                      /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                    message: "Please enter a valid URL",
                  }
                : null,
          })}
        />
  
        {errors[id]?.message && (
          <p className="text-sm text-red-600 mt-2">
            {errors[id]?.message}
          </p>
        )}
      </div>
    );
  };
  
  export default TextField;