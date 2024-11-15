import { Timestamp } from "firebase/firestore";

export interface GameLogItem {
  timestamp: string | Timestamp;
  message: string;
}