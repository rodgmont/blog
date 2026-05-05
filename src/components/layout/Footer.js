import { IconGithub, IconBriefcase } from '@/components/shared/SocialIcons';
import LanguageSwitch from '@/components/layout/LanguageSwitch';
import Link from 'next/link';
import { portfolioPath } from '@/lib/paths';

export default function Footer({ locale, messages }) {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div>
          <span className="text-muted site-footer__copy">
            © {new Date().getFullYear()} Fran Rodgmont
          </span>
        </div>

        <div className="site-footer__actions">
          <LanguageSwitch locale={locale} />
          <Link 
            href={portfolioPath(locale)} 
            className="text-muted no-fade site-footer__github" 
            aria-label="Portfolio"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <IconBriefcase size={16} />
            <span>{messages?.nav?.portfolio ?? 'Portfolio'}</span>
          </Link>
          <a
            href="https://github.com/rodgmont"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted no-fade site-footer__github"
          >
            <IconGithub size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
