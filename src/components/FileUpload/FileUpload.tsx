import axios from "axios";
import React, { FC, useState } from "react";
import { UploadService } from "../../services/Upload.service";
import { fileToBlob } from "../../utils/file";
import { getStoregaValue } from "../../utils/localStorage";

export interface UploadParamObj {
  operation_id: string;
  href: string;
  method: string;
  templated: boolean;
}

export const FileUpload: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [accessTokenI, setAccessTokenI] = useState<string>("");
  const [uploadObj, setUploadUrl] = useState<UploadParamObj>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  let { current: tokenIsValid } = React.useRef<boolean>(null);

  const tokenValid = async () => {
    localStorage.setItem("accessToken", JSON.stringify(accessTokenI));
    setAccessTokenI("")
  };

  let accessToken = getStoregaValue("accessToken");

  React.useEffect(() => {
    if (accessToken) {
      const getUrl = async () => {
        try {
          const res = await UploadService.getUploadUrl();
          tokenIsValid = true;
          setUploadUrl(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getUrl();
    }
  }, [tokenIsValid, accessTokenI]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let dt = new DataTransfer();
    const files = event.target.files;
    if (files && files.length) {
      setFiles((prev) => [prev, ...Array.from(files)].flat(1));
    }
  };

  const handleUploadClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!files) {
      return;
    }
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("Files", files[i]);
      const blob = await fileToBlob(files[i]);

      try {
        setIsLoading(true);
        await UploadService.uploadFiles(uploadObj!.href, blob);
        setFiles([]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fileList = files ? files : [];

  return (
    <div className="wrapper">
      {accessToken ? (
        <>
          <form
            onSubmit={(e) => handleUploadClick(e)}
            className="input__wrapper"
          >
            <input
              onChange={handleOnChange}
              name="file"
              type="file"
              id="input__file"
              className="input input__file"
              multiple
            />
            <label htmlFor="input__file" className="input__file-button">
              <span className="input__file-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    opacity="0.5"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 14.25C3.41421 14.25 3.75 14.5858 3.75 15C3.75 16.4354 3.75159 17.4365 3.85315 18.1919C3.9518 18.9257 4.13225 19.3142 4.40901 19.591C4.68577 19.8678 5.07435 20.0482 5.80812 20.1469C6.56347 20.2484 7.56459 20.25 9 20.25H15C16.4354 20.25 17.4365 20.2484 18.1919 20.1469C18.9257 20.0482 19.3142 19.8678 19.591 19.591C19.8678 19.3142 20.0482 18.9257 20.1469 18.1919C20.2484 17.4365 20.25 16.4354 20.25 15C20.25 14.5858 20.5858 14.25 21 14.25C21.4142 14.25 21.75 14.5858 21.75 15V15.0549C21.75 16.4225 21.75 17.5248 21.6335 18.3918C21.5125 19.2919 21.2536 20.0497 20.6517 20.6516C20.0497 21.2536 19.2919 21.5125 18.3918 21.6335C17.5248 21.75 16.4225 21.75 15.0549 21.75H8.94513C7.57754 21.75 6.47522 21.75 5.60825 21.6335C4.70814 21.5125 3.95027 21.2536 3.34835 20.6517C2.74643 20.0497 2.48754 19.2919 2.36652 18.3918C2.24996 17.5248 2.24998 16.4225 2.25 15.0549C2.25 15.0366 2.25 15.0183 2.25 15C2.25 14.5858 2.58579 14.25 3 14.25Z"
                    fill="#1C274C"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2.25C12.2106 2.25 12.4114 2.33852 12.5535 2.49392L16.5535 6.86892C16.833 7.17462 16.8118 7.64902 16.5061 7.92852C16.2004 8.20802 15.726 8.18678 15.4465 7.88108L12.75 4.9318V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V4.9318L8.55353 7.88108C8.27403 8.18678 7.79963 8.20802 7.49393 7.92852C7.18823 7.64902 7.16698 7.17462 7.44648 6.86892L11.4465 2.49392C11.5886 2.33852 11.7894 2.25 12 2.25Z"
                    fill="#1C274C"
                  />
                </svg>
              </span>
              <span className="input__file-button-text">Выберите файл</span>
            </label>
            <ul className="files__list">
              {files.map((file) => (
                <li className="files__file" key={file.name}>
                  {file.name}
                </li>
              ))}
            </ul>
            <button disabled={!files} type="submit">
              {!isLoading ? (
                "Отправить"
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                    opacity=".25"
                  />
                  <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      dur="0.75s"
                      values="0 12 12;360 12 12"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
              )}
            </button>
          </form>
        </>
      ) : (
        <>
          <input
            className="input"
            value={accessTokenI}
            onChange={(e) => setAccessTokenI(e.target.value)}
            type="text"
            required
            placeholder="Ввод"
          />
          <button onClick={() => tokenValid()}>Проверить токен</button>
        </>
      )}
    </div>
  );
};
