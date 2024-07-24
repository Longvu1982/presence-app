import * as SecureStore from "expo-secure-store";

export async function saveSecure(key: string, value: A) {
  await SecureStore.setItemAsync(key, value);
}

export function saveSecureSync(key: string, value: A) {
  SecureStore.setItem(key, value);
}

export async function deleteSecure(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export async function getSecureValue(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export function getSecureValueSync(key: string) {
  let result = SecureStore.getItem(key);
  return result;
}
