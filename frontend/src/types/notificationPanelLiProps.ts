export interface NotificationPanelLiProps {
    id: number;
    date?: Date;
    time: string;
    read: boolean;
    msgType: string;
    message: string;
    messageHeader: string;
}