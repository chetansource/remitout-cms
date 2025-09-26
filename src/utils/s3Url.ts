export const getS3Url = (filename: string) => {
  if (!filename) return ''
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`
}
