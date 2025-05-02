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

export const SpecificReportEdit = () => {
  const { currentCompanyReportIsLoading } = useCurrentCompanyReport()

  const { specificReportURL } = useSpecificReportURL()

  const { editSpecificReportFormik } = useSpecificReportEditFormik()

  if (currentCompanyReportIsLoading) {
    return <LoadingPage title="Please wait..." />
  }

  return (
    <PageContainer>
      <div className="mb-6">
        <BackButtonLink to={specificReportURL} />
      </div>
      <FormikProvider value={editSpecificReportFormik}>
        <Form>
          <div id="report-container" className="flex flex-col-reverse lg:flex-row gap-6 mx-auto">
            <div className="w-full lg:w-2/3">
              <EditQualitativeReportDetails />
            </div>
            <div className="w-full lg:w-1/3">
              <div className="flex flex-col gap-6">
                <EditQuantitativeReportDetails />

                <ReportDocuments />
              </div>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </PageContainer>
  )
}
