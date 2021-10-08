import PageContainer from './PageContainer';

function Page() {
  const list = [
    {
      key: ['docker', 'ps'],
      val: 'List containers',
    },
    {
      key: ['docker', 'ps', '-a'],
      val: 'Show all containers (default shows just running)',
    },
    {
      key: ['docker', 'images'],
      val: 'List images',
    },
    {
      key: ['docker', 'images', '-a'],
      val: 'Show all images (default hides intermediate images)',
    },
  ];
  return (
    <PageContainer list={list} />
  );
}

export default Page;
