'use client'

import React from 'react'
import { useLoadScript, Autocomplete } from '@react-google-maps/api'
import { FormInput } from './form'
import { Skeleton } from '../ui'
import { useFormContext } from 'react-hook-form'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

type AutocompleteType = google.maps.places.Autocomplete

const AddressAutocomplete = () => {
    const { trigger } = useFormContext()
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: String(API_KEY),
        libraries: ['places'],
        language: 'en',
    })

    const autocompleteRef = React.useRef<any>()

    const onPlaceChanged = React.useCallback(() => {
        const place = autocompleteRef?.current?.getPlace()

        trigger('address')
    }, [trigger])

    const onLoad = React.useCallback(
        (autocomplete: AutocompleteType) => {
            autocompleteRef.current = autocomplete
            autocomplete.addListener('place_changed', onPlaceChanged)
        },
        [onPlaceChanged]
    )

    if (loadError) {
        return <div>Error loading Google Maps</div>
    }

    if (!isLoaded) {
        return <Skeleton className="h-12" />
    }

    return (
        <div className="w-full relative">
            <Autocomplete
                onPlaceChanged={onPlaceChanged}
                onLoad={onLoad}
                fields={['address_components', 'formatted_address']}
                options={{
                    types: ['address'], // Restrict to addresses
                    componentRestrictions: { country: 'ua' }, // Restrict to Ukraine
                    bounds: new window.google.maps.LatLngBounds(
                        new window.google.maps.LatLng(49.528, 25.553), // Southwest corner of Ternopil
                        new window.google.maps.LatLng(49.568, 25.623) // Northeast corner of Ternopil
                    ),
                }}
            >
                <FormInput
                    autoComplete="shipping address-line1"
                    name="address"
                    placeholder="Address"
                    className="text-base"
                />
            </Autocomplete>
        </div>
    )
}

export default AddressAutocomplete
