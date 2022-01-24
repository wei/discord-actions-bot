export type ActionMessageType = "action-react" | "action-thread" | "action-poll"

export type ActionMessage = {
  actionMessageId: string;
  actionMessageType: ActionMessageType;
  title: string;
  commandInput?: string;
  guildId: string;
  channelId: string;
  roleId: string;
  timestamp: number;
  templateId?: string;
}
