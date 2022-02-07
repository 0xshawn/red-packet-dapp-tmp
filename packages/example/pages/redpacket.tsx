import {useEffect, useState} from 'react'
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

const baseURL = '/'

export default function RedPacket() {
  const [api, setApi] = useState<ApiPromise>()
  const [phala, setPhala] = useState<PhalaInstance>()

  // useEffect(() => {
  //   // Create a polkaDot API instance with custom types
  //   createApi({
  //     endpoint: 'ws://rpc.wayknew.com:19944',
  //     types: {
  //       TemplateRequestData: {_enum: {Foo: null}},
  //       TemplateResponseData: {
  //         _enum: {Bar: null},
  //       },
  //       TemplateRequest: {
  //         head: 'ContractQueryHead',
  //         data: 'TemplateRequestData',
  //       },
  //       TemplateResponse: {
  //         nonce: '[u8; 32]',
  //         result: 'Result<TemplateResponseData>',
  //       },
  //       TemplateCommand: {_enum: {Foo: null}},
  //     },
  //   }).then((api) => {
  //     // setApi(api)

  //     // // Create a Phala instance
  //     // return createPhala({api, baseURL}).then((phala) => {
  //     //   setPhala(() => phala)
  //     // })
  //   })
  // }, [])

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
                &nbsp; I'm Lucky
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
