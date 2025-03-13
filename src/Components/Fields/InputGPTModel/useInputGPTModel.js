import { useGetGPTModels } from './api/useGPTApi'

export const useInputGPTModel = () => {
  const { data } = useGetGPTModels()

  const gptModels = data?.map((gptModel) => ({
    value: gptModel,
    label: gptModel
  }))

  return {
    gptModels
  }
}
