import React from "react";

export default function PageHeader({ title, subtitle }) {
  return (
    <header className="mb-12">
      <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-text-1 mb-2">{title}</h1>
      {subtitle ? (
        <p className="text-text-3 text-base lg:text-lg">{subtitle}</p>
      ) : null}
    </header>
  );
}

