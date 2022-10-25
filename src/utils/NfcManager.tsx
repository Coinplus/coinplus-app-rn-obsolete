import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';

// Pre-step, call this before any NFC operations
let isActive: boolean;
export const startNFC = () => {
  NfcManager.start().then(res => (isActive = true));
};

export const stopNFC = () => {
  NfcManager.cancelTechnologyRequest().then(res => {
    isActive = false;
  });
};

export const readNFC = () => {
  return new Promise(async resolve => {
    try {
      NfcManager.start().then(async () => {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag();
        let publicId = onTagDiscovered(tag);
        console.log(publicId);
        stopNFC();
        resolve(publicId);
      });
    } catch (ex) {
      console.warn('Oops!', ex);
      stopNFC();
      resolve(undefined);
    }
  });
};

const onTagDiscovered = (tag: any) => {
  try {
    if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
      const text = Ndef.text.decodePayload(tag.ndefMessage[0].payload);
      const publicKey = parseScannedCode(text);
      return publicKey;
    }
    if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
      const uri = Ndef.uri.decodePayload(tag.ndefMessage[0].payload);
      const publicKey = parseScannedCode(uri);
      return publicKey;
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

const parseScannedCode = (payload: string) => {
  if (!payload) {
    throw new Error("Payload can't be empty");
  }

  if (typeof payload !== 'string' && !(payload instanceof String)) {
    throw new Error('Payload must be a string');
  }

  /**
   * Payload is either a URL or the public address
   */

  // Remove trailing "/" if there's one
  const sanitizedUrl = payload.replace(/\/$/, '');

  // Extract last segment
  const lastSegment = sanitizedUrl.substr(sanitizedUrl.lastIndexOf('/') + 1);

  // SOLO pro data from QR and nfc ends with “?n=x” to identify the support.
  // Thus we need to split the last segment with "?"
  const splittedLastSegment = lastSegment.split('?');
  const address = splittedLastSegment[0];

  return address.trim();
};
