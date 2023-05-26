import { request } from '@/api/request';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { idx: number; n: number };
}

export const dynamicParams = true;

export default async function Page(props: PageProps) {
  const { params, searchParams } = props;
  console.log(props);

  const data = await request({
    url: 'https://cn.bing.com/HPImageArchive.aspx',
    params: Object.assign(getInitParams(), searchParams),
  });

  // const r = await fetch('', { next: { revalidate: 60 } });

  if (!searchParams.n) notFound();

  return (
    <div className="m-5 bg-violet-400 p-2">
      <p>{params.id}</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

function getInitParams() {
  return {
    format: 'js',
    idx: 0,
    n: 1,
  };
}
