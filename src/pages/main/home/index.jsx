import HomeHero from "./home-hero";
import HomeSlider from "./home-slider";
import HomeTopCourses from "./home-top-courses";
import HomePopularCourses from "./home-popular-courses";
import HomeAboutUs from "./home-aboutus";
import HomeFeedback from "./home-feedback";
import HomeQuickLinks from "./home-quick-links";
import Subscribcard from "@/components/main/shared/Subscribcard";

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
        <HomeQuickLinks />
        <Subscribcard />
      </div>
    </>
  );
};

export default Home;
