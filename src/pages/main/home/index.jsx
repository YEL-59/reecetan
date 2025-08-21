import HomeHero from "./home-hero";
import HomeSlider from "./home-slider";
import HomeTopCourses from "./home-top-courses";
import HomePopularCourses from "./home-popular-courses";
import HomeAboutUs from "./home-aboutus";
import HomeFeedback from "./home-feedback";

const Home = () => {
  return (
    <>
      <div>
        <HomeHero />
        <HomeSlider />
        <HomeTopCourses />
        <HomePopularCourses />
        <HomeAboutUs />
        <HomeFeedback />
      </div>
    </>
  );
};

export default Home;
