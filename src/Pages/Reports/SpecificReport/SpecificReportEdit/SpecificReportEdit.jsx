import React from 'react'
import LoadingPage from '../../../../Components/loading'
import { BackButtonLink } from '../../../../Components/BackButtonLink/BackButtonLink'
import { PageContainer } from '../../../../Components/Page/PageContainer/PageContainer'
import { useCurrentCompanyReport } from '../hooks/useCurrentCompanyReport'
import { ReportDocuments } from '../components/ReportDocuments/ReportDocuments'
import { useSpecificReportEdit } from './useSpecificReportEdit'
import { useSpecificReportEditFormik } from './useSpecificReportEditFormik'
import { Form, FormikProvider } from 'formik'
import { EditQualitativeReportDetails } from './containers/EditQualitativeReportDetails/EditQualitativeReportDetails'
import { EditQuantitativeReportDetails } from './containers/EditQuantitativeReportDetails/EditQuantitativeReportDetails'

export const SpecificReportEdit = () => {
  const { currentCompanyReportIsLoading } = useCurrentCompanyReport()

  const { specificReportURL } = useSpecificReportEdit()

  const { editSpecificReportFormik } = useSpecificReportEditFormik()

  if (currentCompanyReportIsLoading) {
    return <LoadingPage title="Please wait..." />
  }

  return (
    <PageContainer>
      <BackButtonLink to={specificReportURL} />
      <FormikProvider value={editSpecificReportFormik}>
        <Form>
          <div
            id="report-container"
            className="flex flex-col md:flex-row gap-6 max-w-[1120px] mx-auto"
          >
            <EditQualitativeReportDetails />
            <div>
              <EditQuantitativeReportDetails />

              <ReportDocuments />
            </div>
          </div>
        </Form>
      </FormikProvider>
    </PageContainer>
  )
}
