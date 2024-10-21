import type { CommonResponse, CommonResponseWithoutData } from '@/api/model/common'
import type { Config } from '@/api/model/config'
import type { Profile } from '@/api/model/profile'
import type { RunningInfo } from '@/api/model/status'
import { useEndpointStore } from '@/stores/endpoint'
import urlJoin from 'url-join'
import sampleInfo from './sampleInfo.json'
import { getCommonHeader } from './utils'

export async function GetProfile(): Promise<CommonResponse<Profile>> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/general/profile'), location.href)
  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function SaveProfile(config: Profile): Promise<CommonResponseWithoutData> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/general/profile'), location.href)
  return fetch(url, {
    headers: getCommonHeader(),
    method: 'PUT',
    body: JSON.stringify(config)
  }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function GetConfig(): Promise<CommonResponse<Config>> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/general/config'), location.href)
  return fetch(url, { headers: getCommonHeader() }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function SaveConfig(config: Config): Promise<CommonResponseWithoutData> {
  const endpointStore = useEndpointStore()
  await endpointStore.serverAvailable

  const url = new URL(urlJoin(endpointStore.endpoint, 'api/general/config'), location.href)
  return fetch(url, {
    headers: getCommonHeader(),
    method: 'PUT',
    body: JSON.stringify(config)
  }).then((res) => {
    endpointStore.assertResponseLogin(res)
    return res.json()
  })
}

export async function GetRunningInfo(): Promise<CommonResponse<RunningInfo>> {
  return new Promise((res) =>
    setTimeout(() => {
      res({
        data: sampleInfo as RunningInfo,
        success: true,
        message: 'ok'
      })
    }, 1000)
  )
}
