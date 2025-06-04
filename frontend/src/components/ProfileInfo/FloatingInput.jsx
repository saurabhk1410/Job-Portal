import { useTheme } from "../../context/ThemeContext";

const FloatingInput = ({

  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  id,
  className = "",
  error = "",
  ...rest
}) => {
  const {theme}=useTheme();
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="relative w-full">
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        autoComplete="off"
        className={`input input-bordered w-full peer placeholder-transparent focus:outline-none ${className}   ${theme=="light"?"bg-purple-100":"bg-base-100"}`}
        {...rest}
      />
      <label
        htmlFor={inputId}
        className={`absolute left-3 -top-2 text-sm px-1 text-base-content transition-all duration-200 ease-in-out
          peer-placeholder-shown:top-2.5 
          peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-base-content 
          peer-focus:-top-2 
          peer-focus:text-sm 
          peer-focus:text-base-content
          font-light
          cursor-text
          ${theme=="light"?"bg-purple-100":"bg-base-100"}
        `}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FloatingInput;
