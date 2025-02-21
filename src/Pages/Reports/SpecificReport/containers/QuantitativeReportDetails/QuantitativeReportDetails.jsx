import CustomGaugeChart from '../../../../../Components/gauge-chart'
import { captureScreen, toTitleCase } from '../../../../../utils/helpers'
import { formattedDate } from '../../../../../utils/date'
import { Dropdown } from 'antd'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import React from 'react'

export const QuantitativeReportDetails = ({ currentCompanyReport }) => (
  <div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
    <h5 className="text-[18px] leading-[24px] font-[600]">Report</h5>
    <div className="overflow-hidden w-full px-2 flex justify-center items-center ">
      <CustomGaugeChart percentage={greenwashingRiskPercentage} />
    </div>
    {/* Cols */}
    <div className="mt-[24px] grid grid-cols-2 lg:max-w-[370px]  gap-2 my-3 ">
      <p className="text-reportGrey   text-[1em] text-base mb-1 font-medium">Reporting risk</p>
      <div className="flex flex-row  items-center gap-[4px] flex-nowrap">
        {Array.from({ length: 10 }).map((_item, index) => {
          return (
            <div
              key={`${index}-bar`}
              className={`w-[4px] h-[14px] rounded-sm ${
                (index + 1) * 10 <= parseInt(reportingRiskPercentage)
                  ? 'bg-darkGreen'
                  : 'bg-reportGrey '
              }`}
            ></div>
          )
        })}
        <p className="text-darkBlack ml-[8px] text-[1em] text-base font-medium">
          {parseInt(reportingRiskPercentage)}%
        </p>
      </div>
      <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">GHG emissions</p>
      <p className="text-darkBlack  text-[1em] text-base mb-1 font-medium">
        {currentCompanyReport?.GHGEmissions}
      </p>
      <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">Report status</p>
      <p className={`text-darkBlack justify-left  text-[1em] md:ml-0 text-base mb-1 `}>
        <span
          className={` text-white text-center py-1 px-3   rounded-3xl font-medium ${
            currentCompanyReport?.pending === 'true' && currentCompanyReport?.disregard === 'false'
              ? 'bg-foggyGrey'
              : currentCompanyReport?.reviewing === 'true'
                ? 'bg-review'
                : currentCompanyReport?.reviewed === 'true'
                  ? 'bg-darkGreen'
                  : currentCompanyReport?.disregard === 'true'
                    ? 'bg-danger'
                    : 'bg-foggyGrey'
          }`}
        >
          {currentCompanyReport?.pending === 'true' && currentCompanyReport?.disregard === 'false'
            ? 'Pending Review'
            : currentCompanyReport?.reviewing === 'true'
              ? 'In Review'
              : currentCompanyReport?.reviewed === 'true'
                ? 'Reviewed'
                : currentCompanyReport?.disregard === 'true'
                  ? 'Disregard'
                  : toTitleCase(currentCompanyReport?.status) || 'Generated'}
        </span>
      </p>
      {blockchainTransactionURL && (
        <>
          <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">Timestamp</p>
          <a className="col-span-1 text-[1em] text-base mb-1 font-medium">{formattedDate}</a>
          <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
            Solana Transaction
          </p>
          <a
            href={`${blockchainTransactionURL}`}
            target="_blank"
            rel="noreferrer"
            className="text-darkGreen col-span-1 truncate text-[1em]  mb-1 font-medium"
          >
            {blockchainTransactionURL}
          </a>
        </>
      )}
      {blockchainFileURL && (
        <>
          <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
            View report on chain
          </p>
          <a
            href={blockchainFileURL}
            target="_blank"
            rel="noreferrer"
            className="text-darkGreen truncate text-[1em] text-base mb-1 font-medium"
          >
            {blockchainFileURL}
          </a>
        </>
      )}
    </div>
    {/* todo make this as a component */}
    {(!blockchainTransactionURL || !blockchainFileURL) && (
      <div className="flex flex-row gap-4 w-full">
        <button
          disabled={isSendToBlockchainInProgress}
          onClick={handleSendToBlockchain}
          className={`${
            isSendToBlockchainInProgress ? 'bg-greyText' : 'bg-darkGreen'
          } flex-1 rounded-lg py-3 px-3 border-none outline-none text-[#fff] text-[16px] font-[600] leading-[24px]`}
        >
          Send to blockchain
        </button>
        <Dropdown
          disabled={isSendToBlockchainInProgress}
          trigger={['click']}
          menu={dropdownConfiguration}
          placement="bottomRight"
        >
          <div className="py-[12px] px-[18px] rounded-md border bg-transparent flex justify-center items-center">
            <IoEllipsisHorizontalSharp />
          </div>
        </Dropdown>
      </div>
    )}
    {blockchainTransactionURL && blockchainFileURL && (
      <div className="flex flex-row justify-center gap-2 col-span-2 w-full">
        <button
          onClick={() => captureScreen('report-container', currentCompanyReport?.companyName)}
          className="bg-primary rounded-lg py-[12px] flex w-full text-center justify-center px-[4px] col-span-1 border-none outline-none text-[#fff] text-[16px] font-[600] leading-[24px]"
        >
          Download as .pdf
        </button>
        <button
          onClick={deleteCompanyHandler}
          className="bg-white border border-darkBlack rounded-lg w-full text-center justify-center flex py-[12px] col-span-1 px-[4px] text-darkBlack text-[16px] font-[600] leading-[24px]"
        >
          Remove from DB
        </button>
      </div>
    )}
  </div>
)
