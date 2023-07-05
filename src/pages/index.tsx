// NextJs Imports
import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  console.log(props);

  return <main className={inter.className}>Home</main>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const num = Math.random() * 10;
  console.log(num);
  if (num > 7) throw new Error("test");
  return { props: { num } };
};
