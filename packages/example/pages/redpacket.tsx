import {useEffect, useState} from 'react'
import {FormEventHandler, useCallback, useRef} from 'react'
import type {ApiPromise} from '@polkadot/api'
import {
  create as createPhala,
  randomHex,
  signCertificate,
  CertificateData,
  PhalaInstance,
} from '@phala/sdk'
import {MoneyCollectOutlined, RightOutlined} from '@ant-design/icons'
import {enablePolkadotExtension} from 'lib/polkadotExtension'
import {createApi} from 'lib/polkadotApi'
import {useAtom} from 'jotai'
import accountAtom from 'atoms/account'
import {getSigner} from 'lib/polkadotExtension'
import {toaster} from 'baseui/toast'

const baseURL = '/'

const RedPacket = ({api, phala}: {api: ApiPromise; phala: PhalaInstance}) => {
  const [account] = useAtom(accountAtom)
  const [number, setNumber] = useState('')
  const [certificateData, setCertificateData] = useState<CertificateData>()
  const [signCertificateLoading, setSignCertificateLoading] = useState(false)
  const [guessLoading, setGuessLoading] = useState(false)
  const [owner, setOwner] = useState('')
  const unsubscribe = useRef<() => void>()

  useEffect(() => {
    const _unsubscribe = unsubscribe.current
    return () => {
      api?.disconnect()
      _unsubscribe?.()
    }
  }, [api])

  useEffect(() => {
    setCertificateData(undefined)
  }, [account])

  const onSignCertificate = useCallback(async () => {
    if (account) {
      setSignCertificateLoading(true)
      try {
        const signer = await getSigner(account)
        setCertificateData(
          await signCertificate({
            api,
            account,
            signer,
          })
        )
        toaster.positive('Certificate signed', {})
      } catch (err) {
        toaster.negative((err as Error).message, {})
      }
      setSignCertificateLoading(false)
    }
  }, [api, account])

  return (
    <div>
      <div className="redpacket-row">
        <div className="redpacket-col">
          <div className="redpacket-wrapper">
            <div className="redpacket">
              <div className="redpacket-balance-label">PHA Left</div>
              <div className="redpacket-balance">100 PHA</div>
              <div className="redpacket-desc">Get random red packet!</div>
              <button className="redpacket-get">
                <MoneyCollectOutlined />
                &nbsp; I&apos;m Lucky
              </button>
              <div className="redpacket-donate">
                <RightOutlined />
                Donate more PHA on this red packet!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

RedPacket.title = 'Red Packet'

export default RedPacket
