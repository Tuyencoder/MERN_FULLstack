// Home.js
// import { useAuth } from "../context/auth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SimpleSlider from "../pages/Slider";
import AdCard from "../components/cards/AdCard";
// import Course from "../../../server/models/ad";

export default function Home() {
  // context
  // const [auth, setAuth] = useAuth();

  const [ads, setAds] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/getAllCourse");
        setAds(data);
        console.log("response.data", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addToCart = (courseId) => {
    axios
      .post("/add-to-cart", { courseId })
      .then((response) => {
        console.log(response.data);
        toast.success("Add to card successful");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };
  return (
    <>
      <SimpleSlider />
      <div className="mt-4 ml-4">
        {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
        <h2>
          <span className="helvetica-text">Khóa học Pro</span>
        </h2>
      </div>

      <ul className="product-list">
        {ads?.map((ad) => (
          <AdCard ad={ad} addToCart={addToCart}  key={ad._id} />
        ))}
      </ul>
    </>
  );
}
