import { getApi } from '../../../../utils/api'

export const signS3Path = async (s3Path) => {
  return await (await getApi()).post(`/api/s3/sign`, { s3Path })
}
