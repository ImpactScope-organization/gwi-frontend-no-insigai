import React from 'react'
import { BackButtonLink } from '../../BackButtonLink/BackButtonLink'

export const PageHeaderWithBackButton = ({ title, subTitle, to, children }) => (
  <div className="flex justify-between items-start mb-6">
    <div className="flex gap-4">
      <BackButtonLink to={to} />
      <div>
        <h1 className="text-darkBlack font-bold text-3xl mb-1">{title}</h1>
        <p className="subtitle-text ">{subTitle}</p>
      </div>
    </div>
    {children}
  </div>
)
