"use client";

import Uppy from "@uppy/core";
import { useEffect } from "react";
import XHR from "@uppy/xhr-upload";
import Dashboard from "@uppy/dashboard";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { strapiConfig } from "@/config/strapi";
import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { BsCameraFill } from "react-icons/bs";
import { IMedia } from "@/infra/api/strapi/models/listing";

export const Uploader = <T extends FieldValues>(
  props: UseControllerProps<T>
) => {
  const { field } = useController(props);
  useEffect(() => {
    const uppy = new Uppy({ autoProceed: true })
      .use(Dashboard, {
        inline: true,
        width: "600px",
        height: 250,
        target: "#drag-drop",
        locale: {
          strings: {
            browseFiles: "点击此处",
            dropPasteFiles: "%{browseFiles}上传图片",
          },
        },
        doneButtonHandler: undefined,
        hideUploadButton: true,
        showRemoveButtonAfterComplete: true,
      })

      .use(XHR, {
        id: "uploader",
        endpoint: `${strapiConfig.apiUrl}/api/upload`,
        headers: {
          authorization: `Bearer ${strapiConfig.authToken}`,
        },
        bundle: true,
        fieldName: "files",
        getResponseData(responseText, response) {
          const uploadedFiles = JSON.parse(responseText);
          var files = uppy.getFiles();
          files
            .filter((x) => x.source === "Dashboard")
            .forEach((file) => {
              var matchFile = uploadedFiles.find(
                (x: IMedia) => x.name === file.name
              );
              if (matchFile) {
                uppy.setFileMeta(file.id, {
                  id: matchFile.id,
                });
              }
            });

          field.onChange(uppy.getFiles().map((x) => x.meta.id));
          field.onBlur();
        },
      });

    Promise.all(
      field.value?.map(async (file: IMedia) => {
        const result = await fetch(file.url);
        const id = uppy.addFile({
          name: file.name,
          type: file.mime,
          data: await result.blob(),
          source: "url",
          meta: {
            id: file.id,
            progress: { uploadComplete: true, uploadStarted: true },
          },
        });
        console.log("update file meta");
        uppy.setFileState(id, {
          progress: { uploadComplete: true, uploadStarted: true },
        });
      })
    ).then(() => {
      uppy.on("file-removed", (file) => {
        uppy.removeFile(file.id);
        field.onChange(uppy.getFiles().map((x) => x.meta.id));
        field.onBlur();
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        id="drag-drop"
        className="mx-auto w-100 md:w-[600px] relative m-auto"
      >
        <div
          className="absolute left-[50%] top-[50%] z-10"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <BsCameraFill size="150" color="gainsboro" />
        </div>
      </div>
    </>
  );
};
