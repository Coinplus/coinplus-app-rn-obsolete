import EncryptedStorage from 'react-native-encrypted-storage';

export const storeAuthData = async (authData: any) => {
  try {
    await EncryptedStorage.setItem('user_auth', JSON.stringify(authData));
  } catch (error) {
    console.log(error);
  }
};

export const retrivaeAuthData = () => {
  return new Promise<any>(async resolve => {
    try {
      const session = await EncryptedStorage.getItem('user_auth');

      if (session !== undefined && session !== null) {
        resolve(JSON.parse(session));
      }
      resolve({});
    } catch (error) {
      console.log(error);
      resolve({});
    }
  });
};
export const storeCardData = async function storeCardData(cardData: any) {
  try {
    retriveCardData().then(data => {
      if (data) {
        let dt = data;
        dt.push(cardData);
      } else {
        data = [cardData];
      }
      EncryptedStorage.setItem('card_data', JSON.stringify(data));
    });
  } catch (error) {
    console.log(error);
  }
};

export const retriveCardData = function retriveCardData() {
  return new Promise<any>(async resolve => {
    try {
      EncryptedStorage.getItem('card_data').then(session => {
        if (session !== undefined && session !== null) {
          resolve(JSON.parse(session));
        }
        resolve(undefined);
      });
    } catch (error) {
      console.log(error);
      resolve(undefined);
    }
  });
};
