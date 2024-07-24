import React from 'react'
import { Title } from './title'
import { FilterCheckbox } from './filter-checkbox'
import { Input } from '../ui'
import { RangeSlider } from './range-slider'
import { CheckboxFiltersGroup } from './checkbox-filters-group'

interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <Title text="Filters" size="sm" className="mb-5 font-bold" />
            {/* Filter checkboxes */}
            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Collectable" value="1" />
                <FilterCheckbox text="New" value="2" />
            </div>
            {/* Price range */}
            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Price from and to:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={500}
                        defaultValue={0}
                    />
                    <Input type="number" placeholder="500" min={50} max={500} />
                </div>
                <RangeSlider min={0} max={500} step={1} />
            </div>
            <CheckboxFiltersGroup
                className="mt-5"
                title="Ingredients"
                limit={6}
                items={[
                    {
                        text: 'Cheese sausage',
                        value: '1',
                    },
                    {
                        text: 'Pepperoni',
                        value: '2',
                    },
                    {
                        text: 'Mushrooms',
                        value: '3',
                    },
                    {
                        text: 'Onions',
                        value: '4',
                    },
                    {
                        text: 'Green Peppers',
                        value: '5',
                    },
                    {
                        text: 'Olives',
                        value: '6',
                    },
                    {
                        text: 'Cheese sausage',
                        value: '1',
                    },
                    {
                        text: 'Pepperoni',
                        value: '2',
                    },
                    {
                        text: 'Mushrooms',
                        value: '3',
                    },
                    {
                        text: 'Onions',
                        value: '4',
                    },
                    {
                        text: 'Green Peppers',
                        value: '5',
                    },
                    {
                        text: 'Olives',
                        value: '6',
                    },
                ]}
                defaultItems={[
                    {
                        text: 'Cheese sausage',
                        value: '1',
                    },
                    {
                        text: 'Pepperoni',
                        value: '2',
                    },
                    {
                        text: 'Mushrooms',
                        value: '3',
                    },
                    {
                        text: 'Onions',
                        value: '4',
                    },
                    {
                        text: 'Green Peppers',
                        value: '5',
                    },
                    {
                        text: 'Olives',
                        value: '6',
                    },
                    {
                        text: 'Cheese sausage',
                        value: '1',
                    },
                    {
                        text: 'Pepperoni',
                        value: '2',
                    },
                    {
                        text: 'Mushrooms',
                        value: '3',
                    },
                    {
                        text: 'Onions',
                        value: '4',
                    },
                    {
                        text: 'Green Peppers',
                        value: '5',
                    },
                    {
                        text: 'Olives',
                        value: '6',
                    },
                ]}
            />
        </div>
    )
}
