import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function MarkdownAlert() {
  const url = 'https://www.markdownguide.org'
  return (
    <Alert variant="info">
      You can use <b>Markdown</b> in your message. <Alert.Link href={url} target="_blank">Learn More</Alert.Link>
    </Alert>
  )
}
