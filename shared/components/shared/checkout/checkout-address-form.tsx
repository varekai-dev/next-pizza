import React from 'react'

import { AddressInput } from '../address-input'
import { FormTextarea } from '../form'
import { WhiteBlock } from '../white-block'

interface Props {
  className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Delivery address" className={className}>
      <div className="flex flex-col gap-5">
        <AddressInput
          className="w-full relative"
          name="address"
          placeholder="Address"
          allowClear
          required
          label="Address"
        />
        <FormTextarea allowClear rows={5} name="comment" className="text-base" placeholder="Comment" label="Comment" />
      </div>
    </WhiteBlock>
  )
}
