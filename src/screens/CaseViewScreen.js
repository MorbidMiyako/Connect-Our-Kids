import React, { useState, useEffect } from "react";
import { Feather } from '@expo/vector-icons';
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Modal
} from "react-native";
import constants from "../helpers/constants";
import {
  ListItem,
  Button,
  Divider,
  SearchBar,
} from "react-native-elements";
import {
  getCaseData,
  clearCaseData
} from "../store/actions/caseData";
import {
  getCaseConnections,
  clearCaseConnections,
} from "../store/actions/caseConnections"

import { connect } from "react-redux";
import Loader from "../components/Loader/Loader";
import CaseListComponent from "../components/CaseListComponent";
import { MaterialIcons } from '@expo/vector-icons';
import ScrollToTop from '../UI/ScrollToTop'
import { RadioButton } from "react-native-paper";
const leftArrow = "\u2190";
const placeholderImg = require('../../assets/profile_placeholder.png')

export function CaseViewScreen(props) {
  // console.log('this is props, ', props)
  const [searchKeywords, setSearchKeywords] = useState('')

  const [filtersSelected, setFiletersSelected] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  })

  const [descriptionVisible, setDescriptionVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  const styles = StyleSheet.create({
    tabs: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around"
    },

    selected: {
      backgroundColor: constants.highlightColor,
      color: "white",
      borderWidth: 1,
      borderColor: constants.highlightColor,
      borderRadius: 4,
      overflow: "hidden"
    },

    tab: {
      padding: 10,
      fontSize: 16
    },
    searchBar: {
      marginHorizontal: Platform.OS === "ios" ? 5 : 5,
      width: '75%',
      backgroundColor: Platform.OS === "ios" ? "white" : "white",
    },
    imageStyles: { width: 225, height: 90 },
    iconStyles: { fontSize: 40, color: '#000', paddingRight: 20 },
    filters: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: "stretch"
    },
    filter: {
      height: 26,
      width: 26,
      borderRadius: 13,
      overflow: 'hidden',
      marginLeft: 10,
      marginRight: 10
    },
    descriptionModalItems: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',

    }
  });

  // on load get case data and case connections through redux
  useEffect(() => {
    props.getCaseData(props.navigation.getParam('pk'));
    props.getCaseConnections(props.navigation.getParam('pk'));
  }, [false]);

  let caseData = props.caseData;


  const handleKeywordChange = (e) => {
    setSearchKeywords(e)
  };

  const genderAssignment = (gender) => {
    if (gender === 'M') {
      return 'Male'
    } else if (gender === 'F') {
      return 'Female'
    } else if (gender === 'O') {
      return 'Unspecified Gender'
    } else {
      return null
    }
  };

  //sort by name
  const name = (a, b) => {
    const A = a.person.last_name.toUpperCase();
    const B = b.person.last_name.toUpperCase();
    let comparison = 0;
    if (A > B) {
      comparison = 1;
    } else {
      comparison = -1;
    }
    return comparison;
  };

  //filter functionality
  const filteredConnections = () => {
    //if no filters are set, do nothing
    if (!filtersSelected[0] && !filtersSelected[1] && !filtersSelected[2] && !filtersSelected[3] && !filtersSelected[4] && !filtersSelected[5]) {
      return props.caseConnections
    } else {
      //remove everyone without a status
      let noStatus = props.caseConnections.filter((connection) => !connection.person.status)
      let filteredList = props.caseConnections.filter((connection) => connection.person.status)



      if (!filtersSelected[1]) {
        //if filter1 not selected, remove everyone with filter1
        filteredList = filteredList.filter((connection) => connection.person.status.color.toUpperCase() !== '#6AA84F')

      }
      if (!filtersSelected[2]) {
        //if filter2 not selected, remove everyone with filter2
        filteredList = filteredList.filter((connection) => connection.person.status.color.toUpperCase() !== '#FFFF00')
      }
      if (!filtersSelected[3]) {
        //if filter3 not selected, remove everyone with filter3
        filteredList = filteredList.filter((connection) => connection.person.status.color.toUpperCase() !== '#CC0000')
      }
      if (!filtersSelected[4]) {
        //if filter4 not selected, remove everyone with filter4
        filteredList = filteredList.filter((connection) => connection.person.status.color.toUpperCase() !== '#9900FF')
      }
      if (!filtersSelected[5]) {
        //if filter5 not selected, remove everyone with filter5
        filteredList = filteredList.filter((connection) => connection.person.status.color.toUpperCase() !== '#6FA8DC')
      }
      if (filtersSelected[0]) {
        //add back people without a status if no status filter is selected
        filteredList = filteredList.concat(noStatus)
      }
      //sort by name
      filteredList.sort(name)

      return filteredList
    }
  }

  // ------SEARCHBAR functionality - filters by case first_name or last_name---------
  let SearchedConnections = filteredConnections().filter(result => {
    return result.person.full_name.toLowerCase().indexOf(searchKeywords.toLowerCase()) != -1;
  });

  const leftArrow = '\u2190';

  const goToTop = () => {
    scroll.scrollTo({x: 0, y: 0, animated: true});
  };

  return (
    <View>
      { isScrolling ?
        <ScrollToTop 
          style={{
            position: 'absolute',
            zIndex: 1000,
            bottom: 15,
            right: 46,
          }}  
          onPress={goToTop}
        /> : null}
      <ScrollView
        scrollsToTop
        ref={(a) => {scroll = a}}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y <= 250) {
            setIsScrolling(false)
          } else if (e.nativeEvent.contentOffset.y >=250) {
            setIsScrolling(true)
          }
        }}
        onScrollToTop={() => setIsScrolling(false)}
        scrollEventThrottle={16}
      >
        
        <View>
          <ListItem
            title={caseData.full_name}
            titleStyle={{ fontSize: 18 }}
            subtitle={
              <View>
                {caseData.gender ? <Text style={{ color: '#434245' }}>{genderAssignment(caseData.gender)}</Text> : null}
                {caseData.birthday ? <Text style={{ color: '#434245' }}>Date of Birth: {caseData.birthday.raw}</Text> : null}
                {caseData.address && caseData.address.formatted ? <Text style={{ color: '#434245' }}>{caseData.address.formatted}</Text> : null}
                {caseData.foster_care ? <Text style={{ color: '#434245' }}>Initiation: {caseData.foster_care}</Text> : null}
              </View>
            }
            leftAvatar={
              <View style={{
                height: 80, 
                width: 80, 
                borderRadius: 40, 
                overflow: 'hidden'}}>
                {caseData.picture ?
                (<Image 
                  source={{uri: caseData.picture }} 
                  style={{
                    height: 80, 
                    width: 80, 
                    borderRadius: 40, 
                    overflow: 'hidden'}} 
                    defaultSource = {placeholderImg}
                />) :
                (<Image 
                  source={placeholderImg} 
                  style={{
                    height: 80, 
                    width: 80, 
                    borderRadius: 40, 
                    overflow: 'hidden'}} 
                    defaultSource = {placeholderImg}
                />)}
              </View>
            }
          />
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
          {/* search Functionality */}
          <View
            style={{
              flexDirection: "column",
              width: '95%',
              minHeight: 350,
            }}
          >
            <View style={{
              width: '100%',
              height: 36,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              backgroundColor: '#0279AC',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'
            }}>
              <View>
                <Text style={{ width: '100%', padding: 5, fontSize: 17.5, color: '#FFFFFF'}}>Connections</Text>
              </View>
            </View>
            <View 
           style={{
            flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start', alignContent: 'center', borderBottomWidth: .5, borderBottomColor: '#babab9'
           }}>
              <SearchBar
                inputStyle={{ fontSize: 16 }}
                inputContainerStyle={{ backgroundColor: '#FAFAFA', height: 45.62 }}
                placeholder="Search Name..."
                placeholderTextColor="#8D8383"
                // lightTheme
                round
                name="searchKeywords"
                value={searchKeywords}
                onChangeText={handleKeywordChange}
                // create searchbar target platform.os
                platform="ios"
                containerStyle={styles.searchBar}
              />
              <TouchableHighlight
                onPressIn={() => {
                  setDescriptionVisible(true)
                }}>
                <View
                  style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                  }}
                >
                  <MaterialIcons
                    name="filter-list"
                    color='black'
                    size={32}
                  /><Text style={{ fontSize: 16 }}>Filter</Text>
                </View>
              </TouchableHighlight>
           </View>
            {props.isLoadingConnections ? (
              <Loader />
            ) : (
                SearchedConnections && SearchedConnections.map((connection, index) => {
                  return (
                    <CaseListComponent
                      pressed={() => {
                        props.navigation.navigate('ConnectionsView', { connectionData: connection, childName: caseData.full_name })
                        setIsScrolling(false)
                      }}
                      key={index}
                      connection={connection} />
                  );
                })
              )}
          </View>
        </View>





















        
        <Modal
          visible={descriptionVisible}
        >
          <View style={{ margin: 30, marginTop: 80 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "800", textAlign: "left" }}
            >
              Status
            </Text>
            <TouchableOpacity onPress={() => setFiletersSelected({ ...filtersSelected, 0: !filtersSelected[0] })} ><View style={styles.descriptionModalItems}><Text style={[styles.filter, { backgroundColor: '#C0C0C0' }, [filtersSelected[0] ? styles.selected : null]]} ></Text><Text>N/A</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={() => setFiletersSelected({ ...filtersSelected, 1: !filtersSelected[1] })} ><View style={styles.descriptionModalItems}><Text style={[styles.filter, { backgroundColor: '#6AA84F' }, [filtersSelected[1] ? styles.selected : null]]} ></Text><Text>Family Candidate</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={() => setFiletersSelected({ ...filtersSelected, 2: !filtersSelected[2] })} ><View style={styles.descriptionModalItems}><Text style={[styles.filter, { backgroundColor: '#FFFF00' }, [filtersSelected[2] ? styles.selected : null]]} ></Text><Text>Highlight</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={() => setFiletersSelected({ ...filtersSelected, 3: !filtersSelected[3] })} ><View style={styles.descriptionModalItems}><Text style={[styles.filter, { backgroundColor: '#CC0000' }, [filtersSelected[3] ? styles.selected : null]]} ></Text><Text>No-Go</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={() => setFiletersSelected({ ...filtersSelected, 4: !filtersSelected[4] })} ><View style={styles.descriptionModalItems}><Text style={[styles.filter, { backgroundColor: '#9900FF' }, [filtersSelected[4] ? styles.selected : null]]} ></Text><Text>Of Interest</Text></View></TouchableOpacity>
            <TouchableOpacity onPress={() => setFiletersSelected({ ...filtersSelected, 5: !filtersSelected[5] })} ><View style={styles.descriptionModalItems}><Text style={[styles.filter, { backgroundColor: '#6FA8DC' }, [filtersSelected[5] ? styles.selected : null]]} ></Text><Text>Support Candidate</Text></View></TouchableOpacity>
          </View>
          <View
              style={{
                alignContent: "center",
                alignSelf: 'center',
                marginBottom: 200,
                width: 100,
                fontSize: 80,
                fontWeight: "bold",
              }}
            >
              <TouchableHighlight>
                <Button
                  buttonStyle={{ backgroundColor: constants.highlightColor }}
                  title="Apply"
                  onPress={() => {
                    setDescriptionVisible(false);
                  }}
                />
              </TouchableHighlight>
            </View>
            import { Ionicons } from "@expo/vector-icons";
        </Modal>




