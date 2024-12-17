import { useRouter } from 'next/router';

export default function Post({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/posts');
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: `${post.id}` },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/posts`);
  const posts = await res.json();
  const post = posts.find((p) => p.id === parseInt(params.slug));

  return { props: { post } };
}
