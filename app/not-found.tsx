import Link from 'next/link';
// import Router from 'next/router';
import { redirect } from 'next/navigation';

export default function NotFound() {
  return (
    <>
      <Link passHref href={'/'}>
        Take me home
      </Link>
      <button>click me </button>
    </>
  );
}
