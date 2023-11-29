import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  var heroData = [
    {
      id: 1,
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/36/6454dee96205c.png',
      title: "The perfect design for your website",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab suscipit dicta nulla. Consequuntur obcaecati officiis, labore doloribus non tempore impedit consequatur ab dolor. Explicabo quam repellendus vero omnis, nisi odio!",
      link: "https://www.google.com",
    },
    {
      id: 2,
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_web_ReactJS.png',
      title: "Start Your Future Financial Plan",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab suscipit dicta nulla. Consequuntur obcaecati officiis, labore doloribus non tempore impedit consequatur ab dolor. Explicabo quam repellendus vero omnis, nisi odio!",
      link: "https://www.facebook.com",
    },
    {
      id: 3,
      image: 'https://files.fullstack.edu.vn/f8-prod/banners/20/6308a6bf603a4.png',
      title: "Enjoy the Difference",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab suscipit dicta nulla. Consequuntur obcaecati officiis, labore doloribus non tempore impedit consequatur ab dolor. Explicabo quam repellendus vero omnis, nisi odio!",
      link: "https://www.twitter.com",
    },
  ];

  return (
    <Slider className="custom-carousel" {...settings}>
      {heroData.map(hero => (
        <div key={hero.id}>
          <img src={hero.image} alt={"slide " + hero.id} />
        </div>
      ))}
    </Slider>
  );
}