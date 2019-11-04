import React, { Component } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  StatusBar,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Platform,
  TouchableHighlight,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { 
  getCaseData, 
  getUserCases 
} from "../store/actions"
import axios from "axios";
import {
  ListItem,
  Image,
  SearchBar,
  Button,
  CheckBox,
  Divider
} from "react-native-elements";
import * as SecureStore from 'expo-secure-store';
// import { Picker } from 'react-native-picker-dropdown';
import constants from "../helpers/constants";

// import screen components
// discontinued work on AddCaseScreen. Button and Modal also commented out below
// import AddCaseScreen from "./AddCaseScreen";
import CaseViewScreen from "./CaseViewScreen.js";
import Loader from "../components/Loader/Loader";

class FamilyConnectionsScreen extends Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig("Family Connections", navigation);
  constructor(props) {
    super(props);
    this.state = {
      searchKeywords: "",
      gender: "Gender",
      ageRange: "Age Range",
      sortBy: "Sort By",
      modalVisible: false,
      filters: {
        male: false,
        female: false,
        unspecified: false,
        zero_five: false,
        six_nine: false,
        ten_thirteen: false,
        fourteen_eighteen: false,
        name: false,
        DOB: false,
        created: false,
        updated: false
      },
      caseVisible: false,
      addCaseModalVisible: true,
      pk: '',
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setAddCaseModalVisible(visible) {
    this.setState({ addCaseModalVisible: visible });
  }

  setCaseVisible(visible) {
    this.setState({ caseVisible: visible });
  }

  handleKeywordChange = event => {
    this.setState({
      searchKeywords: event
    });
    // console.log(this.state.searchKeywords);
  };

  componentDidMount() {
    this.props.getUserCases();
  }

  render() {
    // ------GENDER FILTER functionality------
    let filteredCases = this.props.results; // this.state.results

    if (
      !this.state.filters.male &&
      !this.state.filters.female &&
      !this.state.filters.unspecified
    ) {
      //if nothing is selected -- do nothing
    } else {
      if (!this.state.filters.male) {
        filteredCases = filteredCases.filter(c => c.gender !== "M");
      } // if male is not selected -- remove all males
      if (!this.state.filters.female) {
        filteredCases = filteredCases.filter(c => c.gender !== "F");
      }
      if (!this.state.filters.unspecified) {
        filteredCases = filteredCases.filter(c => c.gender !== "O");
      }
    }

    // ------AGE FILTER functionality------
    // if (!this.state.filters.zero_five && !this.state.filters.six_nine && !this.state.filters.ten_thirteen && !this.state.filters.fourteen_eighteen) { //if nothing is selected -- do nothing
    // } else {
    //  let year = new Date()
    //  let noNullBirthday = []
    //  let nullBirthday = []
    //  for (c in filteredCases) { //pull out the object with a null value for birthday so it doesnt break the if statements starting on line 122
    //    if (filteredCases[c].birthday === null) {
    //      nullBirthday.push(filteredCases[c])
    //    } else {
    //      noNullBirthday.push(filteredCases[c])
    //    }
    //  }
    //  if (!this.state.filters.zero_five) {noNullBirthday = noNullBirthday.filter(c => (year.getFullYear() - c.birthday.slice(0,4)) > 5)} //if this is not selected -- dont return ages 0-5
    //  if (!this.state.filters.six_nine) {noNullBirthday = noNullBirthday.filter(c => !((year.getFullYear() - c.birthday.slice(0,4) >= 6) && (year.getFullYear() - c.birthday.slice(0,4)) <= 9 ))}
    //  if (!this.state.filters.ten_thirteen) {noNullBirthday = noNullBirthday.filter(c => !((year.getFullYear() - c.birthday.slice(0,4) >= 10) && (year.getFullYear() - c.birthday.slice(0,4)) <= 13))}
    //  if (!this.state.filters.fourteen_eighteen) {noNullBirthday = noNullBirthday.filter(c => !((year.getFullYear() - c.birthday.slice(0,4) >= 14) && (year.getFullYear() - c.birthday.slice(0,4)) <= 18))}
    //  noNullBirthday = noNullBirthday.filter(c => (year.getFullYear() - c.birthday.slice(0,4) < 18))
    //  if (!this.state.filters.unspecified) { //add null birthdays back if unspecified is checked
    //   filteredCases = noNullBirthday
    // } else {
    //   filteredCases = noNullBirthday.concat(nullBirthday)
    //   }
    // }

    // ------SORTING Functionality------
    const name = (a, b) => {
      const A = a.full_name.toUpperCase();
      const B = b.full_name.toUpperCase();
      let comparison = 0;
      if (A > B) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      return comparison;
    };

    const lastName = (a, b) => {
      const A = a.last_name.toUpperCase();
      const B = b.last_name.toUpperCase();
      let comparison = 0;
      if (A > B) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      return comparison;
    };

    //leaving this out for now because year and day are not required
    // const DOB = (a, b) => {
    //   const A = a.birthday;
    //   const B = b.birthday;
    //   let comparison = 0;
    //   if (A < B) {
    //     comparison = 1;
    //   } else {
    //     comparison = -1;
    //   }
    //   return comparison;
    // }

    const created = (a, b) => {
      const A = a.created_at;
      const B = b.created_at;
      let comparison = 0;
      if (A > B) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      return comparison;
    };

    const updated = (a, b) => {
      const A = a.updated_at;
      const B = b.updated_at;
      let comparison = 0;
      if (A > B) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      return comparison;
    };

    if (this.state.filters.name) {
      filteredCases.sort(lastName);
    }

    //leaving this out for now because year and day are no longer required
    // *******BIRTHDAY FILTER*********
    // else if (this.state.filters.DOB) {
    //   let Birthdays = []
    //   let noBirthdays = []
    //   for (c in filteredCases) { //pull out the object with a null value for birthday so it doesnt break
    //     if (filteredCases[c].birthday === null) {
    //       noBirthdays.push(filteredCases[c])
    //     } else {
    //       Birthdays.push(filteredCases[c])
    //     }
    //     Birthdays.sort(DOB)
    //   }
    //   filteredCases = Birthdays.concat(noBirthdays)
    // }

    else if (this.state.filters.created) {
      filteredCases.sort(created);
    } else if (this.state.filters.updated) {
      filteredCases.sort(updated);
    } else {
      filteredCases.sort(name);
    }

    // ------SEARCHBAR functionality - filters by case first_name or last_name---------
    let SearchedCases = filteredCases.filter(result => {
      return result.full_name.indexOf(this.state.searchKeywords) != -1;
    });

    // const { navigate } = this.props.navigation;
    const fullYear = new Date();
    return (
      <SafeAreaView>
        {/* ADDCASE BUTTON -  leaving out for now */}
        {/* <Button
          title="Add Case"
          buttonStyle={{ backgroundColor: constants.highlightColor }}
          containerStyle={styles.addCaseButton}
          onPress={() => {
            this.setState({ addCaseModalVisible: true });
          }}
        /> */}
        <View style={{ flexDirection: "row" }}>
          <SearchBar
            placeholder="Search Keywords..."
            placeholderTextColor="black"
            lightTheme
            round
            name="searchKeywords"
            value={this.state.searchKeywords}
            onChangeText={this.handleKeywordChange}
            // create searchbar target platform.os
            platform="ios"
            containerStyle={styles.searchBar}
          />
          <Button
            title="Filters"
            buttonStyle={{ backgroundColor: constants.highlightColor }}
            containerStyle={styles.filterButton}
            onPress={() => {
              this.setModalVisible(true);
            }}
          />
        </View>

        {/* FILTERS BUTTON - onPress Modal */}
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <ScrollView>
            <View
              style={{
                marginVertical: 100,
                justifyContent: "space-evenly",
                alignSelf: "center"
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "800", textAlign: "center" }}
              >
                Gender
              </Text>

              <CheckBox
                containerStyle={{
                  backgroundColor: "white",
                  borderColor: "white"
                }}
                title="Male"
                size={16}
                checked={this.state.filters.male}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    filters: {
                      ...this.state.filters,
                      male: !this.state.filters.male
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
                size={16}
                checked={this.state.filters.female}
                onPress={this.checkHandler}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    filters: {
                      ...this.state.filters,
                      female: !this.state.filters.female
                    }
                  })
                }
              />

              <CheckBox
                containerStyle={{
                  backgroundColor: "white",
                  borderColor: "white"
                }}
                title="Unspecified"
                size={16}
                checked={this.state.filters.unspecified}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    filters: {
                      ...this.state.filters,
                      unspecified: !this.state.filters.unspecified
                    }
                  })
                }
              />

              <Divider
                style={{ height: 1, backgroundColor: "lightgray", margin: 20 }}
              />

                {/* AGE FILTER */}
              {/* <Text style={{ fontSize: 20, fontWeight: "800", textAlign: "center" }}>
              Age Range
            </Text>
            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='0 - 5 years'
              size={16}
              checked={this.state.filters.zero_five}
              onPress={() => this.setState({...this.state, filters: {...this.state.filters, zero_five: !this.state.filters.zero_five}})}
            />
            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='6 - 9 years'
              size={16}
              checked={this.state.filters.six_nine}
              onPress={() => this.setState({...this.state, filters: {...this.state.filters, six_nine: !this.state.filters.six_nine}})}
            />
            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='10 - 13 years'
              size={16}
              checked={this.state.filters.ten_thirteen}
              onPress={() => this.setState({...this.state, filters: {...this.state.filters, ten_thirteen: !this.state.filters.ten_thirteen}})}
            />
            <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='14 - 18 years'
              size={16}
              checked={this.state.filters.fourteen_eighteen}
              onPress={() => this.setState({...this.state, filters: {...this.state.filters, fourteen_eighteen: !this.state.filters.fourteen_eighteen}})}
            />
            <Divider style={{ height: 1, backgroundColor: 'lightgray', margin: 20 }} /> */}

              <Text
                style={{ fontSize: 20, fontWeight: "800", textAlign: "center" }}
              >
                Sort By
              </Text>

              <CheckBox
                containerStyle={{
                  backgroundColor: "white",
                  borderColor: "white"
                }}
                title="Last Name"
                size={16}
                checked={this.state.filters.name}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    filters: {
                      ...this.state.filters,
                      name: !this.state.filters.name,
                      DOB: false,
                      created: false,
                      updated: false
                    }
                  })
                }
              />

              {/* leaving this out for not because year and day are not required */}
              {/* <CheckBox
              containerStyle={{ backgroundColor: "white", borderColor: "white" }}
              title='Age'
              size={16}
              checked={this.state.filters.DOB}
              onPress={() => this.setState({
                ...this.state, 
                filters: {
                  ...this.state.filters, 
                  name: false,
                  DOB: !this.state.filters.DOB,
                  created: false,
                  updated: false
                }})}
            /> */}

              <CheckBox
                containerStyle={{
                  backgroundColor: "white",
                  borderColor: "white"
                }}
                title="Date Created"
                size={16}
                checked={this.state.filters.created}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    filters: {
                      ...this.state.filters,
                      name: false,
                      DOB: false,
                      created: !this.state.filters.created,
                      updated: false
                    }
                  })
                }
              />

              <CheckBox
                containerStyle={{
                  backgroundColor: "white",
                  borderColor: "white"
                }}
                title="Last Updated"
                size={16}
                checked={this.state.filters.updated}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    filters: {
                      ...this.state.filters,
                      name: false,
                      DOB: false,
                      created: false,
                      updated: !this.state.filters.updated
                    }
                  })
                }
              />
            </View>
          </ScrollView>
          <View
            style={{
              alignContent: "center",
              marginVertical: 60,
              marginHorizontal: 30,
              fontSize: 80,
              fontWeight: "bold",
              paddingTop: -10
            }}
          >
            <TouchableHighlight>
              <Button
                buttonStyle={{ backgroundColor: constants.highlightColor }}
                title="Apply Filters"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              />
            </TouchableHighlight>
          </View>
        </Modal>

        {/* Case List Todos:
       Cache case info from API for faster loading */}
        {/* Case List View Starts Here */}
        <View style={{ paddingBottom: 170 }}>
          <ScrollView>
            {/* Displays text placeholder until cases load */}
            {/* {console.log('isLOADING', this.props)} */}
            {this.props.isLoading ? (
              // <Text style={styles.isLoading}> Loading Cases... </Text>
              <Loader />
            ) : (
                SearchedCases.map((result, index) => (
                  <ListItem
                    key={index}
                    title={result.full_name}
                    titleStyle={{ color: "#5A6064" }}
                    subtitle={`${
                      result.gender && result.birthday && (!null || "")
                        ? `Gender: ${result.gender} , ${result.birthday}`
                        : "unspecified"
                      }`}
                    subtitleStyle={{ color: "#9FABB3" }}
                    leftAvatar={{ source: { uri: result.picture } }}
                    to pDivider={true}
                    onPress={async () => {
                      this.setState({pk : result.pk});
                      this.setCaseVisible(true);
                      
                    }}
                    // Case badges for document value/count
                    // badge={{
                    //   value: result.count_documents,
                    //   textStyle: {
                    //     fontSize: 14,
                    //     color: "white",
                    //     backgroundColor: constants.highlightColor
                    //   },
                    //   containerStyle: { marginTop: -10 }
                    // }}
                  />
                ))
              )}

            {/* CASE onPress MODAL */}
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.caseVisible}
            >
              <CaseViewScreen
                pk={this.state.pk}
                setModalVisible={this.setModalVisible}
                setCaseVisible={() => {
                  this.setCaseVisible(false);
                }}
              />

            </Modal>
          </ScrollView>

          {/* AddCase - onPress MODAL - leaving out for now */}
          {/* <View>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.addCaseModalVisible}
            >
              <AddCaseScreen
                setAddCaseModalVisible={this.setAddCaseModalVisible}
                setAddCaseModalVisible={() => {
                  this.setAddCaseModalVisible(false);
                }}
                addCaseModalVisible={this.state.addCaseModalVisible}
              />
              <ScrollView>
                <View
                  style={{
                    marginVertical: 20,
                    justifyContent: "center",
                    alignSelf: "center"
                  }}
                >
                </View>
              </ScrollView>
            </Modal>
          </View> */}
        </View>
      </SafeAreaView>
    );
  }
}

