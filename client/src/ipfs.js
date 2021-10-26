import * as IPFS from "ipfs";

const ipfsOptions = {
  preload: { enabled: false },
  EXPERIMENTAL: {
    pubsub: true,
  },
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  config: {
    Addresses: {
      Swarm: [
        "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
        "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/",
        "/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/",
      ],
    },
  },
};

const ipfs = IPFS.create(ipfsOptions);

export default ipfs;
