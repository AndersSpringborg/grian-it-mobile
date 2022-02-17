import {View, Text} from "./Themed";
import * as Battery from 'expo-battery';
import {FC, useEffect, useState} from "react";
import {TouchableOpacity} from "react-native";
import * as Location from 'expo-location';
import Colors from "../constants/Colors";

export default ApiTest = () => {
    const [battery, setBattery] = useState<number>(0);
    const [cords, setCords] = useState<Location.LocationObject| undefined>();
    const [errorMsg, setErrorMsg] = useState("");

    const updateBattery: () => void = () => Battery.getBatteryLevelAsync().then(b => setBattery(b));
    function updateGps() {
        setCords(undefined);
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setCords(location.coords);
        })();
    }

    function updateProps(){
        updateBattery();
        updateGps();
    }

    useEffect(() => {
        updateProps()
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            updateProps();
        }, 5000);
        return () => clearInterval(interval);
    }, []);


    return (
        <View>
            <Text>
                Battery pct at: {(battery * 100).toFixed(2)} %
            </Text>
            <GeoLocation cords={cords} errorMsg={errorMsg}/>
            <UpdateButton updateTrigger={updateProps}/>
        </View>)
}

interface GeoProps {
    cords: Location.LocationObjectCoords | undefined;
    errorMsg: string;
}

const GeoLocation: FC<GeoProps> = ({cords, errorMsg}) => {

    if(!cords)
        return <Text>Gettings location... </Text>
    if (errorMsg)
        return <Text>{errorMsg}</Text>;

    return(
        <View>
            <Text>long: {cords.longitude.toFixed(6)}</Text>
            <Text>lat:    {cords.latitude.toFixed(6)}</Text>
        </View>

    );
}


import { StyleSheet } from 'react-native';

const UpdateButton = ({updateTrigger} : {updateTrigger: () => void}) => (
    <View style={styles.helpContainer}>
    <TouchableOpacity onPress={updateTrigger} style={styles.helpLink}>
        <Text style={styles.helpLinkText} lightColor={Colors.light.tint} darkColor={Colors.dark.tint}>
            Press this, to force an update on battery and gps.
        </Text>
    </TouchableOpacity>
</View>)

const styles = StyleSheet.create({
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightContainer: {
        borderRadius: 3,
            paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
            lineHeight: 24,
            textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
            marginHorizontal: 20,
            alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
    }
});
