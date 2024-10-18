import React, { useCallback } from 'react'
import { ROUTES } from '../../../../routes'
import { ButtonLink } from '../../../../Components/ButtonLink/ButtonLink'
import { Link, useLocation } from 'react-router-dom'

export const ReportContainer = ({ children }) => {
  const location = useLocation()

  const isRouteActive = useCallback((route) => {
    return route === location.pathname
  }, [])

  return (
    <div className="w-[90%] mx-auto my-10">
      {/* Top Container */}
      <div className="flex justify-between items-start mb-6">
        {/* Left */}
        <div>
          <h1 className="text-darkBlack font-bold text-3xl mb-1">Companies</h1>
          <p className="subtitle-text ">Overview all of companies here</p>
        </div>
        {/* Right */}
        <ButtonLink to={ROUTES.create}>Add new company</ButtonLink>
      </div>

      {/* Tabs Container */}
      <div className="flex gap-10 w-fit justify-center item-center mb-8">
        <Link
          to={ROUTES.reports.internal}
          className={`cursor-pointer ${
            isRouteActive(ROUTES.reports.internal)
              ? 'border-b-[2px] border-primary text-darkBlack font-semibold'
              : 'text-[#5f6264]'
          }  pb-1 `}
        >
          Internal reports
        </Link>
        <Link
          to={ROUTES.reports.regulator}
          className={`cursor-pointer ${
            isRouteActive(ROUTES.reports.regulator)
              ? 'border-b-[2px] border-primary text-darkBlack font-semibold'
              : 'text-[#5a5c5e]'
          }  pb-1 `}
        >
          Sent to regulator
        </Link>
      </div>

      {/* Reports Container */}
      <div className="w-full gap-7 grid grid-cols-3">{children}</div>
    </div>
  )
}
