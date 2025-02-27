import React from 'react'
import LoadingPage from '../../../Components/loading'
import Switch from 'react-switch'
import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { useSpecificReport } from './useSpecificReport'
import { QualitativeReportDetails } from './containers/QualitativeReportDetails/QualitativeReportDetails'
import { QuantitativeReportDetails } from './containers/QuantitativeReportDetails/QuantitativeReportDetails'
import { useCurrentCompanyReport } from './hooks/useCurrentCompanyReport'
import { ReportDocuments } from './containers/ReportDocuments/ReportDocuments'

export const SpecificReport = () => {
  const { currentCompanyReport, currentCompanyReportIsLoading } = useCurrentCompanyReport()

  const { isRegulator, isDemo, handleIsDemoChange, handleRegulatorChange } = useSpecificReport()

  if (currentCompanyReportIsLoading) {
    return <LoadingPage title="Please wait..." />
  }
  return (
    <PageContainer>
      <BackButtonLink to={ROUTES.reports.internal} />

      {/* Specific Report */}
      <div id="report-container" className="flex flex-col md:flex-row gap-6 max-w-[1120px] mx-auto">
        <QualitativeReportDetails />

        <div>
          <QuantitativeReportDetails />
          <ReportDocuments />
          <div className="card_shadow mt-8  rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
            <h2 className="text-[18px] leading-[24px] font-[600]">Visibility</h2>
            <div className="flex flex-row flex-nowrap justify-start items-center gap-2  p-2 rounded-2xl">
              <div className="flex flex-row gap-2 w-full justify-between">
                <h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
                  <span className="truncate">Demo</span>
                </h2>
                <div>
                  <Switch
                    height={24}
                    onChange={handleIsDemoChange}
                    checked={isDemo}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#4DC601"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row flex-nowrap justify-start items-center gap-2  p-2 rounded-2xl">
              <div className="flex flex-row gap-2 w-full justify-between">
                <h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
                  <span className="truncate">Regulator</span>
                </h2>
                <div>
                  <Switch
                    height={24}
                    onChange={handleRegulatorChange}
                    checked={isRegulator}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onColor="#4DC601"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row flex-nowrap justify-start items-center gap-2  p-2 rounded-2xl">
              <div className="flex flex-row gap-2 w-full justify-between">
                <h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
                  <span className="truncate">Specific Client</span>
                </h2>
                <p className="text-darkBlack ml-4 text-[1em] text-base mb-1 font-medium">
                  <span className="py-1 px-3 rounded-3xl bg-foggyGrey">coming soon</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
