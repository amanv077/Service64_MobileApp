
import storage from '@react-native-firebase/storage';


export const onUpload = async (response) => {
    return new Promise((resolve, reject) => {
        var d = new Date().getTime();
        var num = d.toString();
        const uploadTask = storage()
            .ref(`/images/${num}`)
            .putFile(response.uri)
        uploadTask.on("state_changed",
            () => { },
            (err) => { reject(err) }, () => {
                const fileName = num
                storage().ref("images")
                    .child(fileName)
                    .getDownloadURL()
                    .then((fireBaseUrl) => {
                        const image = {
                            photo: fireBaseUrl,
                            photo_name: fileName
                        }
                        resolve(image)
                    }).catch(err => {
                        reject(err)
                    });
            }
        );
    })
}
