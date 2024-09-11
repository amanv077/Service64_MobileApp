import React, { Component } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue',
        marginBottom: 10,
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            images: null,
        };
    }

    pickSingleWithCamera() {
        ImagePicker.openCamera({
            cropping: true,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType: "photo",
        })
            .then((image) => {
                console.log('received image', image);
                this.setState({
                    image: {
                        uri: image.path,
                        width: image.width,
                        height: image.height,
                        mime: image.mime,
                    },
                    images: null,
                });
            })
            .catch((e) => alert(e));
    }


    pickSingle() {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            cropperCircleOverlay: false,
            sortOrder: 'none',
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
            cropperStatusBarColor: 'white',
            cropperToolbarColor: 'white',
            cropperActiveWidgetColor: 'white',
            cropperToolbarWidgetColor: '#3498DB',
        })
            .then((image) => {
                console.log('received image', image);
                this.setState({
                    image: {
                        uri: image.path,
                        width: image.width,
                        height: image.height,
                        mime: image.mime,
                    },
                    images: null,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }




    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.pickSingleWithCamera(true)}
                    style={styles.button}
                >
                    <Text style={styles.text}>
                        Select Single With Camera With Cropping
          </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.pickSingle(true)}
                    style={styles.button}
                >
                    <Text style={styles.text}>Select Single With Cropping</Text>
                </TouchableOpacity>
                
                <View style={{ width: 100, height: 100, backgroundColor: "#fff", borderTopLeftRadius: 7, borderBottomLeftRadius: 7 }} >
                    {this.state.image !== null ?
                        <Image resizeMode={"stretch"} style={{ flex: 1, borderRadius: 5, }} source={{ uri: this.state.image.uri }} />
                        :
                        <Image resizeMode={"stretch"} style={{ flex: 1, borderRadius: 5, }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROZ3zHY5i5Y_zgu_YyY7fqzFne1GhB6QQWIA&usqp=CAU" }} />
                    }
                </View>


            </View>
        );
    }
}