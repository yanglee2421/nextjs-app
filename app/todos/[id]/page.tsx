interface PageProps {
  params: {
    id: string;
  };
  searchParams: {};
}

export default function Page(props: PageProps) {
  const { params, searchParams } = props;
  console.log(props);

  return <div className="m-5 bg-violet-400 p-2">{params.id}</div>;
}
