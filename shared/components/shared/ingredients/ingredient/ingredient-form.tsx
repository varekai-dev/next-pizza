'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shared/components/ui'

import { CropImage } from '../../crop-image'
import { FormInput } from '../../form'
import { ImageCard } from '../../image-card'
import { Title } from '../../title'
import { FormIngredientValues, ingredientSchema } from './schema'

interface Props {
  className?: string
  defaultValues?: {
    name: string
    price: string
    imageUrl: string
  }
  handleSubmit: (data: FormData) => void
  isPending?: boolean
  empty?: boolean
}

export const IngredientForm: React.FC<Props> = ({ className, defaultValues, handleSubmit, isPending, empty }) => {
  const [file, setFile] = React.useState<File>()
  const form = useForm<FormIngredientValues>({
    resolver: zodResolver(ingredientSchema),
    defaultValues,
  })

  const currentImageUrl = form.watch('imageUrl')

  const onCropImage = (file: File) => {
    setFile(file)
    form.setValue('imageUrl', URL.createObjectURL(file))
  }

  const onSubmit = (data: FormIngredientValues) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('price', data.price)
    if (file) {
      formData.append('file', file)
    }
    handleSubmit(formData)
  }

  return (
    <div className={className}>
      <FormProvider {...form}>
        <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <div className="mr-2">
              <Title text="Ingredient" size="md" className="font-bold" />
            </div>
          </div>
          <div className="sm:flex-row flex-col-reverse sm:items-start  items-center flex sm:gap-10 gap-3  w-full">
            <div className="sm:w-auto w-full flex flex-col gap-5 min-w-[280px] h-full">
              <FormInput label="Name" name="name" placeholder="Name" required disabled={isPending} />
              <FormInput label="Price ₴" name="price" placeholder="Price" required type="number" disabled={isPending} />
            </div>
            <ImageCard
              empty={empty}
              isLoading={isPending}
              width={250}
              height={250}
              objectFit="cover"
              srcUrl={currentImageUrl}
              actions={
                <CropImage onCropImage={onCropImage} aspect={300 / 300}>
                  <Button type="button" variant="secondary" size="lg" className="text-lg">
                    Upload
                  </Button>
                </CropImage>
              }
            />
          </div>

          <Button type="submit" className="h-12 text-base" loading={isPending}>
            Save
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
