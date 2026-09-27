import { Metadata } from 'next';
import { Realm, RealmMarker, ImperialRule } from '@/components/realm';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <Realm name="corrino" className="min-h-[70vh] py-24 flex items-center">
      <Container className="space-y-6">
        <RealmMarker realm="corrino" />
        <h1 className="t-h1">About</h1>
        <ImperialRule realm="corrino" />
      </Container>
    </Realm>
  );
}
