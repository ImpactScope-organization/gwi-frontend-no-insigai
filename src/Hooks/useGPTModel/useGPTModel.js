import { useGetGPTModels } from './api/useGPTApi'
import { useMemo } from 'react'

export const useGPTModel = () => {
  const { data } = useGetGPTModels()

  const gptModels = useMemo(
    () =>
      data?.map((gptModel) => ({
        value: gptModel.name,
        label: gptModel.name
      })) || [],
    [data]
  )

  const gptModelsWithNoTemperatureSupport = useMemo(
    () =>
      data?.filter((gptModel) => !gptModel?.hasTemperature).map((gptModel) => gptModel.name) || [],
    [data]
  )

  return {
    gptModels,
    gptModelsWithNoTemperatureSupport
  }
}
