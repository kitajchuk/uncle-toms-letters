import Layout from '../components/layout';
import Masthead from '../components/masthead';
import Linkback from '../components/linkback';

const Page404 = () => {
  return (
    <Layout title="Not Found">
      <Masthead title="Oops" subtitle="This page doesn't exist" />
      <div className="flex justify-center pb-20 sm:pb-36">
        <Linkback />
      </div>
    </Layout>
  );
};

export default Page404;
