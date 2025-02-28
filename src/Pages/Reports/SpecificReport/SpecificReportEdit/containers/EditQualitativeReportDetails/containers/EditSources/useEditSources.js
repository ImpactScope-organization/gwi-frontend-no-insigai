import { useFormikContext } from 'formik'
import { useCallback, useEffect, useState } from 'react'
import { toJSON } from '../../../../../../../../utils/json'

export const useEditSources = () => {
  const formik = useFormikContext()

  const [sourcesSet, setSourcesSet] = useState(false)
  const [sources, setSources] = useState([])

  useEffect(() => {
    if (!sourcesSet && formik.values?.sources) {
      setSources(toJSON(formik.values?.sources))
      setSourcesSet(true)
    }
  }, [formik.values?.sources, sourcesSet])

  const syncFormikSources = useCallback(
    (sourcesToSet) => {
      formik.setFieldValue('sources', JSON.stringify(sourcesToSet))
    },
    [formik]
  )

  const onTitleChange = useCallback(
    (e, index) => {
      const upcomingSources = sources?.map((cSource, cIndex) => {
        if (cIndex === index) {
          return {
            ...cSource,
            title: e.target.value
          }
        }
        return cSource
      })
      setSources(upcomingSources)
      syncFormikSources(upcomingSources)
    },
    [sources, syncFormikSources]
  )

  const onDescriptionChange = useCallback(
    (upcomingValue, index) => {
      const upcomingSources = sources?.map((cSource, cIndex) => {
        if (cIndex === index) {
          return {
            ...cSource,
            description: upcomingValue
          }
        }
        return cSource
      })
      setSources(upcomingSources)
      syncFormikSources(upcomingSources)
    },
    [sources, syncFormikSources]
  )

  const onAddSource = useCallback(() => {
    const upcomingSources = [
      ...sources,
      {
        title: '',
        description: ''
      }
    ]
    setSources(() => upcomingSources)
  }, [sources])

  const onDeleteSource = useCallback(
    (source, index) => {
      if (
        window.confirm(
          `Are you sure you want to delete this Source? \n${source?.title || source?.Title}`
        )
      ) {
        const upcomingSources = sources?.filter((_, indexToFilter) => indexToFilter !== index)
        setSources(upcomingSources)
        syncFormikSources(upcomingSources)
      }
    },
    [sources, syncFormikSources]
  )

  return {
    sources,
    onTitleChange,
    onDescriptionChange,
    onAddSource,
    onDeleteSource
  }
}
