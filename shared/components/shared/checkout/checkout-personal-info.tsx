import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput, FormPhone } from '../form'

interface Props {
    className?: string
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title="2. Personal info" className={className}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormInput
                    name="firstName"
                    className="text-base"
                    placeholder="First Name"
                    allowClear
                />
                <FormInput
                    name="lastName"
                    className="text-base"
                    placeholder="Last Name"
                    allowClear
                />
                <FormInput
                    name="email"
                    className="text-base"
                    placeholder="Email"
                    allowClear
                />

                <FormPhone
                    name="phone"
                    className="text-base"
                    mask="+38(000)000-00-00"
                    allowClear
                />
            </div>
        </WhiteBlock>
    )
}
