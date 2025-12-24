import {
  createRouter,
  getMediasoupWorker,
  getRouterRtpCapabilities,
} from "../mediasoup";
import { Router } from "mediasoup/node/lib/types";

import { createWebRtcTransport } from "../mediasoup/transport";

export const createRouterSession = async (sessionCode: string) => {
  try {
    const worker = getMediasoupWorker();
    const router = await createRouter(sessionCode, worker);
    return router;
  } catch (err) {
    console.log(err);
  }
};

export const handleGetRtpCapabilities = (sessionCode: string) => {
  try {
    const router = getRouterRtpCapabilities(sessionCode);
    return router;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const handleCreateTransport = async (router: Router) => {
  try {
    const transport = await createWebRtcTransport(router);
    return transport;
  } catch (err) {
    console.log(err);
    return null;
  }
};
