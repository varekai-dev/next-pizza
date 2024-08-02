import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput } from '../form'

interface Props {
    className?: string
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title="2. Personal info" className={className}>
            <div className="grid grid-cols-2 gap-5">
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
                <FormInput
                    name="phone"
                    className="text-base"
                    placeholder="Phone"
                    allowClear
                />
            </div>
        </WhiteBlock>
    )
}
