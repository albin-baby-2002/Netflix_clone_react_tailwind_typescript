import { ENDPOINT } from "../common/endPoints";
import Banner from "../components/banner";
import ContentRows from "../components/content_rows";

const Browse = () => {
  return (
    <section className=" absolute top-0 w-screen">
      <Banner />

      <ContentRows endPoint={ENDPOINT.MOVIES_POPULAR} title="New & Popular" />
      <ContentRows endPoint={ENDPOINT.TOP_RATED} title="Top Rated" />
      <ContentRows endPoint={ENDPOINT.UPCOMING} title="Upcoming" />
      <ContentRows endPoint={ENDPOINT.NOW_PLAYING} title="Now Playing" />
    </section>
  );
};

export default Browse;
