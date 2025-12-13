import { Request, Response } from "express";
import { SessionCallType } from "../types/types";

async function createSession(req: Request, res: Response): Promise<Response> {
  try {
    const { hostName, callType } = req.body;

    if (!hostName || !callType) {
      return res
        .status(400)
        .json({ error: "hostName and callType are required" });
    }
    if (!Object.values(SessionCallType).includes(callType)) {
      return res.status(400).json({ error: "Invalid callType" });
    }

    return res.status(200).json("kbhuh");
  } catch (error: unknown) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      timestamp: error,
    });
  }
}

export { createSession };
