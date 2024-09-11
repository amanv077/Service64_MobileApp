/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';



// const data = [{
//     label: "maaz"
// }]
const KEYS_TO_FILTERS = ["label"];

export default ({ placeholder, filteData, data = [] }) => {
    const [searchTerm, setSearchTerm] = React.useState("")

    const searchUpdated = (term) => {
        setSearchTerm(term)
    }

    React.useEffect(() => {
        filteData(data.filter(createFilter(searchTerm, KEYS_TO_FILTERS)))
    }, [searchTerm])

    return (
        <View style={styles.container}>
            <SearchInput
                style={{ fontSize: 13 }}
                onChangeText={(term) => { searchUpdated(term) }}
                placeholder={placeholder}
                placeholderTextColor={"#7f8584"}
            />
            {/* <ScrollView>
                {filteredEmails.map(email => {
                    return (
                        <TouchableOpacity onPress={() => {}} key={""} style={styles.emailItem}>
                            <View>
                                <Text>{email.label}</Text>
                                <Text style={styles.emailSubject}>{data.label}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView> */}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // justifyContent: 'flex-start'
    },
    emailItem: {
        // borderBottomWidth: 0.5,
        // borderColor: 'rgba(0,0,0,0.3)',
        // padding: 10
    },
    emailSubject: {
        // color: 'rgba(0,0,0,0.5)'
    },
    searchInput: {
        // padding: 10,
        // borderColor: '#CCC',
        // borderWidth: 1
    }
});