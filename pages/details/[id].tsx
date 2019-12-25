import Layout from '../../components/Layout';
import { withAuthSync } from '../../utils/auth';
import TvMaze from '../../shared/api-helpers/tvmaze';

const Post = (props) => (
  <Layout>
    <div className="post-wrapper">
      <h1>{props.show.name}</h1>
      <div className="post-content">
        <img src={props.show.image.medium} />
        <p>{props.show.summary.replace(/<[/]?[pb]>/g, '')}</p>
      </div>
    </div>
  </Layout>
);

Post.getInitialProps = async function (context) {
  const { id } = context.query;
  const show = await TvMaze.getById(id);
  console.log(show)
  return { show };
};

export default withAuthSync(Post);