import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics'
const rnBiometrics = new ReactNativeBiometrics({allowDeviceCredentials: true})
export const getAvailableAuth = async () => {
    return new Promise(async (resolve) => {
        const {biometryType} = await rnBiometrics.isSensorAvailable();
        return resolve(biometryType);
    })

}
export const authenticate = () => {
    return new Promise<boolean> (async (resolve) => {
        const {biometryType} = await rnBiometrics.isSensorAvailable();
        let text = '';
        if (biometryType === BiometryTypes.Biometrics) {
            text = "Confirm fingerprint";
        }

        if (biometryType === BiometryTypes.TouchID || biometryType === BiometryTypes.FaceID) {
            text = "Confirm faceID";
        }

        rnBiometrics.simplePrompt({promptMessage: text})
            .then((resultObject) => {
                const { success } = resultObject
                resolve(success);
            })
            .catch((err) => {
                console.log('biometrics failed')
                resolve(false);
            })
    })
}


