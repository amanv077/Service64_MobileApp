// import * as ImagePicker from "react-native-image-picker";
import ImagePicker from 'react-native-image-crop-picker';


export default {
    launchCamera: () => {
        // ImagePicker.launchCamera({
        //     mediaType: 'photo',
        //     includeBase64: true,
        //     maxHeight: 200,
        //     maxWidth: 200,
        // }, (res) => {
        //     return res;
        // })


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
                   
                });
            })
            .catch((e) => alert(e));


    },

    launchImageLibrary: () => {
        ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 200,
            maxWidth: 200,
        }, (res) => {
            return res
        })
    }

}