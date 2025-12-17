import { Producer, RtpParameters } from "mediasoup/node/lib/types";
import { getTransport } from "./transport";

const producers = new Map<string, Map<string, Producer>>();

export async function createProducer(
  socketId: string,
  kind: "audio" | "video",
  rtpParameters: RtpParameters
) {
  const transport = getTransport(socketId, "send");
  const producer = await transport.produce({
    kind,
    rtpParameters,
  });

  let socketProducers = producers.get(socketId);
  if (!socketProducers) {
    socketProducers = new Map();
    producers.set(socketId, socketProducers);
  }
  socketProducers.set(producer.id, producer);

  producer.on("transportclose", () => {
    socketProducers?.delete(producer.id);
  });

  producer.on("@close", () => {
    socketProducers?.delete(producer.id);
  });
  return {
    id: producer.id,
    kind: producer.kind,
  };
}


