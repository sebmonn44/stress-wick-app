import React from "react";
import {Text, View} from 'react-native'
import {  useQuery } from "react-query";
const fetchTrains = async () => {
const result = await fetch('http://192.168.1.106:3000/trains')
  return result.json()
}

const Time = ({train}) => {
  const utcToEpoch = Math.floor(new Date(train.expectedArrival) / 1000)
  const now = Math.floor(Date.now()/1000)
  const etaInMinutes = (utcToEpoch-now)/60
  return (
    <Text>{etaInMinutes}</Text>
  )
}

const RenderExpectedTime = ({data}) => {
 
  if(!data) {
    return (
      <View>
        <Text>loading ...</Text>
      </View>
    )
  }

  return (
    <View>
      <Time train={data[0]} />
    </View>
    
  )
}





//method from utc to epoch in js


const MyTrain = () => {

  const result = useQuery({ queryKey: ['trains'], queryFn: fetchTrains })
  
  if(!result.data){
    return null
  }
  const inboundTrains = result.data?.filter(train => train.direction === 'inbound' )
  const outboundTrains = result.data?.filter(train => train.direction === 'outbound' ) 
  const finalDestinationInbound = inboundTrains[0].destinationName
  const finalDestinationOutbound = outboundTrains[0].destinationName
  const platformInbound = inboundTrains[0].platformName
  const platformIOutbound = outboundTrains[0].platformName

  return (
    <View>
     <Text>My next train at Hackney wick is at: </Text>
     <RenderExpectedTime data={inboundTrains} />
     <Text>{platformInbound}</Text>
     <Text>----------</Text>
     <Text>my train will finish at:</Text>
     <Text>{finalDestinationInbound}</Text>
     <Text>----------</Text>
     <Text>My next train at Hackney wick is at: </Text>
     <RenderExpectedTime data={outboundTrains} />
     <Text>{platformIOutbound}</Text>
     <Text>----------</Text>
     <Text>my train will finish at:</Text>
     <Text>{finalDestinationOutbound}</Text>

    </View>
  )
  
}

export default MyTrain
//Math.floor(new Date('2011-03-29 17:06:21 UTC') / 1000)