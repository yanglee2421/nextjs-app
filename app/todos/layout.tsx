import React from 'react';

interface LayoutProps extends React.PropsWithChildren {}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <div>
      <h2>这里是todos</h2>
      {children}
    </div>
  );
}
