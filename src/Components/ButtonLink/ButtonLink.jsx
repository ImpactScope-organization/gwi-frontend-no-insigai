import React from 'react'
import { Link } from 'react-router-dom'

export const ButtonLink = ({ to, children, classes = '', bgColor = 'bg-darkGreen' }) => {
  return (
    <Link
      to={to}
      className={`text-center ${bgColor} text-lg rounded-2xl py-3 px-4 border-none outline-none text-[#fff] ${classes} hover:bg-opacity-90`}
    >
      {children}
    </Link>
  )
}
