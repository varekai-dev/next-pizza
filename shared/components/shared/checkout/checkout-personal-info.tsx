import React from 'react'

import { FormInput, FormPhone } from '../form'
import { WhiteBlock } from '../white-block'

interface Props {
  className?: string
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Personal info" className={className}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormInput
          name="fullName"
          className="text-base"
          placeholder="Full Name"
          allowClear
          required
          label="Full Name"
        />
        <FormInput name="email" className="text-base" placeholder="Email" allowClear required label="Email" />

        <FormPhone
          name="phone"
          className="text-base"
          mask="+38(000)000-00-00"
          allowClear
          required
          label="Phone Number"
        />
      </div>
    </WhiteBlock>
  )
}
