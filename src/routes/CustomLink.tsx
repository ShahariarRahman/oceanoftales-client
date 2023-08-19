import { ReactNode } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

type CustomLinkProps = {
  children: ReactNode;
  to: string;
};

function CustomLink({ children, to, ...props }: CustomLinkProps) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div className={match ? "[&>*]:font-bold [&>*]:underline" : ""}>
      <Link style={{ color: match ? "" : "" }} to={to} {...props}>
        {children}
      </Link>
    </div>
  );
}

export default CustomLink;
