import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNetInfo } from "@react-native-community/netinfo";
import {
  WelcomScreen,
  SideMenu,
  SearchResult,
  SellerPofile,
  Login,
  Signup,
  ServiceProviderSignUp,
  ServiceUserSignUp,
  Category,
  ContactUs,
  AboutUs,
  UserProfile,
} from "./src/index";
import AnimatedSplash from "react-native-animated-splash-screen";
import { CITY_CONTEXT, CATEGORY_CONTEXT } from "./src/Store/index";
import request from "./src/Request/request";
import { getUser } from "./src/LocalStore/AuthStore";
import AsyncStorage from "@react-native-community/async-storage";
import * as Progress from "react-native-progress";
import { View } from "react-native-animatable";

const options = { headerShown: false };
const CityContext = CITY_CONTEXT;
const CategoryContext = CATEGORY_CONTEXT;
const Stack = createStackNavigator();

function Routes({ open }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={open ? "SideMenu" : "WelcomScreen"}>
        <Stack.Screen
          options={options}
          name="WelcomScreen"
          component={WelcomScreen}
        />
        <Stack.Screen options={options} name="SideMenu" component={SideMenu} />
        <Stack.Screen options={options} name="Login" component={Login} />
        <Stack.Screen
          options={options}
          name="SearchResult"
          component={SearchResult}
        />
        <Stack.Screen
          options={options}
          name="SellerPofile"
          component={SellerPofile}
        />
        <Stack.Screen options={options} name="Signup" component={Signup} />
        <Stack.Screen
          options={options}
          name="ServiceProviderSignUp"
          component={ServiceProviderSignUp}
        />
        <Stack.Screen
          options={options}
          name="ServiceUserSignUp"
          component={ServiceUserSignUp}
        />
        <Stack.Screen
          options={options}
          name="ContactUs"
          component={ContactUs}
        />
        <Stack.Screen options={options} name="Aboutus" component={AboutUs} />
        <Stack.Screen options={options} name="Category" component={Category} />
        <Stack.Screen
          options={options}
          name="UserProfile"
          component={UserProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  const [city, setCity] = useState([]);
  const [cityHasSeller, setCityHasSeller] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [progressVal, setProgressVal] = useState(0);
  const [isConnected, setConnection] = useState(false);

  const netInfo = useNetInfo();

  // const [isLogedin, setIsLogedin] = useState(false)

  useEffect(() => {
    setConnection((prevConnection) => netInfo.isConnected);
    o_p();

    setTimeout(() => {
      setProgressVal(0.1);
    }, 500);

    request
      .get({ body: { skip: 0 }, url: "admin/get_loc" })
      // .get({ body: { skip: 0 }, url: "admin/get_loc_has_apr_users" })
      .then(async ({ data }) => {
        setProgressVal((e) => e + 0.5);
        data = data.sort((a, b) => {
          return a.label > b.label;
        });
        data.forEach((obj) => {
          obj.locations = obj.locations.sort((a, b) => a.label > b.label);
        });

        setCity((pr) => data);

        let cityWithSeller = [];

        data.forEach((city) => {
          let locations = [];
          city.locations.forEach((loc) => {
            if (loc.noOfApproveUser > 0) locations.push(loc);
          });
          if (locations.length > 0) {
            cityWithSeller.push({ ...city, locations });
          }
        });

        setCityHasSeller((pr) => cityWithSeller);
      })
      .catch((err) => console.log(err));

    request
      .get({ body: { skip: 0 }, url: "admin/get_cat" })
      .then(async ({ data }) => {
        setProgressVal((e) => e + 0.5);

        data = data.sort((a, b) => {
          return a.label > b.label;
        });
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, [netInfo.isConnected]);

  const o_p = async () => {
    const isOpen = await AsyncStorage.getItem("open");
    try {
      console.log(isOpen);
      if (isOpen !== null) {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AnimatedSplash
        isConnected={isConnected}
        logoWidht={250}
        customComponent={
          <View
            style={{
              position: "absolute",
              translateY: 35,
            }}
          >
            <Progress.Bar
              color="#15B7C9"
              progress={progressVal}
              height={3}
              width={200}
            />
          </View>
        }
        preload={true}
        // logoHeight={250}
        progress={() => (
          <Progress.Bar
            color="#15B7C9"
            progress={progressVal}
            height={3}
            width={200}
          />
        )}
        isLoaded={city.length > 0 && categories.length > 0}
        // isLoaded={(false)}
        backgroundColor={"#fff"}
        logoImage={require("./src/Assates/logo/Service64-Logo-dark4.png")}
      >
        {
          <>
            <StatusBar backgroundColor="#15B7C9" />
            {city.length > 0 && categories.length > 0 ? (
              <CityContext.Provider value={{ city, cityHasSeller }}>
                <CategoryContext.Provider value={{ categories }}>
                  <Routes open={open} />
                </CategoryContext.Provider>
              </CityContext.Provider>
            ) : null}
          </>
        }
      </AnimatedSplash>
    </>
  );
};

export default App;

// import React, { useState, useEffect, } from 'react';
// import { Button, View, Text, Image, StatusBar } from 'react-native';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { WelcomScreen, Dashboard, SideMenu, SearchResult, SellerPofile, Login, Signup, Category, ContactUs, AboutUs } from "./src/index"
// import AnimatedSplash from "react-native-animated-splash-screen";
// import { CITY_CONTEXT, CATEGORY_CONTEXT } from "./src/Store/index";
// import request from "./src/Request/request";
// import { getUser } from "./src/LocalStore/AuthStore";
// import { Croper } from "./src/Component/index";
// import AsyncStorage from '@react-native-community/async-storage'

// const options = { headerShown: false }
// const CityContext = CITY_CONTEXT
// const CategoryContext = CATEGORY_CONTEXT
// const Stack = createStackNavigator();

// const WelComPage = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen options={options} name="WelcomScreen" component={WelcomScreen} />
//     </Stack.Navigator>
//   )
// }

// function Routes({ }) {
//   const [open, setOpen] = useState(false)

//   useEffect(() => {
//     o_p()
//   }, [])

//   const o_p = async () => {
//     const isOpen = await AsyncStorage.getItem("open");

//     try {
//       console.log(isOpen)
//       if (isOpen !== null) {
//         // await useNavigation(open ? "SideMenu" : "WelcomScreen")
//         setOpen(true)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <Stack.Navigator>
//       <Stack.Screen options={options} name="SideMenu" component={SideMenu} />
//       <Stack.Screen options={options} name="Login" component={Login} />
//       {/* <Stack.Screen options={options} name="WelcomScreen" component={WelcomScreen} /> */}
//       <Stack.Screen options={options} name="SearchResult" component={SearchResult} />
//       <Stack.Screen options={options} name="SellerPofile" component={SellerPofile} />
//       <Stack.Screen options={options} name="Signup" component={Signup} />
//       <Stack.Screen options={options} name="ContactUs" component={ContactUs} />
//       <Stack.Screen options={options} name="Aboutus" component={AboutUs} />
//       <Stack.Screen options={options} name="Category" component={Category} />
//     </Stack.Navigator>
//   );
// }

// const App = () => {
//   const [city, setCity] = useState([])
//   const [categories, setCategories] = useState([])
//   const [isLogedin, setIsLogedin] = useState(false)

//   useEffect(() => {
//     getUser().then(user => {
//       if (user === null) {
//         setIsLogedin(() => false)
//       } else {
//         setIsLogedin(() => true)
//       }
//     })
//     request.get({ body: { skip: 0 }, url: "admin/get_loc" }).then(({ data }) => {
//       setCity(data)
//     }).catch(err => console.log(err))

//     request.get({ body: { skip: 0 }, url: "admin/get_cat" }).then(({ data }) => {
//       setCategories(data)
//     }).catch(err => console.log(err))
//   }, []);

//   return (
//     <>
//       <AnimatedSplash
//         logoWidht={250}
//         logoHeight={250}
//         isLoaded={city.length > 0 && categories.length > 0}
//         backgroundColor={"#fff"}
//         logoImage={require("./src/Assates/logo/Service64-Logo-dark4.png")}>
//         <StatusBar backgroundColor="#15B7C9" />
//         {city.length > 0 && categories.length > 0 ?
//           <CityContext.Provider value={city} >
//             <CategoryContext.Provider value={categories} >

//               <NavigationContainer>
//                 <Stack.Navigator>
//                   <Stack.Screen options={options} name="welcom" component={WelComPage} />
//                   <Stack.Screen options={options} name="app" component={Routes} />
//                 </Stack.Navigator>
//               </NavigationContainer>

//             </CategoryContext.Provider>
//           </CityContext.Provider>
//           : null
//         }
//       </AnimatedSplash>
//     </>
//   );
// };

// export default App;
