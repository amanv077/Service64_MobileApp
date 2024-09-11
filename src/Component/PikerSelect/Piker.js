// import React from "react"
// import RNPickerSelect from 'react-native-picker-select';



// export default ({ placeholder, value, style, onValueChange, items }) => {
//     return <RNPickerSelect
//         placeholder={placeholder}
//         onValueChange={(value) => onValueChange(value)}
//         value={value}
//         style={style}
//         items={items}
//     />
// }


import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import Collapsible from 'react-native-collapsible';

export default ({ title, items, onValueChange, collapsed }) => {
    // const [collapsed, setCollapsed] = useState(false)
    return (
        <View  >
            <TouchableOpacity style={{}} activeOpacity={1} onPress={() => { "setCollapsed(!collapsed)" }}>
                <View style={{ height: 65, backgroundColor: "green", borderBottomColor: "#e7edee", borderBottomWidth: 1, justifyContent: "center", paddingHorizontal: 15 }} >
                    <Text style={{ fontSize: 14, color: "#2f3432" }} >{title}</Text>
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} align="center">
                <TouchableOpacity onPress={() => {
                    onValueChange(v)
                    // setCollapsed(!collapsed)
                }} >
                    <View style={styles.content}>
                        <Text style={{ fontSize: 14, color: "#2f3432", }} >{"Name"}</Text>
                    </View>
                </TouchableOpacity>

            </Collapsible>
        </View>
    )
}

const styles = StyleSheet.create({


    header: {
        height: 45,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomColor: "#c1c1c1",
        borderBottomWidth: 0.3,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '500',
    },
    content: {
        backgroundColor: '#fff',
        paddingHorizontal: 35,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#c1c1c1",
        borderBottomWidth: 0.3,
        // paddingVertical: 10
        height:80
    },
});










// import React, { useState } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     TouchableOpacity,
//     Image
// } from 'react-native';
// import Collapsible from 'react-native-collapsible';

// export default ({ title, items, onValueChange, }) => {
//     const [collapsed, setCollapsed] = useState(false)
//     return (
//         <View  >
//             <TouchableOpacity style={{}} activeOpacity={1} onPress={() => setCollapsed(!collapsed)}>
//                 <View style={{ height: 65, backgroundColor: "green", borderBottomColor: "#e7edee", borderBottomWidth: 1, justifyContent: "center", paddingHorizontal: 15 }} >
//                     <Text style={{ fontSize: 14, color: "#2f3432" }} >{title}</Text>
//                 </View>
//             </TouchableOpacity>
//             <Collapsible collapsed={collapsed} align="center">
//                 <TouchableOpacity key={i} onPress={() => {
//                     onValueChange(v)
//                     setCollapsed(!collapsed)
//                 }} >
//                     <View style={styles.content}>
//                         <Text style={{ fontSize: 14, color: "#2f3432", }} >{v.label}</Text>

//                         {/* <Text style={styles.headerText}>{v.label}</Text> */}
//                     </View>
//                 </TouchableOpacity>

//             </Collapsible>
//         </View>
//     )
// }

// const styles = StyleSheet.create({


//     header: {
//         height: 45,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         paddingHorizontal: 10,
//         borderBottomColor: "#c1c1c1",
//         borderBottomWidth: 0.3,
//     },
//     headerText: {
//         textAlign: 'center',
//         fontSize: 12,
//         fontWeight: '500',
//     },
//     content: {
//         backgroundColor: '#fff',
//         paddingHorizontal: 35,
//         backgroundColor: "#fff",
//         flexDirection: "row",
//         alignItems: "center",
//         borderBottomColor: "#c1c1c1",
//         borderBottomWidth: 0.3,
//         paddingVertical: 10
//     },
// });