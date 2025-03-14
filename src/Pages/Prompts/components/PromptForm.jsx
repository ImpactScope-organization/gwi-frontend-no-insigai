import { Form, useFormikContext } from 'formik'
import { InputText } from '../../../Components/Fields/InputText'
import { InputTextarea } from '../../../Components/Fields/InputTextarea/InputTextarea'
import { FileInput } from '../../../Components/Fields/FileInput'
import { SuccessButton } from '../../../Components/Buttons/SuccessButton'
import { CheckSquareFilled, ExperimentOutlined } from '@ant-design/icons'
import { InfoButton } from '../../../Components/Buttons/InfoButton'
import { PromptOutput } from './PromptOutput'
import React, { useMemo } from 'react'
import { ExistingFileInput } from '../../../Components/Fields/ExistingFileInput'
import { CategorySelect } from './CategorySelect/CategorySelect'
import { InputNumber } from '../../../Components/Fields/InputNumber'
import { InputGPTModel } from '../../../Components/Fields/InputGPTModel/InputGPTModel'
import { useGPTModel } from '../../../Hooks/useGPTModel/useGPTModel'
import { Alert } from 'antd'

export const PromptForm = ({ handleTest, output, edit = false }) => {
  const { submitForm, values } = useFormikContext()
  const { gptModelsWithNoTemperatureSupport } = useGPTModel()

  const isTemperatureIgnored = useMemo(
    () => gptModelsWithNoTemperatureSupport.includes(values?.gptModel),
    [gptModelsWithNoTemperatureSupport, values?.gptModel]
  )

  return (
    <div className="flex flex-col w-full gap-4 lg:flex-row">
      <Form className="flex flex-col gap-4 w-full">
        <div className="flex w-full gap-4">
          <InputText name="name" label="Name" />
          <CategorySelect name="category" />
        </div>
        <div className="flex w-full gap-4">
          <InputNumber name="temperature" label="Temperature" min={0} max={1} />
          <InputGPTModel name="gptModel" label="GPT Model" />
        </div>
        {isTemperatureIgnored && (
          <Alert
            message="GPT Model does not support temperature"
            description="You selected a GPT model which does not support temperature, your prompt will run as it is, but the temperature field will be ignored."
            type="info"
            showIcon
          />
        )}
        <InputTextarea name="prompt" label="Prompt" />
        {edit ? (
          <ExistingFileInput name="file" updateName="file_update" />
        ) : (
          <FileInput name="file" />
        )}

        <div className="flex w-full gap-4">
          <SuccessButton onClick={submitForm} icon={<CheckSquareFilled />}>
            Save prompt
          </SuccessButton>
          <InfoButton
            icon={<ExperimentOutlined />}
            onClick={async () => {
              await handleTest(values)
            }}
            disabled={edit && values?.file_update}
          >
            Test prompt
          </InfoButton>
        </div>
      </Form>
      <PromptOutput output={output} />
    </div>
  )
}
