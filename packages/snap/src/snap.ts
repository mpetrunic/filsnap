import {EmptyMetamaskState, Wallet} from "./interfaces";
import {FilecoinEventApi} from "@nodefactory/metamask-filecoin-types";
import {getAddress} from "./rpc/getAddress";
import {exportSeed} from "./rpc/exportSeed";
import {getPublicKey} from "./rpc/getPublicKey";
import {configure} from "./rpc/configure";
import {updateAsset} from "./asset";

declare let wallet: Wallet;

wallet.registerApiRequestHandler(async function (origin: URL): Promise<FilecoinEventApi> {
  return {};
});

wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  const state = wallet.getPluginState();
  if (!state) {
    // initialize state if empty and set default config
    wallet.updatePluginState(EmptyMetamaskState());
  }
  switch (requestObject.method) {
    case "configure":
      const configuration = configure(
        wallet, requestObject.params.configuration.network, requestObject.params.configuration
      );
      // TODO getBalance
      await updateAsset(wallet, originString, "0");
      return configuration;
    case "getAddress":
      return await getAddress(wallet);
    case "getPublicKey":
      return await getPublicKey(wallet);
    case "exportSeed":
      return exportSeed(wallet);
    default:
      throw new Error("Unsupported RPC method");
  }
});
