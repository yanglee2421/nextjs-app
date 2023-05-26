import Link from 'next/link';

export default function Page() {
  return (
    <div className="space-y-6">
      <h1>首页</h1>
      <ul>
        <li>
          <Link href={'/todos'}>todos</Link>
        </li>
        <li>
          <Link href={'/4040404'}>404</Link>
        </li>
      </ul>
    </div>
  );
}
