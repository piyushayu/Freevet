import React from 'react';

function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  icon = null,
  iconPosition = 'left',
  ...props
}) {
  // Base classes for the button: focus ring, transitions, border radius, layout
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/55 select-none disabled:opacity-50 disabled:cursor-not-allowed text-sm px-5 py-2.5 gap-2';

  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] active:scale-[0.98]',
    secondary: 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 active:scale-[0.98]',
    outline: 'bg-transparent hover:bg-white/5 text-neutral-300 border border-white/10 hover:border-white/20 active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="flex items-center justify-center w-4 h-4">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="flex items-center justify-center w-4 h-4">{icon}</span>
      )}
    </button>
  );
}

export default Button;
