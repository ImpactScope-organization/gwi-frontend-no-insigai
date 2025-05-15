import { renderHook, act } from '@testing-library/react'
import { useCompanyDocumentInput } from './useCompanyDocumentInput'
import { useFormikContext } from 'formik'
import { useGetCompanyDocuments } from '../../../../../../api/CompanyApiQuery'

const mockInputName = 'documents'

const mockFormikContextValue = jest.fn()
const mockSetFieldValue = jest.fn()

jest.mock('formik', () => ({
  useFormikContext: () => ({
    values: { [mockInputName]: mockFormikContextValue() },
    setFieldValue: mockSetFieldValue
  })
}))

jest.mock('../../../../../../api/CompanyApiQuery', () => ({
  useGetCompanyDocuments: jest.fn()
}))

describe('useCompanyDocumentInput', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFormikContextValue.mockReturnValue([])
    useGetCompanyDocuments.mockReturnValue({
      companyDocuments: [
        { year: 2023, documents: [{ reportType: 'B' }, { reportType: 'A' }] },
        { year: 2022, documents: [{ reportType: 'D' }] }
      ],
      flattenedCompanyDocuments: [{ documentId: 1 }, { documentId: 2 }]
    })
  })

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

    expect(result.current.hasDocuments).toBe(false)
    expect(result.current.companyDocuments).toHaveLength(2)
    expect(result.current.yearDocuments).toEqual([])
  })

  describe('yearDocuments', () => {
    it('should list active year yearDocuments', () => {
      const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

      act(() => {
        result.current.setYear(2022)
      })

      expect(result.current.yearDocuments).toEqual([{ reportType: 'D' }])
    })
    it('should sort yearDocuments', () => {
      const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

      act(() => {
        result.current.setYear(2023)
      })

      expect(result.current.yearDocuments).toEqual([{ reportType: 'A' }, { reportType: 'B' }])
    })
  })

  describe('currentCompanyDocuments', () => {
    it('should list current company documents', () => {
      mockFormikContextValue.mockReturnValue([1, 2])
      const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

      act(() => {
        result.current.setYearDocument(1)
      })

      expect(result.current.currentCompanyDocuments).toEqual([{ documentId: 1 }, { documentId: 2 }])
    })
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
    mockFormikContextValue.mockReturnValue([1, 2])

    const { result } = renderHook(() => useCompanyDocumentInput({ name: mockInputName }))

    act(() => {
      result.current.handleRemoveDocument(1)
    })

    expect(mockSetFieldValue).toHaveBeenCalledWith('documents', [2])
  })
})
