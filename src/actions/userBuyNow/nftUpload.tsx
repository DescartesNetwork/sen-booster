import React, { useState } from 'react'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload'

import { Col, Row, Typography, Upload, UploadProps } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { notifyError, notifySuccess } from 'helper'

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

function NftUpload() {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      notifySuccess('You can only upload JPG/PNG file!', '')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      notifyError('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const uploadButton = (
    <div>
      {loading ? (
        <IonIcon name="refresh-outline" />
      ) : (
        <IonIcon name="add-outline" />
      )}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  return (
    <Row>
      <Col span={24}>
        <Typography.Text>Use NFTs to increase Buy-back rate</Typography.Text>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {[1, 2, 3].map((val) => (
            <Col span={5}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: 64 }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default NftUpload
