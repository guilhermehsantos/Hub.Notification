import { EFileFormat } from '../enums/eFileFormat';

export function isUrlOrBase64(input: string): EFileFormat {
  const urlPattern =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/;

  const base64Pattern =
    /^data:(image|application)\/[a-zA-Z]+;base64,[a-zA-Z0-9+/=]+$/;

  if (urlPattern.test(input)) {
    return EFileFormat.URL;
  } else if (base64Pattern.test(input)) {
    return EFileFormat.BASE64;
  } else {
    return EFileFormat.INVALID;
  }
}
