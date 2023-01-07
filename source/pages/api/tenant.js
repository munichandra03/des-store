export default function handler(req, res) {
  const instanceMap = [
    { collection: "NewCommerceSolr", tenant: "ncs" },
    { collection: "KamanSolr", tenant: "kcs" },
    { collection: "BBBCommerceSolr", tenant: "bbb" },
    { collection: "PrideCommerceSolr", tenant: "pcs" },
    { collection: "WineCommerceSolr", tenant: "wcs" },
    { collection: "KDGCommerceSolr", tenant: "kdg" },
    { collection: "KFPCommerceSolr", tenant: "kfp" },
    { collection: "KamanCommerceSolr", tenant: "kdg" },
    { collection: "DPFCommerceSolr", tenant: "dpf" },
    { collection: "AutoCommerceSolr", tenant: "acs" },
  ];
  if (!instanceMap[req.query.tenant]) {
    res.status(404).send("No Tenant Found!!");
  }
  res.json({ tenant: instanceMap[req.query.tenant] });
}
