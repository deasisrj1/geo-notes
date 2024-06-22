'use client'

/*
    DO NOT USE SSR
    for this component when imported
    const UploadNoSSR = dynamic(() => import("@/components/Upload"), {ssr: false})

*/
import { useFormState } from 'react-dom'
import { useRef, useState } from "react"

import { create } from '@/actions';

import { v4 as uuidv4 } from 'uuid';
// import { createClient } from '@supabase/supabase-js'
// import { createClient } from "@/utils/supabase/frontend"
import { createClient } from '@/utils/supabase/client';

import { InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
const { Dragger } = Upload;

/*
    supabase docs wrong url: https://github.com/supabase/storage-js/issues/64
*/
const PUBLIC_STORAGE = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_STORAGE_URL
const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET
const supabase = createClient();

function getUuid() {
    let uuid = null
    if (window?.crypto) {
        uuid = crypto.randomUUID();
    } else {
        uuid = uuidv4()
    }
    localStorage.setItem("uuid", JSON.stringify(
        uuid
    ))
    return uuid
}

const handleSubmit = (event) => {
    event.preventDefault()

    return localStorage.setItem("uuid", JSON.stringify(null))
}

export default function Home() {
    const defaultFileList = useRef(JSON.parse(localStorage.getItem("defaultFileList")) || [])
    const uuid = useRef(JSON.parse(localStorage.getItem("uuid")) || getUuid())
    const [state, formAction] = useFormState(create, {
        formId: uuid.current,
        primaryImgUrl: "",
        imgUrls: []
    })

    const handleUpload = async (file, fileName) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user?.id) {
            return { error: new Error("Not logged in") }
        }

        const { data, error } = await supabase
            .storage
            .from(BUCKET_NAME)
            .upload(`public/${user?.id}/${uuid.current}/${fileName}`, file, {
                cacheControl: '3600',
                upsert: false
            });
        return {
            data,
            error
        }
    }

    const beforeUpload = (file) => {
        const { lastModified, name, uid } = file
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
            return Upload.LIST_IGNORE

        }
        console.log("beforeUpload", file)
        const isLt2MB = file.size / 1024 / 1024 < 5;
        if (!isLt2MB) {
            message.error('Image must smaller than 5MB!');
            return Upload.LIST_IGNORE
        }

        if (defaultFileList.current?.find((fileObj) => name == fileObj?.name)) {
            return Upload.LIST_IGNORE;
        }
        if (isJpgOrPng && isLt2MB && defaultFileList.current?.length < 5) {
            return true
        }
        return Upload.LIST_IGNORE;
    };

    const handleCustomRequest = async ({ onSuccess, onError, file, action }) => {
        const { error, data } = await handleUpload(file, file?.name)
        file.url = `${PUBLIC_STORAGE}${data.fullPath}`
        if (error) {
            onError()
        } else {
            onSuccess()
        }
    }
    const handleRemove = async (file) => {
        const newFileList = defaultFileList.current.filter(fileObj => fileObj.name != file.name)
        defaultFileList.current = newFileList
        const { data: { user } } = await supabase.auth.getUser()
        if (!user?.id) {
            return console.log("err")
        }
        const { lastModified, name, uid } = file;
        const { data, error } = await supabase
            .storage
            .from(BUCKET_NAME)
            .remove([`public/${user?.id}/${uuid.current}/${name}`]);

        if (error) {
            message.error(`${file.name} file delete failed.`);
        }
        localStorage.setItem("defaultFileList", JSON.stringify(
            [...defaultFileList.current]
        ))
    }

    const handleChange = (info) => {
        const { status } = info.file;
        if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        } else if (status == 'done') {
            const { uid, name, thumbUrl, url } = info.file
            let fileObj = {
                uid,
                name,
                url
            }
            localStorage.setItem("defaultFileList", JSON.stringify(
                [...defaultFileList.current, fileObj]
            ))
        }
    }

    return (
        <>
            <h4>
                Please upload 5 photos.
            </h4>
            <form action={formAction}>
                <input type="text" name="make" />

                <Dragger
                    defaultFileList={defaultFileList.current}
                    maxCount={4}
                    accept={"image/*"}
                    listType="picture"
                    multiple={true}
                    beforeUpload={beforeUpload}
                    customRequest={handleCustomRequest}
                    onRemove={handleRemove}
                    itemRender={(originNode, file) => (
                        <div style={{ backgroundColor: 'transparent' }}>{originNode}</div>
                    )}
                    onChange={handleChange}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click to select photos or drag photos to this area</p>
                </Dragger>
                <button type="submit">Send</button>
            </form>

        </>
    )
}