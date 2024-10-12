export type receiveMessageDTO = {
  id: string;
};

export abstract class MessageGateway {
  abstract publishMessage(payload: receiveMessageDTO): Promise<void>;
}
