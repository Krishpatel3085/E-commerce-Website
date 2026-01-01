// components/ui/Tabs.js
import React from 'react';

export function Tabs({ value, children, className }) {
    const activeContent = React.Children.toArray(children).find(child => child.props.value === value);
    return <div className={className}>{activeContent}</div>;
}

export function TabsContent({ value, children }) {
    return <div>{children}</div>;
}
