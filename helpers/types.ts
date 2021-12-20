export type ActionMessageType = "action-react" | "action-thread"

export type ActionMessage = {
  actionMessageId: string;
  actionMessageType: ActionMessageType;
  title: string;
  guildId: string;
  channelId: string;
  roleId: string;
  actionThreadId?: string; // Only for action-thread
  timestamp: number;
}
