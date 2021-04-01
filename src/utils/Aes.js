/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable no-undef */

import CryptoJS from 'crypto-js'

const CRYPTOJSKEY = 'hAw6eqnFLKxpsDv3'
const base64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return Buffer.from(outputArray).toString('hex')
}

const fromHexString = (hexString) => {
  return new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
}

const uint8arrayToBase64 = (u8Arr) => {
  const CHUNK_SIZE = 0x8000 // arbitrary number
  let index = 0
  const length = u8Arr.length
  let result = ''
  let slice
  while (index < length) {
    slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length))
    result += String.fromCharCode.apply(null, slice)
    index += CHUNK_SIZE
  }
  return btoa(result)
}

// 加密
const encrypt = (plaintText) => {
  var options = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }
  var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY)
  var encryptedData = CryptoJS.AES.encrypt(plaintText, key, options)
  var encryptedBase64Str = encryptedData.toString()
  return base64ToUint8Array(encryptedBase64Str)
}
// 解密
const decrypt = (encryptedBase64Str) => {
  var b = fromHexString(encryptedBase64Str)
  var c = uint8arrayToBase64(b)
  var options = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }
  var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY)
  var decryptedData = CryptoJS.AES.decrypt(c, key, options)
  var decryptedStr = CryptoJS.enc.Utf8.stringify(decryptedData)
  return decryptedStr
}
export default {
  encrypt,
  decrypt
}
