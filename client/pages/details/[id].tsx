import Layout from '../../components/Layout';
import { withAuthSync } from '../../utils/auth';
import TvMaze from '../../shared/api-helpers/tvmaze';
import { environment } from '../../environments/environment';


const Post = ({ show: { title, image, description } }) => (
  <Layout>
    <div className="post-wrapper">
      <h1>{title}</h1>
      <div className="post-content">
        <img src={`${environment.api}/${image}`} />
        <p>{description}</p>
        {/* <p>{props.show.summary.replace(/<[/]?[pb]>/g, '')}</p> */}
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