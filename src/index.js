import getTrends from "./trend/index.js";

/**
 * Get trends timeline 
 * Using first req param as search param
 * @param {object} req https://expressjs.com/en/api.html#req
 * @param {object} res https://expressjs.com/en/api.html#res
 */
export async function trendTimeline(req, res) {
  const trends = await getTrends(req.params[0]);
  res.send(trends);
}
