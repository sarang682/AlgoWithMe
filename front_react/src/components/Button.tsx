'use client'

import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded-md shadow-sm focus:outline-none'
  const variantStyles = {
    primary: 'bg-primary hover:bg-secondary text-white focus:ring-blue-500',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-black focus:ring-gray-300',
  }

  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
