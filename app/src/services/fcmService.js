import messaging from "@react-native-firebase/messaging";

export async function registerFCM() {
  try {
    alert("START");

    const token = await messaging().getToken();

    alert("TOKEN = " + token);

    return token;
  } catch (e) {
    alert("MESSAGE = " + e.message);

    if (e.code) {
      alert("CODE = " + e.code);
    }

    console.log(e);

    return null;
  }
}
