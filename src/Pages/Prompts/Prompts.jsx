import { PageContainer } from '../../Components/Page/PageContainer/PageContainer'
import { PageHeader } from '../../Components/Page/PageHeader/PageHeader'
import React from 'react'
import { PageContentContainer } from '../../Components/Page/PageContentContainer/PageContentContainer'
import { getRouteWithId, ROUTES } from '../../routes'
import { ButtonLink } from '../../Components/ButtonLink/ButtonLink'
import { usePrompts } from './usePrompts'
import { CategorizedListItemLink } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import { CategorizedListContainer } from '../../Components/CategorizedList/CategorizedListContainer/CategorizedListContainer'
import { CategorizedListItemDate } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemDate'
import { handleDateFormat } from '../../utils/date'
import { CategorizedListItemTitle } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { CategorizedListItemCategoryContainer } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategoryContainer'
import { CategorizedListItemCategory } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategory'
import { PageTab } from '../../Components/Page/PageTab/PageTab'
import { ToggleButton } from '../../Components/Buttons/ToggleButton'
import { FormHeading } from '../../Components/Text/FormHeading'

export const Prompts = () => {
  const { filteredPrompts, filter, setFilter, filterOptions } = usePrompts()

  return (
    <PageContainer>
      <PageHeader title="Prompts" subTitle="Overview all of prompts here">
        <ButtonLink to={ROUTES.prompts.create}>Add new prompt</ButtonLink>
      </PageHeader>

      <PageContentContainer>
        <PageTab to={ROUTES.prompts.index}>Prompts</PageTab>
        <PageTab to={ROUTES.promptCategories.index}>Prompt Categories</PageTab>
      </PageContentContainer>

      <div className="mb-4 pb-4 border-b-2 border-gray-200 border-solid">
        <FormHeading>Filters</FormHeading>
        <div className="flex gap-4">
          {filterOptions.map((option) => (
            <ToggleButton
              key={option.value}
              isActive={filter === option.value}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </ToggleButton>
          ))}
        </div>
      </div>

      <PageContentContainer>
        <CategorizedListContainer>
          {filteredPrompts.map((prompt) => (
            <CategorizedListItemLink
              to={getRouteWithId(ROUTES.prompts.edit, prompt?.id)}
              key={`prompt_list_item_${prompt.id}`}
            >
              <CategorizedListItemDate>
                {handleDateFormat(prompt?.updatedAt)}
              </CategorizedListItemDate>
              <CategorizedListItemTitle>{prompt?.name}</CategorizedListItemTitle>
              <CategorizedListItemCategoryContainer>
                Category:
                <CategorizedListItemCategory>{prompt?.category}</CategorizedListItemCategory>
              </CategorizedListItemCategoryContainer>
            </CategorizedListItemLink>
          ))}
        </CategorizedListContainer>
      </PageContentContainer>
    </PageContainer>
  )
}
