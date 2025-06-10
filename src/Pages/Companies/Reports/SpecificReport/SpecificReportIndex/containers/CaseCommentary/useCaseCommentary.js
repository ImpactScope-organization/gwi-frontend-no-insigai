import { useFormik } from 'formik'
import * as Yup from 'yup'

export const useCaseCommentary = () => {
  const comments = [
    {
      _id: '1',
      text: 'This is the first comment.',
      createdAt: '2023-10-01T12:00:00Z',
      user: {
        email: 'hello@hello.com',
        id: 123
      }
    },
    {
      _id: '12',
      text: 'This is the first comment.',
      createdAt: '2023-10-01T12:00:00Z',
      user: {
        email: 'hello@hello.com',
        id: 1254
      }
    }
  ]

  const caseCommentaryFormik = useFormik({
    initialValues: {
      comment: ''
    },
    validationSchema: Yup.object({
      comment: Yup.string().required()
    }),
    onSubmit: async (values) => {
      console.log('Submitting comment:', values)
    }
  })

  return {
    comments,
    caseCommentaryFormik
  }
}
