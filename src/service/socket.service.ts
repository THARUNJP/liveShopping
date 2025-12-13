import { sessionsMap } from "../config/sessionStore";
import {
  SessionCallType,
  SessionData,
  SessionRole,
  SessionStatus,
} from "../types/types";

export const handleJoinUser = (
  sessionCode: string,
  name: string,
  socketId: string
) => {
  const participantData = {
    socketId,
    name,
    role: SessionRole.USER,
    joinedAt: new Date(),
  };
  const session: SessionData | undefined = sessionsMap.get(sessionCode);
  if (!session) return;
  session.participants.set(socketId, participantData);
};

export const handleSessionCreation = (
  sessionCode: string,
  call_type: SessionCallType
) => {
  if (!sessionsMap.has(sessionCode)) {
    sessionsMap.set(sessionCode, {
      maxParticipants: call_type === SessionCallType.SFU ? 10 : 5,
      status: SessionStatus.ACTIVE,
      participants: new Map(),
    });
  }
};
