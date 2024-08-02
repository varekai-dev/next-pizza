'use client'

import React from 'react'
import { useLoadScript, StandaloneSearchBox } from '@react-google-maps/api'
import { FormInput } from './form'
import { Skeleton } from '../ui'

const libraries = ['places']

const ternopilBounds = {
    north: 49.609,
    south: 49.52,
    east: 25.644,
    west: 25.507,
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const AddressAutocomplete = () => {
    const [value, setValue] = React.useState<string | undefined>('')
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: String(API_KEY),
        libraries: libraries as any,
        language: 'en',
    })

    const searchBoxRef = React.useRef<google.maps.places.SearchBox | null>(null)

    const handlePlaceChanged = () => {
        if (searchBoxRef.current && searchBoxRef.current.getPlaces) {
            const places = searchBoxRef.current.getPlaces()
            console.log('places', places)
            if (!places || places?.length === 0) {
                return
            }
            const place = places[0]
            console.log('place', place)
            setValue(place.formatted_address)
        }
    }

    if (loadError) {
        return <div>Error loading Google Maps</div>
    }

    if (!isLoaded) {
        return <Skeleton className="h-12" />
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <div className="w-full relative">
            <StandaloneSearchBox
                ref={searchBoxRef as any}
                bounds={ternopilBounds}
                onPlacesChanged={handlePlaceChanged}
            >
                <FormInput
                    value={value}
                    onChange={handleChange}
                    autoComplete="shipping address-line1"
                    name="address"
                    placeholder="Address"
                    className="text-base"
                />
            </StandaloneSearchBox>
        </div>
    )
}

export default AddressAutocomplete
