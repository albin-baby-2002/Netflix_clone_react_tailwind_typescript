import { ENDPOINT } from "../common/endPoints";
import ContentRows from "../components/content_rows";

const Browse = () => {
  return (
    <section className="w-screen">
      <section>banner img</section>

      <ContentRows endPoint={ENDPOINT.MOVIES_POPULAR} title="New & Popular" />
      <ContentRows endPoint={ENDPOINT.TOP_RATED} title="Top Rated" />
      <ContentRows endPoint={ENDPOINT.NOW_PLAYING} title="Now Playing" />
    </section>
  );
};

export default Browse;
