import PageContainer from './PageContainer';

function Page() {
  const list = [
    {
      key: ['Cmd+N'],
      val: 'New File',
    },
    {
      key: ['Cmd+S'],
      val: 'Save File',
    },
    {
      key: ['Cmd+W'],
      val: 'Close File',
    },
    {
      type: 'seq',
    },
    {
      key: ['Cmd+B'],
      val: 'Toggle Sidebar',
    },
    {
      key: ['Ctrl+`'],
      val: 'Toggle Terminal',
    },
    {
      key: ['Shift+Cmd+E'],
      val: 'Toggle Terminal',
    },
  ];
  return (
    <PageContainer list={list} />
  );
}

export default Page;
