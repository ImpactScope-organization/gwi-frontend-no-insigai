import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { ROUTES } from '../../../routes'
import { Form, FormikProvider } from 'formik'
import { InputText } from '../../../Components/Fields/InputText'
import { QuantitativeToggle } from '../../../Components/Fields/QuantitativeToggle'
import { SuccessButton } from '../../../Components/Buttons/SuccessButton'
import { CheckSquareFilled } from '@ant-design/icons'
import React from 'react'
import { useCreateCompany } from './useCreateCompany'

export const CreateCompany = () => {
  const { createCompanyFormik } = useCreateCompany()

  return (
    <TitleWithBackButton title="New Company" to={ROUTES.companies.index}>
      <FormikProvider value={createCompanyFormik}>
        <div className="flex flex-col w-full gap-4 lg:flex-row">
          <Form className="flex flex-col gap-4 w-full">
            <div className="flex flex-col lg:w-2/3 xl:w-1/2 gap-4">
              <div className="flex flex-col w-full gap-4">
                <InputText name="name" label="Name" />
                <InputText name="companyId" label="Company Id" />
              </div>

              <div className="flex w-full gap-4">
                <SuccessButton
                  onClick={createCompanyFormik.submitForm}
                  icon={<CheckSquareFilled />}
                >
                  Save company
                </SuccessButton>
              </div>
            </div>
          </Form>
        </div>
      </FormikProvider>
    </TitleWithBackButton>
  )
}
