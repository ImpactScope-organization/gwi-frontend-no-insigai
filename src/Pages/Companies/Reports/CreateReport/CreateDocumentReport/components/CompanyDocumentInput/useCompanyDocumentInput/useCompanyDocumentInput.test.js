import { renderHook, act } from '@testing-library/react'
import { useCompanyDocumentInput } from './useCompanyDocumentInput'
import { useFormikContext } from 'formik'
import { useGetCompanyDocuments } from '../../../../../../api/CompanyApiQuery'

jest.mock('formik', () => ({
  useFormikContext: jest.fn()
}))

jest.mock('../../../../../../api/CompanyApiQuery', () => ({
  useGetCompanyDocuments: jest.fn()
}))

const mockInputName = 'documents'

describe('useCompanyDocumentInput', () => {
  const mockSetFieldValue = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useFormikContext.mockReturnValue({
      values: { documents: [] },
      setFieldValue: mockSetFieldValue
    })
    useGetCompanyDocuments.mockReturnValue({
      companyDocuments: [{ year: 2023, documents: [{ reportType: 'A' }, { reportType: 'B' }] }],
      flattenedCompanyDocuments: [{ documentId: 1 }, { documentId: 2 }]
    })
  })

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

    expect(result.current.hasDocuments).toBe(false)
    expect(result.current.companyDocuments).toHaveLength(1)
    expect(result.current.yearDocuments).toEqual([])
  })

  it('should update year and filter yearDocuments', () => {
    const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

    act(() => {
      result.current.setYear(2023)
    })

    expect(result.current.yearDocuments).toEqual([{ reportType: 'A' }, { reportType: 'B' }])
  })

  it('should add a document', () => {
    const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

    act(() => {
      result.current.setYearDocument(1)
    })

    act(() => {
      result.current.handleAddDocument()
    })

    expect(mockSetFieldValue).toHaveBeenCalledWith('documents', [1])
  })

  it('should remove a document', () => {
    useFormikContext.mockReturnValue({
      values: { documents: [1, 2] },
      setFieldValue: mockSetFieldValue
    })

    const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

    act(() => {
      result.current.handleRemoveDocument(1)
    })

    expect(mockSetFieldValue).toHaveBeenCalledWith('documents', [2])
  })
})
