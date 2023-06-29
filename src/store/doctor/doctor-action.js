import { doctorActions } from "./doctor-slice";

export const fetchAppointments = (url) => {
  return async (dispatch) => {
    const fetchData = async () => {



    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken)
    console.log(`Bearer ${accessToken}`)
    const response = await fetch(
        url,
        {
            method:'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );



    //   const response = await fetch(
    //     // `${process.env.REACT_APP_BASE_API_URL}/products/`
    //     url
    //   );

      if (!response.ok) {
        throw new Error("Could not fetch products from DB");
      }

      const data = await response.json();
      console.log("inside fetchAppointments action")
      return data;
    };

    try {
      const productsData = await fetchData();

      console.log("data in action")
      console.log(productsData)
      dispatch(
        doctorActions.replaceApointments({
            data: productsData || [],
          isLoading: false,
          next: null,
          previous: null,
        })
      );

      console.log("after dispatch")
    } catch (error) {
      throw new Error("Products not feched corerctly");
    }
  };
};

// export const fetchCategories = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       const response = await fetch(
//         `${process.env.REACT_APP_BASE_API_URL}/categories/`
//       );

//       if (!response.ok) {
//         throw new Error("Could not fetch categories from DB");
//       }

//       const data = await response.json();
//       return data;
//     };

//     try {
//       const categories = await fetchData();
//       dispatch(
//         doctorActions.getcategories({
//           categories: categories.results || [],
//           isLoading: false,
//         })
//       );
//     } catch (error) {
//       throw new Error("categories not feched corerctly");
//     }
//   };
// };