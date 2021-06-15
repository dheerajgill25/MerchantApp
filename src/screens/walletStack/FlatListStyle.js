
import { StyleSheet,} from 'react-native'



const styles = StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: '#000',
    },
 

    listItem:{
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderBottomColor:'#fff',
        borderBottomWidth:2,
        width: '100%',
        paddingVertical: 15,
    },

    order:{
        alignItems:'flex-start',
        color:'#fff',
        fontSize:15,
        fontWeight:'bold',
        flex: 2,
    },

    date:{
        flex :0.3,
        alignItems:'flex-start',
        color:'grey'
    },
    time:{
        flex :0.5,
        alignItems:'flex-start',
        color:'grey'
    },
    amount:{
        flex :0.5,
        alignItems:'flex-end',
        fontSize:16,
    },
    buttonDesign:{
        backgroundColor:'grey',
        borderRadius:10,
        fontSize:12,
    },

});

export default styles;

