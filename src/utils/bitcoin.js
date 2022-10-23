import {sha256} from 'js-sha256';
import {Buffer} from 'safe-buffer';
import bs58 from 'bs58';
import CoinKey from 'coinkey';
import Decimal from 'decimal.js';
import computePrivateKeySec256k1 from './computePrivateKeySec256k1';

export const bitcoinExp = Decimal(10 ** 8);

const getWif = async (secret1B58, secret2B58) => {
  const privkeyB256 = await computePrivateKeySec256k1(secret1B58, secret2B58);
  const formats = {
    bitcoin: {first: [128], compressed: true},
    litecoin: {first: [176], compressed: true},
    tezos: {first: [17, 162, 224, 201], compressed: false},
    bitcoincash: {first: [128], compressed: true},
  };
  // eslint-disable-next-line prefer-const
  let outputs = {};
  let toDigest;
  let doublesha256;
  let finalPrivkeyB256;
  Object.keys(formats).forEach(format => {
    if (formats[format].compressed) {
      toDigest = [
        ...formats[format].first,
        ...privkeyB256.toArray('be', 32),
        1,
      ];
    } else {
      toDigest = [...formats[format].first, ...privkeyB256.toArray('be', 32)];
    }
    doublesha256 = sha256.digest(sha256.digest(toDigest));
    finalPrivkeyB256 = [...toDigest, ...doublesha256.slice(0, 4)];

    outputs[format] = bs58.encode(Buffer.from(finalPrivkeyB256));
  });
  return outputs;
};

const getWifBTC = async (secret1B58, secret2B58) => {
  const {bitcoin} = await getWif(secret1B58, secret2B58);
  return bitcoin;
};

const getPublicKeyFromWif = wif => {
  const ck = CoinKey.fromWif(wif);
  return ck.publicAddress;
};

const isValidPublicAddress = address => {
  if (!address) {
    return false;
  }

  try {
    const decoded = bs58.decode(address);
    if (decoded.length !== 25) {
      return false;
    }

    const checksum = decoded.slice(decoded.length - 4);
    const body = decoded.slice(0, decoded.length - 4);
    const goodChecksum = Buffer.from(
      sha256.digest(sha256.digest(body)).slice(0, 4),
    );
    if (decoded[0] !== 0x00 && decoded[0] !== 0x05) {
      return false;
    }
    return Buffer.compare(checksum, goodChecksum) === 0;
  } catch (e) {
    return false;
  }
};

const historyURL = 'https://live.blockcypher.com/btc/address/';
export const getBalance = address => {
  return fetch(
    `https://api.blockcypher.com/v1/btc/main/addrs/${address}/balance`,
  )
    .then(response => {
      return response.json();
    })
    .then(result => {
      return {
        finalBalance: Decimal(result.final_balance).div(bitcoinExp).toNumber(),
        unconfirmedBalance: Decimal(result.unconfirmed_balance)
          .div(bitcoinExp)
          .toNumber(),
      };
    });
};

export const getBalances = addresses => {
  return fetch(
    `https://blockchain.info/multiaddr?active=${addresses.join('|')}`,
  )
    .then(response => {
      return response.json();
    })
    .then(res => {
      return res;
    });
};

export const getBitCoinRate = () => {
  return fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(response => {
      return response.json();
    })
    .then(result => {
      return Decimal(result.bpi.USD.rate.replace(',', ''));
    });
};
export const getBitcoinData = () => {
  return fetch(
    'https://pro-api.coinmarketcap.com/v2/cryptocurrency/price-performance-stats/latest?symbol=BTC&time_period=24h&convert_id=2781',
    {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': '7cc3cc5c-5a09-48c7-b94c-5e8140416caa',
        Accept: 'application/json',
      },
    },
  )
    .then(response => {
      return response.json();
    })
    .then(res => {
      let BTC = res.data.BTC[0];
      let result = {
        open: BTC.periods['24h'].quote[2781].open,
        low: BTC.periods['24h'].quote[2781].low,
        close: BTC.periods['24h'].quote[2781].close,
        high: BTC.periods['24h'].quote[2781].high,
        percent_change: BTC.periods['24h'].quote[2781].percent_change,
      };
      return result;
    });
};

export default {
  getWif,
  getWifBTC,
  getPublicKeyFromWif,
  isValidPublicAddress,
  getBalance,
  historyURL,
};
