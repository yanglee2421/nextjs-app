import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function Page(props: Props) {
  const { name } = props;
  // returns null
  return <></>;
}

// Required for dynamic routing
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      "/demo/1",
      {
        params: { id: "2" },
      },
    ],
    fallback: false,
  };
};

interface TData {
  name: unknown;
}

// Get server side props & generate html
export const getStaticProps: GetStaticProps<TData> = async () => {
  try {
    await get_demo();
    return { props: { name: null }, revalidate: 60 * 60 * 24 };
  } catch {
    return {
      redirect: {
        statusCode: 301,
        destination: "/demo",
      },
    };
  }
};

async function get_demo() {}
