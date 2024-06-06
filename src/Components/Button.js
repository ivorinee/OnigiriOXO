function Button({ name, className = "", onClick, desc }) {
    return (
      <button
        type="button"
        name={name}
        className={`rounded-full place-self-center bg-orange-600 w-40 h-14 text-orange-100 font-extrabold text-xl shadow-sm hover:bg-orange-300 hover:text-orange-600 ${className}`}
        onClick={onClick}
      >
        {desc}
      </button>
    );
  }
  
  export default Button;
  