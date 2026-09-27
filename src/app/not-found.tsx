import { Metadata } from 'next';
import { Realm } from '@/components/realm';
import { Container } from '@/components/ui/Container';
import { Grid } from '@/components/ui/Grid';
import { Button } from '@/components/ui/Button';
import { Epigraph } from '@/components/ui/Epigraph';
import { getEpigraph } from '@/content/epigraphs';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  const notFoundEpigraph = getEpigraph('not-found');

  return (
    <Realm name="arrakis" className="min-h-[70vh] py-24 flex items-center">
      <Container>
        <Grid>
          <div className="col-span-12 md:col-span-8 flex flex-col gap-6">
            <h1 className="t-h1">Page not found</h1>
            <p className="t-body text-ink-2">This page doesn&apos;t exist or has moved.</p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button href="/" variant="primary">
                Go to the homepage
              </Button>
              <Button href="/work" variant="ghost">
                View work
              </Button>
            </div>
            {notFoundEpigraph && (
              <div className="mt-24">
                <Epigraph
                  text={notFoundEpigraph.quote}
                  attribution={notFoundEpigraph.attribution}
                />
              </div>
            )}
          </div>
        </Grid>
      </Container>
    </Realm>
  );
}
