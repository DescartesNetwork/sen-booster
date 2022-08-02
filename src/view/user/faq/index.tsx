import { Col, Collapse, Row, Typography } from 'antd'
import { forwardRef, useRef } from 'react'

const { Panel } = Collapse

const FAQ = [
  {
    question: ' What is the Sen Booster?',
    answer:
      'Retailer registration mechanism is a process where users can join as liquidity provider for sentre within 7 days to unlock OTC feature.',
  },
  {
    question: 'How does the Sen Booster work?',
    answer:
      'Retailer registration mechanism is a process where users can join as liquidity provider for sentre within 7 days to unlock OTC feature.',
  },
  {
    question: 'How do I buy token?',
    answer:
      'Retailer registration mechanism is a process where users can join as liquidity provider for sentre within 7 days to unlock OTC feature.',
  },
  {
    question: 'What is the NFT used for?',
    answer:
      'Retailer registration mechanism is a process where users can join as liquidity provider for sentre within 7 days to unlock OTC feature.',
  },
]

function Faq(_: any, ref: any) {
  const innerRef = useRef(ref)

  return (
    <Row ref={innerRef}>
      <Col span={24}>
        <Typography.Title level={3}>FAQ</Typography.Title>
      </Col>
      <Col span={24}>
        <Collapse
          defaultActiveKey={['0']}
          bordered={false}
          expandIconPosition="end"
          ghost
        >
          {FAQ.map((val, idx) => (
            <Panel header={`${idx + 1} ${val.question}`} key={idx}>
              <Typography.Text>{val.answer}</Typography.Text>
            </Panel>
          ))}
        </Collapse>
      </Col>
    </Row>
  )
}

export default forwardRef(Faq)
