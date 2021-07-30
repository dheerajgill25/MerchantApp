
import { StyleSheet,} from 'react-native'



const styles = StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: '#000',
    },
 

    listItem:{
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
        marginTop: 5,
        alignItems:'flex-start',
        color:'grey',
        flexDirection: 'column',
    },
    reOrder:{
        alignItems:'flex-end',
        fontSize:15,
        flexDirection: 'column',
        paddingHorizontal: 6,
        paddingVertical: 2,
        backgroundColor: 'grey',
        borderRadius: 10,
        alignSelf: 'center',
    },
    amount:{
        alignItems:'flex-end',
        fontSize:16,
        flexDirection: 'column',
    },
    buttonDesign:{
        backgroundColor:'grey',
        borderRadius:10,
        fontSize:12,
    },

});

export default styles;

