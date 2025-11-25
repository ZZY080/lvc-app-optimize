// import { ContainerClient } from "@azure/storage-blob";
// import {
//   AzureContainer,
//   ErrorResponseDto,
//   ExceptionCodes,
//   PayloadResponseDto,
//   ResponseType,
// } from "@lvc/core";
// import { v4 as uuidv4 } from "uuid";

// export async function uploadFile(params: {
//   file: File;
//   sasToken: string;
//   progressHandler: (progress: number) => void;
//   abortController?: AbortController;
// }): Promise<PayloadResponseDto<string> | ErrorResponseDto<any>> {
//   const { file, sasToken, progressHandler, abortController } = params;

//   try {
//     const azureStorageEndpoint = `https://${process.env.NEXT_PUBLIC_AZURE_STORAGE_HOSTNAME}`;

//     const containerUrl = `${azureStorageEndpoint}/${AzureContainer.PROCESSING}`;
//     const sasUrl = `${containerUrl}?${sasToken}`;

//     const fileExtension = file.name.split(".").pop();
//     const fileName = uuidv4() + "." + fileExtension;

//     const containerClient = new ContainerClient(sasUrl, undefined, {
//       retryOptions: {
//         maxTries: 4,
//       },
//     });
//     const blobClient = containerClient.getBlockBlobClient(fileName);

//     await blobClient.uploadData(file, {
//       abortSignal:
//         abortController?.signal ?? AbortSignal.timeout(30 * 60 * 1000),
//       blockSize: 2 * 1024 * 1024,
//       maxSingleShotSize: 8 * 1024 * 1024,
//       concurrency: 20,
//       onProgress: (progress) =>
//         progressHandler(Math.round((100 * progress.loadedBytes) / file.size)),
//     });

//     return {
//       code: null,
//       type: ResponseType.PAYLOAD,
//       timestamp: new Date().toISOString(),
//       payload: `${containerUrl}/${fileName}`,
//     };
//   } catch (e) {
//     if (abortController?.signal?.aborted) {
//       return {
//         code: ExceptionCodes.FILE_UPLOAD_ABORTED,
//         type: ResponseType.ERROR,
//         timestamp: new Date().toISOString(),
//         payload: null,
//       };
//     }
//     return {
//       code: ExceptionCodes.FILE_UPLOAD_ERROR,
//       type: ResponseType.ERROR,
//       timestamp: new Date().toISOString(),
//       payload: null,
//     };
//   }
// }
