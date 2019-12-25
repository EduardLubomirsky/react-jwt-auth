import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Card from '../components/Card';
import Show from '../shared/interfaces/show.interface';
import TvMaze from '../shared/api-helpers/tvmaze';

const Index = (props) => (
  <Layout>
    <div className="container-wrapper">
      <h1>Batman TV Shows</h1>
      <ul className="wrapper">
        {props.shows.map((show: Show) => (
          <li key={show.id} className="card-wrapper">
            <Link href="/details/[id]" as={`/details/${show.id}`}>
              <a>
                <Card show={show} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

Index.getInitialProps = async function () {
  const res = await TvMaze.getShows();
  return {
    shows: res.map(entry => entry.show)
  };
};

export default Index;