import React from "react";
import {Text, View} from 'react-native';
import { useState, useEffect } from "react";

export default function Countdown({time}) {
    const timer = parseInt({time}.time)
  const [mins, setMinutes] = useState(timer);
  const [secs, setSeconds] = useState(0);
  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(sampleInterval);
        } else {
          setMinutes(mins - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });

  return (
    <View style={{paddingTop:15}}>
        <Text style={{fontSize:15, color:'#b6d7a8'}}>{mins}:{secs < 10 ? `0${secs}` : secs}</Text>
    </View>
  );
}