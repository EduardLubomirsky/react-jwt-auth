import Layout from '../../components/Layout';
import fetch from 'isomorphic-unfetch';
import { withAuthSync } from '../../utils/auth';

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
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  return { show };
};

export default withAuthSync(Post);