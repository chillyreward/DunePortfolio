import { Metadata } from 'next';
import { Realm, RealmMarker } from '@/components/realm';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Work',
};

export default function WorkPage() {
  return (
    <Realm name="atreides" className="min-h-[70vh] py-24 flex items-center">
      <Container className="space-y-4">
        <RealmMarker realm="atreides" />
        <h1 className="t-h1">Work</h1>
      </Container>
    </Realm>
  );
}
