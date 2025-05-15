import { CreateReportContainer } from '../components/CreateReportContainer'
import { useCreateDocumentReport } from './useCreateDocumentReport'
import { CompanyDocumentInput } from './components/CompanyDocumentInput/CompanyDocumentInput'
import { Form, FormikProvider } from 'formik'
import { InputText } from '../../../../../Components/Fields/InputText'
import React from 'react'
import { SuccessButton } from '../../../../../Components/Buttons/SuccessButton'

export const CreateDocumentReport = () => {
  const { createDocumentReportFormik } = useCreateDocumentReport()

  return (
    <CreateReportContainer>
      <div className="pb-10">
        <FormikProvider value={createDocumentReportFormik}>
          <Form>
            <div className="w-full flex flex-col gap-4">
              <InputText name="title" label="Report title" />

              <CompanyDocumentInput name="documents" />

              {/* todo loading */}
              <SuccessButton onClick={createDocumentReportFormik.submitForm}>
                Create report
              </SuccessButton>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </CreateReportContainer>
  )
}
