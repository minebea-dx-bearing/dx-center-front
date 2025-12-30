export default function CardButton({title, sub_title, color, path, disabled = false}) {
    const handleClick = () => {
      if (!disabled) {
        window.location.href = path;
      }
    };
  return (
    <div 
        onClick={handleClick}
        className={`w-full h-30 ${color} border border-gray-300 rounded-xl 
        flex flex-col items-center justify-center mb-5
        shadow-md transition-transform duration-500 ease-in-out transform 
        hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:border-gray-300 
        ${disabled ? "cursor-not-allowed opacity-50 pointer-events-none bg-gray-300" : "cursor-pointer"}`}
        aria-disabled={disabled} >
        <div className="font-medium text-2xl text-center px-3">{title}</div>
        <div className="text-sm text-gray-600 text-center px-3">{sub_title}</div>
    </div>
  )
}
