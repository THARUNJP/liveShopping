import { WebRtcTransport, Router } from "mediasoup/node/lib/types";
import { mediasoupConfig } from "../config/mediasoup.config";

const transports = new Map<
  string,
  { send?: WebRtcTransport; recv?: WebRtcTransport }
>();

export async function createWebRtcTransport(
  router: Router
): Promise<WebRtcTransport> {
  const transport = await router.createWebRtcTransport({
    listenIps: mediasoupConfig.webRtcTransport.listenIps,
    enableUdp: mediasoupConfig.webRtcTransport.enableUdp,
    enableTcp: mediasoupConfig.webRtcTransport.enableTcp,
    preferUdp: mediasoupConfig.webRtcTransport.preferUdp,
    initialAvailableOutgoingBitrate:
      mediasoupConfig.webRtcTransport.initialAvailableOutgoingBitrate,
  });

  await transport.setMaxIncomingBitrate(
    mediasoupConfig.webRtcTransport.minimumAvailableOutgoingBitrate
  );

  return transport;
}



export function closeTransports(socketId: string) {
  const entry = transports.get(socketId);
  if (!entry) return;

  entry.send?.close();
  entry.recv?.close();

  transports.delete(socketId);
}