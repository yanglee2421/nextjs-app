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
import {useRouter} from 'next/router';
import Link from 'next/link';
import {get_bing} from '@/api';

interface Props {
  data: any;
}

export default function Id(props: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push({pathname: '/'});
    router.replace('/404');
  };

  return (
    <>
      id
      <Link href={{pathname: '/demo/23', query: {id: 123}}} passHref>
        click me
      </Link>
      <button onClick={handleClick}>take me home</button>
      <p>{JSON.stringify(props)}</p>
    </>
  );
}

interface Cnt {
  params?: any;
  locales: undefined;
  locale: undefined;
  defaultLocale: undefined;
}

// Get server side props & generate html
export async function getStaticProps(cnt: Cnt) {
  const {params} = cnt;

  try {
    const data = await get_bing({n: params.id || 0});
    return {props: {data}, revalidate: 60 * 60 * 24};
  } catch {
    return {notFound: true};
  }
}

interface Path {
  params: {id: string};
}

// Required for dynamic routing
export async function getStaticPaths() {
  const paths: Path[] = [];
  for (let i = 0; i < 9; i++) {
    paths.push({params: {id: String(i)}});
  }

  return {
    paths,
    fallback: false || 'blocking'
  };
}
~~~

### getServerSideProps

~~~tsx
interface Props {
  usr: string;
}

export default function Id(props: Props) {
  console.log(props.usr);
  return <></>;
}

// Get server side props, but will not generate html
export async function getServerSideProps() {
  return {props: {usr: 'max'}};
}
~~~

__NOTE:__ getServerSideProps 和 getStaticProps中，同一页面只能选择其中一个。

## Client Side Data Fetch

基本与React App一致，但需要注意，与React App不同，由于页面跳转时会清空JS内存，页面间共享数据时需要使用持久化方案。

### SWR

这是一个由NextJs官方提供的网络请求库，类似react-query，也可以直接使用react-query。

