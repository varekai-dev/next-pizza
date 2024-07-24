import {
    Container,
    Filters,
    ProductsGroupList,
    Title,
    TopBar,
} from '@/components/shared'

const items = [
    {
        id: 1,
        name: 'Pizza 1',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.jpg',
        items: [{ price: 50 }],
    },
    {
        id: 1,
        name: 'Pizza 1',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.jpg',
        items: [{ price: 50 }],
    },
    {
        id: 1,
        name: 'Pizza 1',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.jpg',
        items: [{ price: 50 }],
    },
    {
        id: 1,
        name: 'Pizza 1',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.jpg',
        items: [{ price: 50 }],
    },
    {
        id: 1,
        name: 'Pizza 1',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.jpg',
        items: [{ price: 50 }],
    },
    {
        id: 1,
        name: 'Pizza 1',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.jpg',
        items: [{ price: 50 }],
    },
]

export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <Title
                    text="All pizza's"
                    size="lg"
                    className="font-extrabold"
                />
            </Container>
            <TopBar />
            <Container className="mt-10 pb-14">
                <div className="flex gap-[60px]">
                    {/* Filters */}
                    <div className="w-[250px]">
                        <Filters />
                    </div>
                    {/* Products */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductsGroupList
                                items={items}
                                title="Pizza"
                                categoryId={1}
                            />
                            <ProductsGroupList
                                items={items}
                                title="Combo"
                                categoryId={2}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
