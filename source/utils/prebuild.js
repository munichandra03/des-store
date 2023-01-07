const axios = require("axios");
const fs = require("fs");
const path = require("path");

const getAllProducts = async (collectionId) => {
  try {
    const SOLRPROTOCOL = "http://";
    const SOLRHOST = "192.168.15.91:";
    const SOLRPORT = "8983";
    const SOLRCOUNT = 1300;
    const url = `${
      SOLRPROTOCOL + SOLRHOST + SOLRPORT
    }/solr/${collectionId}/select?indent=true&q.op=OR&q=*%3A*&rows=${SOLRCOUNT}&start=0`;
    const solrResponse = await axios.get(url);
    await fs.promises.writeFile(
      path.join(__dirname, "solrResponse.json"),
      JSON.stringify(solrResponse.data.response.docs)
    );
    return solrResponse;
  } catch (err) {
    console.log("err", err);
  }
};
getAllProducts("WineCommerceSolr");
