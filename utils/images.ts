import BlobUtil from "react-native-blob-util";
import {Platform} from "react-native";

type IconTypes =
  | { kind: 'loading' }
  | { kind: 'svg'; xml: string }
  | { kind: 'raster'; uri: string }
  | { kind: 'fallback' }

const isSvgCT = (ct?: string) => !!ct && /image\/svg\+xml/i.test(ct);
const isHtmlCT = (ct?: string) => !!ct && /text\/html/i.test(ct);
const looksLikeSvg = (s: string) => /^<svg[\s>]/i.test(s.trim());
const looksLikeHtml = (s: string) => /^<!doctype html/i.test(s) || /<html/i.test(s);

async function fetchIcon(uri: string): Promise<IconTypes> {
  if (!uri) return { kind: 'fallback' };
  let res;
  try {
    res = await BlobUtil.config({ fileCache: true }).fetch('GET', uri);
  } catch (err) {
    return { kind: 'fallback' };
  }

  const status = res.respInfo?.status ?? 0;
  if (status < 200 || status >= 300) return { kind: 'fallback' };

  const headers = res.respInfo?.headers ?? {};
  const ct = headers['content-type'] || headers['Content-Type'];

  if (isSvgCT(ct)) {
    return { kind: 'svg', xml: await res.text() };
  }

  if (isHtmlCT(ct)) return { kind: 'fallback' };

  const body = await res.text();
  const peek = body.slice(0, 2048);

  if (looksLikeHtml(peek)) return { kind: 'fallback' };
  if (looksLikeSvg(peek)) return { kind: 'svg', xml: body };

  const path = res.path();
  const fileUri = Platform.OS === 'android' ? `file://${path}` : path;
  return { kind: 'raster', uri: fileUri };
}

export {
    fetchIcon,
    IconTypes
}
