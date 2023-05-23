import React from 'react';

interface LayoutProps extends React.PropsWithChildren {}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return <>{children}</>;
}
