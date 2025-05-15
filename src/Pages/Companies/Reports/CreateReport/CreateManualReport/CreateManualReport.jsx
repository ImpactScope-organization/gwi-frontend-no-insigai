import React from 'react'
import { FormikProvider } from 'formik'
import { useCreateManualReport } from './useCreateManualReport'
import { FileInput } from '../../../../../Components/Fields/FileInput'
import { SuccessButton } from '../../../../../Components/Buttons/SuccessButton'
import { CreateReportContainer } from '../components/CreateReportContainer'

export const CreateManualReport = () => {
  const { formik, isLoading } = useCreateManualReport()

  return (
    <CreateReportContainer>
      <div className="pb-10">
        <div className="grid w-full">
          <div className="mx-auto flex justify-center items-center flex-col gap-4 w-full">
            {/* File Upload */}
            <FormikProvider value={formik}>
              <div className="w-full flex flex-col gap-4">
                <FileInput name="file" accept=".xlsx" />

                <SuccessButton
                  isLoading={isLoading}
                  disabled={!formik.isValid}
                  onClick={formik.submitForm}
                >
                  Add new report
                </SuccessButton>
              </div>
            </FormikProvider>
          </div>
        </div>
      </div>
    </CreateReportContainer>
  )
}
