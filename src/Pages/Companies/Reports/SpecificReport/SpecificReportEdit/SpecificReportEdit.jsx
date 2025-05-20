import React from 'react'
import LoadingPage from '../../../../../Components/loading'
import { BackButtonLink } from '../../../../../Components/BackButtonLink/BackButtonLink'
import { PageContainer } from '../../../../../Components/Page/PageContainer/PageContainer'
import { useCurrentCompanyReport } from '../hooks/useCurrentCompanyReport'
import { ReportDocuments } from '../components/ReportDocuments/ReportDocuments'
import { useSpecificReportURL } from './hooks/useSpecificReportURL'
import { useSpecificReportEditFormik } from './hooks/useSpecificReportEditFormik'
import { Form, FormikProvider } from 'formik'
import { EditQualitativeReportDetails } from './containers/EditQualitativeReportDetails/EditQualitativeReportDetails'
import { EditQuantitativeReportDetails } from './containers/EditQuantitativeReportDetails/EditQuantitativeReportDetails'
import { EditReportNavigation } from './containers/EditReportNavigation/EditReportNavigation'

export const SpecificReportEdit = () => {
  const { currentCompanyReportIsLoading } = useCurrentCompanyReport()

  const { specificReportURL } = useSpecificReportURL()

  const { editSpecificReportFormik } = useSpecificReportEditFormik()
  console.log(editSpecificReportFormik.values)

  if (currentCompanyReportIsLoading) {
    return <LoadingPage title="Please wait..." />
  }

  return (
    <PageContainer>
      <FormikProvider value={editSpecificReportFormik}>
        <Form>
          <div className="flex justify-between items-center gap-8 mb-8">
            <div className="w-1/3 lg:w-2/3">
              <BackButtonLink to={specificReportURL} />
            </div>
            <div className="w-2/3 lg:w-1/3">
              <EditReportNavigation />
            </div>
          </div>

          <div id="report-container" className="flex flex-col-reverse lg:flex-row gap-8 mx-auto">
            <div className="w-full lg:w-2/3">
              <EditQualitativeReportDetails />
            </div>
            <div className="w-full lg:w-1/3">
              <div className="flex flex-col gap-8">
                {/* todo remove when removable */}
                <EditQuantitativeReportDetails />

                <div className="card_shadow rounded-2xl flex flex-col gap-1 py-4 px-3">
                  <h5 className="text-[18px] leading-[24px] font-[600]">Quantitative Report</h5>
                  <div className="flex flex-col gap-[16px] my-[24px]">
                    {editSpecificReportFormik.values.quantitativePercentages.map(
                      (quantitativePercentageCategory) => {
                        return (
                          <div key={quantitativePercentageCategory.id}>
                            {quantitativePercentageCategory.name}
                          </div>
                        )
                      }
                    )}
                  </div>
                </div>

                <ReportDocuments />
              </div>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </PageContainer>
  )
}
