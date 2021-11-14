import googleTrends from "google-trends-api";

/**
 * Format trends timeline items
 * @param {object} default using array timelineData 
 * @returns {array} formatted timeline items
 */
const formatTrends = ({ timelineData }) =>
  timelineData.map(({ time, formattedTime, value }) => ({
    time,
    formattedTime,
    value: value[0],
  }));

 /**
  * Get timeline trends from search param
  * @param {string} search param
  * @returns {object} trends formatted timeline
  */ 
export default async function getTrends(search) {
  let trends = [];
  if (!search) return { search, trends };
  try {
    trends = await googleTrends.interestOverTime({
      keyword: search,
    });
    trends = formatTrends(JSON.parse(trends)?.default);
  } catch {
    (err) => {
      console.error("trends retrieve error", err);
    };
  }
  return { search, trends };
}
