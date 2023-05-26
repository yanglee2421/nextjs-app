import '@/styles/globals.css';
import React from 'react';
import { ReactQuery } from './ReactQuery';

interface RootLayoutProps extends React.PropsWithChildren {}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html>
      <head>
        <title>Next.js Turbopack App Directory Playground</title>
      </head>
      <body>
        <ReactQuery>{children}</ReactQuery>
      </body>
    </html>
  );
}
