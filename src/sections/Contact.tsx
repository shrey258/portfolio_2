import { TextLink } from "../components/TextLink";
import { profile } from "../data/profile";

export function Contact() {
  return (
    <footer id="contact" className="flex flex-col gap-6 border-t border-rule pt-12">
      <p className="m-0 max-w-[20ch] font-serif text-4xl leading-tight tracking-[-0.01em] text-balance sm:text-5xl">
        Building something people use? Let’s talk.
      </p>
      {/* 28px-tall links get a 44px tap area. */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 text-lg [&>a]:relative [&>a]:before:absolute [&>a]:before:-inset-x-2 [&>a]:before:-inset-y-2">
        <TextLink href={`mailto:${profile.email}`}>{profile.email}</TextLink>
        <TextLink className="text-muted" href={profile.cal}>Book 15 minutes</TextLink>
      </div>
      <p className="m-0 pt-6 text-sm text-faint">
        © {new Date().getFullYear()} {profile.name}.
      </p>
    </footer>
  );
}
