import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput, FormTextarea } from '../form'
import AddressAutocomplete from '../input-address'

interface Props {
    className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title="3. Delivery address" className={className}>
            <div className="flex flex-col gap-5">
                <AddressAutocomplete />
                <FormTextarea
                    allowClear
                    rows={5}
                    name="comment"
                    className="text-base"
                    placeholder="Commentary"
                />
            </div>
        </WhiteBlock>
    )
}