{/* 
        <Modal
        animationType="fade"
        transparent={false}
        visible={state.modalVisible}
      >
        <View
          style={{ backgroundColor: "#fff", height: 52, justifyContent: "center" }}
        >
          <TouchableOpacity
            underlayColor="lightgray"
            style={{
              padding: 7.5,
              flex: 1,
              height: 500,
              borderBottomWidth: 0.5,
              borderBottomColor: "rgba(24, 23, 21, 0.3)",
              backgroundColor: "#fff"
            }}
            onPressIn={() => {
              setModalVisible(!state.modalVisible);
            }}
          >
            <Text
              style={{
                padding: 7,
                fontSize: 18,
                color: "#0F6580"
              }}
            >
              {leftArrow} RETURN
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          scrollsToTop
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: 10
          }}
        >
          <View
            style={{
              marginTop: 10,
              flex: 1,
              width: "100%",
              height: "100%",
              alignSelf: "flex-start"
            }}
          >
            {// SORT BY}
            <Text
              style={{
                fontFamily: constants.lotoFamily,
                color: "rgba(24, 23, 21, 0.5)",
                marginLeft: 10,
                marginTop: 20,
                marginBottom: 5,
                fontSize: 14,
                fontWeight: "800",
                textAlign: "left"
              }}
            >
              SORT BY
            </Text>
            <View
              style={{
                borderBottomColor: "rgba(24, 23, 21, 0.3)",
                borderBottomWidth: 0.5,
                marginBottom: 10,
                marginHorizontal: 10
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginVertical: 10
              }}
            >
              <RadioButton
                value="Last Name"
                status= {sort === "Last Name" ? "checked" : "unchecked"}
                color="#0279ac"
                checked={state.filters.name}
                onPress={() => {
                 setSort("Last Name");
                  setState({
                    ...state,
                    filters: {
                      ...state.filters,
                      name: !state.filters.name,
                      DOB: false,
                      created: false,
                      updated: false
                    }
                  })
                }
                }
              />
              <Text style={styles.checkboxes}>  Last Name</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginVertical: 10
              }}
            >
              <RadioButton
                value="Date Created"
                status={sort === "Date Created" ? "checked" : "unchecked"}
                color="#0279ac"
                checked={state.filters.created}
                onPress={() => {
                  setSort("Date Created");
                  setState({
                    ...state,
                    filters: {
                      ...state.filters,
                      name: false,
                      DOB: false,
                      created: !state.filters.created,
                      updated: false
                    }
                  })
                }
                }
              />
              <Text style={styles.checkboxes}>  Date Created</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                marginVertical: 10
              }}
            >
              <RadioButton
                value="Last Updated"
                status={sort === "Last Updated" ? "checked" : "unchecked"}
                color="#0279ac"
                checked={state.filters.updated}
                onPress={() => {
                  setSort("Last Updated");
                  setState({
                    ...state,
                    filters: {
                      ...state.filters,
                      name: false,
                      DOB: false,
                      created: false,
                      updated: !state.filters.updated
                    }
                  })
                }
                }
              />
              <Text style={styles.checkboxes}>  Last Updated</Text>
            </View>
            {// GENDER }
            <Text
              style={{
                fontFamily: constants.lotoFamily,
                color: "rgba(24, 23, 21, 0.5)",
                marginLeft: 10,
                marginTop: 20,
                marginBottom: 5,
                fontSize: 14,
                fontWeight: "800",
                textAlign: "left"
              }}
            >
              GENDER
            </Text>
            <View
              style={{
                borderBottomColor: "rgba(24, 23, 21, 0.3)",
                borderBottomWidth: 0.5,
                marginBottom: 10,
                marginHorizontal: 10
              }}
            />
            <CheckBox
              containerStyle={{
                backgroundColor: "white",
                borderColor: "white"
              }}
              title="Male"
              textStyle={{...styles.checkboxes}}
              size={30}
              checked={state.filters.male}
              checkedColor="#0279ac"
              onPress={() =>
                setState({
                  ...state,
                  filters: {
                    ...state.filters,
                    male: !state.filters.male
                  }
                })
              }
            />
            <CheckBox
              containerStyle={{
                backgroundColor: "white",
                borderColor: "white"
              }}
              title="Female"
              textStyle={{...styles.checkboxes}}
              size={30}
              checked={state.filters.female}
              checkedColor="#0279ac"
              onPress={() =>
                setState({
                  ...state,
                  filters: {
                    ...state.filters,
                    female: !state.filters.female
                  }
                })
              }
            />
            <CheckBox
              containerStyle={{
                backgroundColor: "white",
                borderColor: "white",
                marginBottom: 100
              }}
              title="Unspecified"
              textStyle={{...styles.checkboxes}}
              size={30}
              checked={state.filters.unspecified}
              checkedColor="#0279ac"
              onPress={() =>
                setState({
                  ...state,
                  filters: {
                    ...state.filters,
                    unspecified: !state.filters.unspecified
                  }
                })
              }
            />
          </View>
        </ScrollView>
        <View
          style={{
            alignContent: "center",
            alignSelf: "center",
            width: 100,
            fontSize: 80
          }}
        >
        </View>
      </Modal> */}



      </ScrollView>
    </View>
  );
}

const mapStateToProps = state => {
  const { caseData, isLoadingCaseData, caseDataError } = state.caseData;
  const { caseConnections, isLoadingConnections, connectionsError } = state.caseConnections;
  const details = state.details
  return {
    caseData,
    isLoadingCaseData,
    isLoadingConnections,
    caseDataError,
    connectionsError,
    caseConnections,
    details
  };
};

export default connect(
  mapStateToProps,
  {
    getCaseData,
    clearCaseData,
    getCaseConnections,
    clearCaseConnections
  }
)(CaseViewScreen);
