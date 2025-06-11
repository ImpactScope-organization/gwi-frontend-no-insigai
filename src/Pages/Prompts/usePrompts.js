import { useQuery } from '@tanstack/react-query'
import { getAllPrompts } from './api/PromptApi'
import { useState } from 'react'

export const usePrompts = () => {
  const FILTER_VALUES = {
    all: 'all',
    default: 'default'
  }

  const filterOptions = [
    { label: 'All', value: FILTER_VALUES.all },
    { label: 'Default', value: FILTER_VALUES.default }
  ]

  const [filter, setFilter] = useState(FILTER_VALUES.all)

  const { data: prompts } = useQuery({
    queryKey: ['getAllPrompts'],
    queryFn: () => getAllPrompts(),
    initialData: []
  })

  const filteredPrompts = prompts.filter((prompt) => {
    if (filter === FILTER_VALUES.all) {
      return true
    }
    if (filter === FILTER_VALUES.default) {
      return prompt.isDefault
    }
    return false
  })

  return {
    filteredPrompts,
    filterOptions,
    filter,
    setFilter
  }
}
