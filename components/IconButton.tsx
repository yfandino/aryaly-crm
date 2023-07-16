import React, {
  ReactChild, ReactElement, ReactEventHandler
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  onClick?: ReactEventHandler;
  icon: ReactElement;
  href?: string;
  tooltipText?: string;
}

export default function IconButton({ icon, onClick, href, tooltipText }: Props) {
  const { asPath } = useRouter();
  let path;

  if (href) {
    const isAbsolutePath = /^\/.+/.test(href);
    path = isAbsolutePath ? href : `${asPath}/${href}`;
  }

  return (
    <CustomButton icon={icon} onClick={onClick} path={path}>
      {tooltipText && (
        <span
          className="absolute invisible -top-8 left-1/2 transform -translate-x-1/2
            bg-gray-500 text-white px-2 py-1 rounded"
        >
          {tooltipText}
        </span>
      )}
    </CustomButton>
  );
}

type CustomButtonProps = Props & {
  path?: string;
  children: ReactChild
}

function CustomButton({ children, onClick, path, icon }: CustomButtonProps) {
  if (path && !onClick)
    return (
      <div>
        <Link href={path}>
          <a className="p-2 mx-1 hover:bg-gray-100 rounded-full relative tooltip">
            {icon}
          </a>
          {children}
        </Link>
      </div>
    );

  return (
    <button type="button" onClick={onClick} className="p-2 mx-1 hover:bg-gray-100 rounded-full focus:outline-none relative tooltip">
      {icon}
      {children}
    </button>
  );
}

