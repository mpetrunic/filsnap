export interface GetPublicKeyRequest{
  method: "fil_getPublicKey";
}

export interface GetAddressRequest {
  method: "fil_getAddress";
}

export interface ExportSeedRequest {
  method: "fil_exportPrivateKey";
}

export interface ConfigureRequest {
  method: "fil_configure";
  params: {
    configuration: SnapConfig;
  };
}

export interface SignMessageRequest {
  method: "fil_signMessage";
  params: {
    message: MessageRequest;
  };
}

export interface SignMessageRawRequest {
  method: "fil_signMessageRaw";
  params: {
    message: string;
  };
}

export interface SendMessageRequest {
  method: "fil_sendMessage";
  params: {
    signedMessage: SignedMessage;
  };
}

export interface GetBalanceRequest {
  method: "fil_getBalance";
}

export interface GetMessagesRequest {
  method: "fil_getMessages";
}

export interface GetGasForMessageRequest {
  method: "fil_getGasForMessage";
  params: {
    message: MessageRequest;
    maxFee?: string;
  };
}

export type MetamaskFilecoinRpcRequest =
    GetPublicKeyRequest |
    GetAddressRequest |
    ExportSeedRequest |
    ConfigureRequest |
    GetBalanceRequest |
    GetMessagesRequest |
    SignMessageRequest |
    SignMessageRawRequest |
    SendMessageRequest |
    GetGasForMessageRequest;

type Method = MetamaskFilecoinRpcRequest["method"];

export interface WalletEnableRequest {
  method: "wallet_enable";
  params: object[];
}

export interface GetSnapsRequest {
  method: "wallet_getSnaps";
}

export interface SnapRpcMethodRequest {
  method: string;
  params: [MetamaskFilecoinRpcRequest];
}

export type MetamaskRpcRequest = WalletEnableRequest | GetSnapsRequest | SnapRpcMethodRequest;

export interface UnitConfiguration {
  symbol: string;
  decimals: number;
  image?: string;
  customViewUrl2?: string;
}

export interface SnapConfig {
  derivationPath: string;
  network: FilecoinNetwork;
  rpc: {
    token: string;
    url: string;
  };
  unit?: UnitConfiguration;
}

export type Callback<T> = (arg: T) => void;

// Filecoin types

export interface Message {
  to: string;
  from: string;
  nonce: number;
  value: string;
  gasfeecap: string;
  gaspremium: string;
  gaslimit: number;
  method: number;
  params?: string;
}

export interface SignedMessage {
  message: Message;
  signature: MessageSignature;
}

export interface MessageSignature {
  data: string;
  type: number;
}

export interface SignMessageResponse {
  signedMessage: SignedMessage
  confirmed: boolean
  error: Error
}

export interface SignRawMessageResponse {
  signature: string
  confirmed: boolean
  error: Error
}

export interface MessageRequest {
  to: string;
  value: string;
  gaslimit?: number;
  gasfeecap?: string;
  gaspremium?: string;
  nonce?: number;
  params?: string;
}

export interface MessageGasEstimate {
  gaslimit: number;
  gasfeecap: string;
  gaspremium: string;
  maxfee: string;
}

export interface MessageStatus {
  message: Message;
  cid: string;
}

export type FilecoinNetwork = "f" | "t";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FilecoinEventApi {}

export interface FilecoinSnapApi {
  getPublicKey(): Promise<string>;
  getAddress(): Promise<string>;
  getBalance(): Promise<string>;
  exportPrivateKey(): Promise<string>;
  configure(configuration: Partial<SnapConfig>): Promise<void>;
  signMessage(message: MessageRequest): Promise<SignMessageResponse>;
  signMessageRaw(message: string): Promise<SignRawMessageResponse>;
  sendMessage(signedMessage: SignedMessage): Promise<MessageStatus>;
  getMessages(): Promise<MessageStatus[]>;
  calculateGasForMessage(message: MessageRequest, maxFee?: string): Promise<MessageGasEstimate>;
}

export interface KeyPair {
  address: string;
  privateKey: string;
  publicKey: string;
}