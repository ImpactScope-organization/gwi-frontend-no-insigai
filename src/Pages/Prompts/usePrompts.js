import { useQuery } from '@tanstack/react-query'
import { getAllPrompts } from './api/PromptApi'
import { useMemo, useState } from 'react'

const FILTER_VALUES = {
  all: 'all',
  default: 'default'
}

const filterOptions = [
  { label: 'All', value: FILTER_VALUES.all },
  { label: 'Default', value: FILTER_VALUES.default }
]

export const usePrompts = () => {
  const [filter, setFilter] = useState(FILTER_VALUES.all)

  const { data: prompts } = useQuery({
    queryKey: ['getAllPrompts'],
    queryFn: () => getAllPrompts(),
    initialData: []
  })

  const filteredPrompts = useMemo(
    () =>
      prompts.filter((prompt) => {
        if (filter === FILTER_VALUES.all) {
          return true
        }
        if (filter === FILTER_VALUES.default) {
          return prompt.isDefault
        }
        return false
      }),
    [filter, prompts]
  )

  return {
    filteredPrompts,
    filterOptions,
    filter,
    setFilter
  }
}
