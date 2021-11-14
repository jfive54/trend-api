import googleTrends from "google-trends-api";

import getTrends from "./trend-service";

describe("TrendService", () => {
  const mockApiData = {
    default: {
      timelineData: [
        {
          time: 112322323,
          formattedTime: "formatedTime1",
          value: [12],
          extraData: "test1",
        },
        {
          time: 112322324,
          formattedTime: "formatedTime2",
          value: [13],
          extraData: "test2",
        },
      ],
    },
  };

  it("should return empty array if no search parameter", async () => {
    const apiCallMock = jest
      .spyOn(googleTrends, "interestOverTime")
      .mockResolvedValue(JSON.stringify(mockApiData));
    const result = await getTrends();
    expect(apiCallMock).not.toHaveBeenCalled();
    expect(result).toEqual({ search: undefined, trends: [] });
  });

  it("should return empty object in case of api call error", async () => {
    const rejectedCallMock = jest
      .spyOn(googleTrends, "interestOverTime")
      .mockRejectedValue("api call error");
    const result = await getTrends("test");
    expect(rejectedCallMock).toHaveBeenCalled();
    expect(result).toEqual({ search: "test", trends: [] });
  });

  it("should call trend api and format data", async () => {
    const apiCallMock = jest
      .spyOn(googleTrends, "interestOverTime")
      .mockResolvedValue(JSON.stringify(mockApiData));
    const result = await getTrends("mySearch");
    expect(apiCallMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      search: "mySearch",
      trends: [
        {
          time: 112322323,
          formattedTime: "formatedTime1",
          value: 12,
        },
        {
          time: 112322324,
          formattedTime: "formatedTime2",
          value: 13,
        },
      ],
    });
  });
});
