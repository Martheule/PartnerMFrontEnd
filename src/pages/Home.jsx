import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const Home = () => {
  const [loading, setLoading] = useState(true);
  const [] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

};

export default Home;