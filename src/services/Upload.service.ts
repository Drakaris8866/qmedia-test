import axios from "axios";
import { UploadParamObj } from "../components/FileUpload/FileUpload";
import { getStoregaValue } from "../utils/localStorage";

let accessToken = getStoregaValue("accessToken");

export const UploadService = {
  async getUploadUrl() {
    return await axios.get<UploadParamObj>(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${Math.random()}`,
      {
        headers: {
          Authorization: `OAuth ${accessToken}`,
        },
      }
    );
  },
  async uploadFiles(url: string, file: any) {
    return await axios.put(`${url}`, file, {
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
  },
};
