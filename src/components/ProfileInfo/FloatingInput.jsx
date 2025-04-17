const FloatingInput = ({
    label,
    type = "text",
    value,
    onChange,
    required = false,
  }) => {
    const inputId = label.toLowerCase().replace(/\s+/g, "-"); // simple unique id
  
    return (
      <div className="relative w-full">
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=" "
          className="input input-bordered w-full peer placeholder-transparent focus:outline-none"
        />
        <label
          htmlFor={inputId}
          className={`absolute left-3 -top-2 text-sm bg-base-100 px-1 text-base-content transition-all 
            peer-placeholder-shown:top-2.5 
            peer-placeholder-shown:text-base 
            peer-placeholder-shown:text-base-content 
            peer-focus:-top-2 
            peer-focus:text-sm 
            peer-focus:text-base-content
            font-light
            cursor-text
          `}
        >
          {label}
        </label>
      </div>
    );
  };
  
  export default FloatingInput;
  