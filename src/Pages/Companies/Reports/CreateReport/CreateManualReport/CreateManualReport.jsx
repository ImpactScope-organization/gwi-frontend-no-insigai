import React from 'react'
import { BackButtonLink } from '../../../../../Components/BackButtonLink/BackButtonLink'
import { PageContainer } from '../../../../../Components/Page/PageContainer/PageContainer'
import { FormikProvider } from 'formik'
import { useCreateManualReport } from './useCreateManualReport'
import { FileInput } from '../../../../../Components/Fields/FileInput'
import { SuccessButton } from '../../../../../Components/Buttons/SuccessButton'
import { useGetCompany } from '../../../api/CompanyApiQuery'
import { useAccessContext } from '../../../../../Context/AccessContext'

export const CreateManualReport = () => {
  const { formik, isLoading } = useCreateManualReport()
  const { company, companyId } = useGetCompany()
  const { getCompanyRouteByRole } = useAccessContext()

  return (
    <PageContainer>
      <div className="pb-10">
        <div class="mb-8">
          <BackButtonLink
            to={getCompanyRouteByRole({
              companyId
            })}
          />
        </div>
        <div className="grid w-full">
          <div className="mx-auto flex justify-center items-center flex-col gap-4">
            <h1 className="text-darkBlack font-bold text-3xl leading-[48px]">
              Add new manual report for {company?.name}
            </h1>
            <p className="mb-8">
              Add the report source file to add the report to the report queue. <br />
              You will see the processing status after submitting the report.
            </p>
            {/* File Upload */}
            <FormikProvider value={formik}>
              <div className="w-full">
                <FileInput name="file" accept=".xlsx" />
              </div>
              <SuccessButton
                isLoading={isLoading}
                disabled={!formik.isValid}
                onClick={formik.submitForm}
              >
                Add new report
              </SuccessButton>
            </FormikProvider>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
