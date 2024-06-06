function Button({ name, className = "", onClick, desc }) {
    return (
      <button
        type="button"
        name={name}
        className={`rounded-full place-self-center bg-neutral-600 w-40 h-14 font-semibold font-serif text-white text-l shadow-sm hover:bg-neutral-400 ${className}`}
        onClick={onClick}
      >
        {desc}
      </button>
    );
  }
  
  export default Button;
  