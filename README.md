# NextJs

## 与React App的区别

1. 运行在server side
2. 基于文件的router
3. components分server和client两种
4. 支持server side data fetch

## Pages Router

### 路径

基于文件路由生成网站的路由表，基本示例如下：

| File Path             | URI    | Desc              |
| --------------------- | ------ | ----------------- |
| pages/index.tsx       | /      | 首页              |
| pages/login/index.tsx | /login | 登录页            |
| pages/404.tsx         | /404   | 404页             |
| pages/_app.tsx        | null   | React App的根节点 |

### 路态路由

动态的匹配URI，多个URI指向同一个页面。

| File Path                 | URI         | Desc              |
| ------------------------- | ----------- | ----------------- |
| pages/todos/[id].tsx      | /todos/*    | 仅捕获一层URI     |
| pages/todos/[...path].tsx | /todos/**/* | 捕获所有层级的URI |

### 获取URI中的参数

通过router.query属性，获取从URI中捕获的params以及searchParams。

~~~tsx
import {useRouter} from 'next/router';
import style from './style.module.scss';

export default function Path() {
  const router = useRouter();

  // URI:/todos/sub1/sub2
  const {path} = router.query;
  // only client returns ['sub1','sub2']

  // URI:/todos/filterId
  const {id} = router.query;
  // returns 'filterId'

  if (!Array.isArray(path)) return <p>loading</p>;
  return (
    <ul className={style.b}>
      {path.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
~~~

__NOTE：__router.query首次渲染时会返回一个空对象，再渲染才能拿到有效值。

### 编程式路由

通过router对象上的方法控制页面路由

~~~tsx
import {useRouter} from 'next/router';

export default function Id() {
  const router = useRouter();
  const handlePush = () => {
    router.push('/login');
  };
  const handleReplace = () => {
    router.replace({pathname: '/todos/[id]', query: {id: 'clientId'}});
  };
  const handleBack = () => {
    router.back();
  };
  const handleRefresh = () => {
    router.reload();
  };

  const evtArr = [handlePush, handleReplace, handleBack, handleRefresh];
  const liEl = evtArr.map((item) => (
    <li key={item.name}>
      <button onClick={item}>{item.name}</button>
    </li>
  ));

  return <ul>{liEl}</ul>;
}
~~~

### Link组件

类似a标签，提供跳转链接。

~~~tsx
import Link from 'next/link';

function Component() {
  return (
    <>
      <Link href='/' passHref>
        click me
      </Link>
      <Link href={{pathname: '/[id]', query: {id: 123}}} passHref>
        click me
      </Link>
    </>
  );
}
~~~

## Server Side Data Fetch

### getStaticProps & getStaticPaths

~~~tsx
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

~~~

### getServerSideProps

~~~tsx
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

~~~

__NOTE:__ getServerSideProps 和 getStaticProps中，同一页面只能选择其中一个。

## Client Side Data Fetch

基本与React App一致，但需要注意，与React App不同，由于页面跳转时会清空JS内存，页面间共享数据时需要使用持久化方案。

### useEffect

NextJs支持在组件中通过useEffect钩子在client side发起网络请求

### SWR

[SWR](https://swr.vercel.app)一个由NextJs官方提供的用于client side data fetching的网络请求库，类似react-query，也可以直接使用react-query。

