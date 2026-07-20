import React from 'react';

function Button({
  children,
  Clickfunctn,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  icon = null,
  iconPosition = 'left',
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-700/50 select-none disabled:opacity-50 disabled:cursor-not-allowed text-sm px-4 py-2.5 gap-2 ';


  return (
    <button
      type={type}
      onClick={Clickfunctn}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="flex items-center justify-center w-4 h-4 ">
          {typeof icon === 'string' ? (
            <img src={icon} alt="icon" className="w-full h-full object-contain" />
          ) : (
            icon
          )}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="flex items-center justify-center w-4 h-4">
          {typeof icon === 'string' ? (
            <img src={icon} alt="icon" className="w-full h-full object-contain" />
          ) : (
            icon
          )}
        </span>
      )}
    </button>
  );
}

export default Button;
