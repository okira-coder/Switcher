import React from "react";
import {Text, View} from 'react-native';
import { useState, useEffect } from "react";

export default function Decision({val}){
    const [decision,setDecision] = useState(true);
    if({val}){
        setDecision({val});
    }
    return decision
}