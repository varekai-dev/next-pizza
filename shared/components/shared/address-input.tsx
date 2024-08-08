'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Autocomplete, useLoadScript } from '@react-google-maps/api'

import { Skeleton } from '../ui'
import { FormInput } from './form'
import { FormInputProps } from './form/form-input'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

type AutocompleteType = google.maps.places.Autocomplete

interface Props extends FormInputProps {
  className?: string
}

export const AddressInput: React.FC<Props> = ({ className, name, ...props }) => {
  const { trigger } = useFormContext()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: String(API_KEY),
    libraries: ['places'],
    language: 'en',
  })

  const autocompleteRef = React.useRef<any>()

  const onPlaceChanged = React.useCallback(() => {
    trigger('address')
  }, [trigger])

  const onLoad = React.useCallback(
    (autocomplete: AutocompleteType) => {
      autocompleteRef.current = autocomplete
      autocomplete.addListener('place_changed', onPlaceChanged)
    },
    [onPlaceChanged],
  )

  if (loadError) {
    return <div>Error loading Google Maps</div>
  }

  if (!isLoaded) {
    return <Skeleton className="h-12" />
  }

  return (
    <div className={className}>
      <Autocomplete
        onPlaceChanged={onPlaceChanged}
        onLoad={onLoad}
        fields={['address_components', 'formatted_address']}
        options={{
          types: ['address'], // Restrict to addresses
          componentRestrictions: { country: 'ua' }, // Restrict to Ukraine
        }}
      >
        <FormInput autoComplete="shipping address-line1" name={name} {...props} className="text-base" />
      </Autocomplete>
    </div>
  )
}
