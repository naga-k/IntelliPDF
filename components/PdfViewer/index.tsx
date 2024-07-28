import React from 'react'
import Iframe from 'react-iframe'

type Props = {
  pdf_url: string
}

const PdfViewer = ({ pdf_url }: Props) => {
  return (
    <Iframe
      width="100%"
      height="100%"
      url={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
    />
  )
}

export default PdfViewer