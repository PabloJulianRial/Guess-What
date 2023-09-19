import Link from 'next/link';

export const Footer = () => {
  return (
    <nav>
      <Link
        className="nav-link"
        href="https://youtu.be/crwshgengq0"
        target="_blank"
      >
        About Us
      </Link>
      <Link
        className="nav-link"
        href="https://discord.com/invite/spF2kKCD"
        target="_blank"
      >
        Discord
      </Link>
      <Link
        className="nav-link"
        href="https://github.com/jamesyuill/guess-what-fe"
        target="_blank"
      >
        GitHub
      </Link>
    </nav>
  );
};
