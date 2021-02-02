import React, { useState } from 'react'
import MapGL, { Marker } from '@urbica/react-map-gl'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { Box } from '@chakra-ui/react'

const Map = (props: any) => {
  const [viewport, setViewport] = useState({
    latitude: props.latitude,
    longitude: props.longitude,
    zoom: 13
  })

  const onMarkerClick = (event) => {
    alert('You clicked on marker')
    event.stopPropagation()
  }

  return (
      <MapGL
          style={{ width: '100%', height: '400px' }}
          mapStyle='mapbox://styles/mapbox/streets-v11'
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          onViewportChange={setViewport}
          {...props}
      >
        <Marker
            longitude={props.longitude}
            latitude={props.latitude}
            onClick={onMarkerClick}
        >
          <Box as={FaMapMarkerAlt} size={32} color={'orange.500'} marginBottom={7}/>
        </Marker>
      </MapGL>
  )
}

export default Map
