import Snackbar from "react-native-snackbar";

class ToasterService {
    show(message, duration) {
        setTimeout(() => {
            Snackbar.show({
                text: message,
                backgroundColor: 'white',
                duration: duration || 5000,
                textColor:'black'
            })
        }, 100)

    }
}
const Toaster = new ToasterService();
export default Toaster;