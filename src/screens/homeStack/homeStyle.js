import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#000',
    flex: 1, 
    paddingHorizontal: 20,
  },
  text:{
    paddingVertical: 10,
    color:'grey',
    fontSize: 13,
    textAlign:'left',
  },
  action: {
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',    
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#fff',
  },
  columnSection:{
    flex:1,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff', 
  },
  sectionText:{
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#fff',
    fontSize:16,
  },
  submit: { 
    alignItems: 'center',
    // marginTop: 20,
    // marginBottom: 60,
    width:'80%', 
    backgroundColor:'#000'
  },
  viewWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
      paddingLeft: 20,
      alignItems: "flex-start",
      justifyContent: "center",
      position: "absolute",
      top: "45%",
      left: "50%",
      elevation: 5,
      transform: [{ translateX: -(width * 0.4) }, 
                  { translateY: -90 }], 
      width: width * 0.8,
      backgroundColor: "#fff",
      borderRadius: 7,
  },
    textInputDialogBox: {
      width: "90%",
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderBottomColor: "#000",
      borderBottomWidth: 1,
      marginBottom: 8,
    },
  closeButton:{
    backgroundColor: 'red',
    position:"absolute",
    top:-10,
    right:-10,
    width:30,
    height:30,
    borderRadius:15,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  dropdownSection:{
    marginTop:-10,
    marginBottom:8,
    borderBottomWidth:1,
    borderColor:'#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
   arrowWrapper: {
    flex: 0.2,
    justifyContent: 'center',
  },
  arrow: {
    textAlign: 'center',
    color: '#fff',
  },
  picker:{
    color:'#fff',
    borderBottomWidth: 2,
    flex: 0.8,
    width: '100%',
  },
});

export default styles;