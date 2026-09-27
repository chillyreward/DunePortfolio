import { Realm, RealmMarker } from '@/components/realm';
import { Container } from '@/components/ui/Container';

export default function Home() {
  return (
    <div>
      <Realm name="arrakis" className="min-h-[60vh] py-24 flex items-center">
        <Container className="space-y-4">
          <RealmMarker realm="arrakis" />
          <h1 className="t-h1">Home</h1>
        </Container>
      </Realm>

      <Realm name="atreides" className="min-h-[60vh] py-24 flex items-center">
        <Container className="space-y-4">
          <RealmMarker realm="atreides" />
          <h2 className="t-h2">Selected work</h2>
        </Container>
      </Realm>

      <Realm name="fremen" id="hackathons" className="min-h-[60vh] py-24 flex items-center">
        <Container className="space-y-4">
          <RealmMarker realm="fremen" />
          <h2 className="t-h2">Hackathons</h2>
        </Container>
      </Realm>

      <Realm name="arrakis" id="contact" className="min-h-[60vh] py-24 flex items-center">
        <Container className="space-y-4">
          <RealmMarker realm="arrakis" />
          <h2 className="t-h2">Contact</h2>
        </Container>
      </Realm>
    </div>
  );
}
