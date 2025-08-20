// Endpoint disabled to simplify deployment; remove file if not used.
export const runtime = 'edge';
export async function POST() {
  return new Response('Transcription API disabled', { status: 404 });
}
