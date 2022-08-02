import { Col, Collapse, Row, Typography } from 'antd'

const { Panel } = Collapse

const FAQ = [
  {
    question: ' What is the Sen Booster?',
    answer:
      'Sen Booster is an exchange that allows users to buy tokens directly at a cheaper price from retailers by selling their Liquidity pool (LP).',
  },
  {
    question: ' How do I buy a token?',
    answer:
      'First, find the LP and token pair you want to exchange with the best Buy-back rate. Next, click the Buy now button, then enter the amount of LP you want to sell and choose the lock time with the rate that suits you. You can use NFTs to increase the Buy-back rate if necessary.',
  },
  {
    question: ' What is Buy-back rate?',
    answer:
      'It is the token exchange rate you get in proportion to the lock time from the retailers.',
  },
  {
    question: ' What is the NFT used for?',
    answer:
      'During the token purchase process, you can enable Boost toggle to use NFTs to increase the Buy-back rate, there are a total of 3 slots with each use will be added a certain rate.',
  },
  {
    question: ' When and where can I redeem my token?',
    answer:
      'In the Redeem tab, you can track your orders. After the lock time click the Redeem button to get your token.',
  },
  {
    question: ' How do I become a retailer?',
    answer:
      'Click on the icon button and enable Retailer mode then you need to create a LP and token pair to start trading.',
  },
]

function Faq() {
  return (
    <Row>
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
            <Panel
              header={
                <Typography.Text>
                  {idx + 1}. {val.question}
                </Typography.Text>
              }
              key={idx}
            >
              <Typography.Text type="secondary">{val.answer}</Typography.Text>
            </Panel>
          ))}
        </Collapse>
      </Col>
    </Row>
  )
}

export default Faq
