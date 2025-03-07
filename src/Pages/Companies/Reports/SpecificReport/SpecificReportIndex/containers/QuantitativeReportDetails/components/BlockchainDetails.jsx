import { formattedDate } from '../../../../../../../../utils/date'
import React from 'react'
import { useCurrentCompanyReport } from '../../../../hooks/useCurrentCompanyReport'

export const BlockchainDetails = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()
  return (
    <>
      {currentCompanyReport?.blockchainTransactionURL && (
        <>
          <h3 className="text-reportGrey  text-[1em] text-base mb-1 font-medium">Timestamp</h3>
          <span className="col-span-1 text-[1em] text-base mb-1 font-medium">{formattedDate}</span>
          <h3 className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
            Solana Transaction
          </h3>
          <a
            href={`${currentCompanyReport?.blockchainTransactionURL}`}
            target="_blank"
            rel="noreferrer"
            className="text-darkGreen col-span-1 truncate text-[1em]  mb-1 font-medium"
          >
            {currentCompanyReport?.blockchainTransactionURL}
          </a>
        </>
      )}
      {currentCompanyReport?.blockchainFileURL && (
        <>
          <h3 className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
            View report on chain
          </h3>
          <a
            href={currentCompanyReport?.blockchainFileURL}
            target="_blank"
            rel="noreferrer"
            className="text-darkGreen truncate text-[1em] text-base mb-1 font-medium"
          >
            {currentCompanyReport?.blockchainFileURL}
          </a>
        </>
      )}
    </>
  )
}
