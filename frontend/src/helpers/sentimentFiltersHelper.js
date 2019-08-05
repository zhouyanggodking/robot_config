const positiveFilters = ['评级上调/推荐', '业绩利好', '经营利好', '公司治理利好', '市场利好', '其他正面'];
const negativeFilters = ['债务危机', '评级下调', '偷税漏税', '失联/列入黑名单',
  '其他信用问题', '资产负债率过高', '异常的审计报告', '更换会计师事务所',
  '业绩预警', '其他财务问题', '资产转让重组失败', '法律诉讼', '环保', '资产查封冻结',
  '资金链风险', '经营预警', '生产问题', '公司治理预警', '项目预警', '担保预警', '产品预警', '监管措施',
  '调查处罚', '暂停上市交易', '证券价格异常波动', '股份解禁或减持', '股权质押', '股权冻结拍卖', '其他市场预警',
  '自然灾害', '其它负面'];

const getSentiment = filter => {
  if (positiveFilters.includes(filter)) {
    return 'positive';
  } 
  if (negativeFilters.includes(filter)) {
    return 'negative';
  }
  return 'neutral';
};

export default {
  positiveFilters,
  negativeFilters,
  getSentiment
};
