import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page(props: Props) {
  const { data } = props;
  // returns null
  return <></>;
}

interface TData {
  data: unknown;
}

// Get server side props, but doesn't generate html
export const getServerSideProps: GetServerSideProps<TData> = async () => {
  try {
    await get_demo();
    return { props: { data: null } };
  } catch {
    return { notFound: true };
  }
};

async function get_demo() {}
