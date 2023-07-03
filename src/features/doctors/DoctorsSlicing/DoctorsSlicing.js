import { useEffect } from "react";
import { fetchDoctors } from "../DoctorsData/DoctorsSlice/DoctorsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export function DoctorsSlicing() {
  const dispatch = useDispatch();
  const allProducts = `${process.env.REACT_APP_BASE_API_URL}/account/doctor/list/`;
  useEffect(() => {
    dispatch(fetchDoctors(allProducts));
  }, [allProducts, dispatch]);
  console.log(allProducts);
  const { doctors, status, error, totaldoctorsCount } = useSelector(
    (state) => state.doctorsData
  );
  const products = doctors.slice(0, 6);
  console.log(products);

  return products;
}
