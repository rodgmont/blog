import { IconGithub } from '@/components/shared/SocialIcons';
import LanguageSwitch from '@/components/layout/LanguageSwitch';

export default function Footer({ locale }) {
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
