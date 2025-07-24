import React, { useEffect, useState } from 'react';
import { Image, ImageProps, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
// @ts-ignore
import reactLogo from '../assets/images/react-logo.png';
import {fetchIcon, IconTypes} from "@/utils/images";

type Props = Omit<ImageProps, 'source'> & { uri: string };

export default function AssetIcon({ uri, style, ...imageProps }: Props) {
  const [state, setState] = useState<IconTypes>({ kind: 'loading' });

  useEffect(() => {
    let mounted = true;
    (async () => {
      const result = await fetchIcon(uri);
      if (mounted) setState(result);
    })();
    return () => { mounted = false; };
  }, [uri]);

  if (state.kind === 'loading') return <View style={style} />;
  if (state.kind === 'fallback')
    return <Image source={reactLogo} style={style} />;

  if (state.kind === 'svg') {
    return <SvgXml xml={state.xml} width={40} height={40} style={style} />;
  }

  return <Image source={{ uri: state.uri }} style={style} {...imageProps} />;
}
