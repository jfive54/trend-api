import getTrends from "./trend/index.js";

/**
 * Get trends timeline 
 * Using first req param as search param
 * @param {object} req https://expressjs.com/en/api.html#req
 * @param {object} res https://expressjs.com/en/api.html#res
 */
export async function trendTimeline(req, res) {
  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'GET');
  const trends = await getTrends(req.params[0]);
  res.send(trends);
}