// Todos:
// Create styles that target both platforms
const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: Platform.OS === "ios" ? 5 : 5,
    width: Platform.OS === "ios" ? 285 : 320,
    backgroundColor: Platform.OS === "ios" ? "white" : "white"
  },
  // addCaseButton: {
  //   marginHorizontal: Platform.OS === "ios" ? 5 : 5,
  //   width: Platform.OS === "ios" ? 200 : 200,
  //   marginVertical: Platform.OS === "ios" ? 20 : 20,
  //   maxHeight: Platform.OS === "ios" ? 40 : 40
  // },
  filterButton: {
    width: Platform.OS === "ios" ? 70 : 70,
    marginVertical: Platform.OS === "ios" ? 20 : 20,
    maxHeight: Platform.OS === "ios" ? 40 : 40
  },
  isLoading: {
    textAlign: "center",
    fontSize: 20,
    flex: 1,
    marginTop: 240,
    color: "black"
  }
});

const mapStateToProps = state => {
  const { 
    caseData 
  } = state.caseData;
  const {
    results,
    isLoading,
    caseDataError,
  } = state.userCases;

  return {
    results,
    caseData,
    isLoading,
    caseDataError,
  };
};

export default connect(
  mapStateToProps, { 
    getUserCases, 
    getCaseData,
  })(FamilyConnectionsScreen);