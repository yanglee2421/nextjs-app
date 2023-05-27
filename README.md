# Nestjs

## SSR & SPA

1. 服务端组件
   - 允许一个 async 函数作为 react 组件
   - 组件函数在服务器执行
   - 使用 client 组件时，需要使用 use client 显式声明
   - 不允许使用 evt handler
2. http 请求
   - 允许在中 SSR server 中向 API server 发送 http 请求
3. \_app.tsx（仅 pages 路由）
   - 替代 SPA 中的 App.tsx
   - 用途如：redux、react-query
4. fetch 的特有 API
   - 使用 next 属性缓存请求
5. 路由
   - 使用 next/navigation 模块在 server components 进行重定向
   - app Route 下：使用 app/not-found.tsx 自定义 404
   - pages Route 下：使用 pages/404.tsx 自定义 404

## pages route

1. 文件路由
   - pages/index.tsx
   - pages/todos/index.tsx
   - pages/404.tsx
   - pages/\_app.tsx
2. 动态路由
   - [id].tsx
   - [...uris].tsx
3. hooks

```js
import { useRouter } from 'next/router';
const router = useRouter();
// Get params & searchParams
router.query;
// Programmatic routing navigation
router.push('/');
router.replace({
  pathname: '/[id]',
  query: { id: 123 },
});
```

4. Link

```jsx
import Link from 'next/link';

function Component() {
  return (
    <>
      <Link href="/" passHref>
        click me
      </Link>
      <Link href={{ pathname: '/[id]', query: { id: 123 } }} passHref>
        click me
      </Link>
    </>
  );
}
```

## data prepared

- getStaticProps
