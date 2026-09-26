import { LabVideo } from "../components/LabVideo";
import { Section } from "../components/Section";
import { TextLink } from "../components/TextLink";
import { lab, profile, writing } from "../data/profile";

// Phone clips and wide clips get their own grids, so each tile keeps its real shape.
const phones = lab.filter((l) => l.height > l.width);
const wide = lab.filter((l) => l.width > l.height);

export function Lab() {
  return (
    <Section id="lab" title="Lab">
      <div className="flex flex-col gap-8">
        <p className="m-0 max-w-[55ch] leading-relaxed text-muted">
          Interaction studies I build on the side and post on{" "}
          <TextLink className="text-ink" href={profile.xHighlights}>X</TextLink>. The receipt printer has a{" "}
          <TextLink className="text-ink" href={writing[0].href}>write-up</TextLink>.
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {phones.map((item) => <LabVideo key={item.src} item={item} />)}
        </div>
        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2">
          {wide.map((item) => <LabVideo key={item.src} item={item} />)}
        </div>
      </div>
    </Section>
  );
}
