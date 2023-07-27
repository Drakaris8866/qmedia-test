export const fileToBlob = async (file: any) =>
  new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
