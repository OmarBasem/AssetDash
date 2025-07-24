import React, {useEffect, useState} from 'react';
import {Image, ImageProps} from 'react-native';
import BlobUtil from 'react-native-blob-util';

async function fetchImage(fileUri: string, setLocalUri: (uri: string) => void) {
    const res = await BlobUtil.config({
        fileCache: true,
        appendExt: 'png', // You might want to make this dynamic or configurable
    }).fetch('GET', fileUri);

    setLocalUri('file://' + res.path()); // Use path() for a local file URI
}

type Props = ImageProps & { uri: string };


function CustomImage({ uri, ...imageProps }: Props) {
    const [localUri, setLocalUri] = useState<string | null>(null);

    useEffect(() => {
        fetchImage(uri, setLocalUri);
    }, [uri]);

    if (!localUri) return null;

  return <Image source={{ uri: localUri }} {...imageProps} />;
}

export default CustomImage;
