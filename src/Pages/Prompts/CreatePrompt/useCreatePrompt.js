import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPrompt, testPrompt } from '../api/PromptApi'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getUrlWithParameters } from '../../../utils/route'
import { ROUTES } from '../../../routes'

export const useCreatePrompt = () => {
  const navigate = useNavigate()

  const [output, setOutput] = useState(undefined)

  const getForm = useCallback(({ name, category, prompt, file, temperature, gptModel }) => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('category', category)
    formData.append('temperature', temperature)
    formData.append('gptModel', gptModel)
    formData.append('prompt', prompt)
    formData.append('file', file)

    return formData
  }, [])

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const {
          result: { id }
        } = await createPrompt(getForm(values))

        toast.success('Prompt saved successfully')
        navigate(getUrlWithParameters(ROUTES.prompts.edit, { id }))
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
    [getForm, navigate]
  )

  const handleTest = useCallback(
    async (values) => {
      setOutput('Loading...')
      try {
        const testResult = await testPrompt(getForm(values))
        setOutput(testResult?.result)
        toast.success('Test completed successfully')
      } catch (error) {
        setOutput('Error submitting form: ' + error)
      }
    },
    [getForm]
  )

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      prompt: '',
      temperature: 0.2,
      gptModel: 'gpt-4o',
      file: null
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      category: Yup.string().required('Category is required'),
      prompt: Yup.string().required('Prompt is required'),
      temperature: Yup.number().required('Temperature is required'),
      gptModel: Yup.string().required('GPT Model is required'),
      file: Yup.mixed().required('File is required')
    }),
    onSubmit: async (values) => {
      await handleSubmit(values)
    }
  })

  return {
    output,
    handleTest,
    formik
  }
}
