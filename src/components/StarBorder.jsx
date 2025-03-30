/*
	Installed from https://reactbits.dev/tailwind/
*/

const StarBorder = ({
  as: Component = "button",
  className = "",
  color = "white",
  speed = "6s",
  children,
  ...rest
}) => {
  return (
    <Component
      className={`relative inline-block py-[1px] overflow-hidden rounded-[20px] ${className}`}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] animate-star-movement-bottom"
        style={{
          background: `radial-gradient(circle at center, ${color} 1%, transparent 10%)`,
          backgroundSize: "8px 8px",
          animationDuration: speed,
          zIndex: 0,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] animate-star-movement-top"
        style={{
          background: `radial-gradient(circle at center, ${color} 1%, transparent 10%)`,
          backgroundSize: "8px 8px",
          animationDuration: speed,
          zIndex: 0,
        }}
      ></div>
      <div className="relative z-10 bg-gradient-to-b from-gray-900 to-black border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px]">
        {children}
      </div>
    </Component>
  );
};

export default StarBorder; 