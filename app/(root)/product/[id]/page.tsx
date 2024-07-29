import {
    Container,
    GroupVariants,
    ProductImage,
    Title,
} from '@/shared/components/shared'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export default async function ProductPage({
    params: { id },
}: {
    params: { id: string }
}) {
    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
    })

    if (!product) {
        return notFound()
    }
    return (
        <Container className="flex flex-col my-10">
            <div className="flex ">
                <ProductImage
                    size={40}
                    src={product.imageUrl}
                    alt={product.name}
                    className=""
                />
                <div className="w-[490] bg-[#FCFCFC] p-7">
                    <Title
                        text={product.name}
                        size="md"
                        className="font-extrabold mb-1"
                    />
                    <p className="text-gray-400">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Ipsam voluptatibus necessitatibus
                    </p>
                    <GroupVariants
                        items={[
                            {
                                name: 'Small',
                                value: '1',
                            },
                            {
                                name: 'Middle',
                                value: '2',
                            },
                            {
                                name: 'Large',
                                value: '3',
                                disabled: true,
                            },
                        ]}
                        selectedValue="2"
                    />
                </div>
            </div>
        </Container>
    )
}
