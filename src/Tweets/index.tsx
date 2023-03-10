import React from "react";
import { Tweet } from "../App/types";
import { hashTagRegex } from "../utils/regexes";
import "./style.scss";

export default function Tweets({ tweets }: { tweets?: Tweet[] }) {
  const [hashTag, setHashTag] = React.useState("N/A");

  const [mostTweets, setMostTweets] = React.useState(0);

  const [longestTweet, setLongetTweet] = React.useState("N/A");

  const [mostDays, setMostDays] = React.useState(0);

  /**
   * Retrieves the most popular hash tag tweeted by the given user.
   * Note that the string returned by this method should not include the hashtag itself.
   * For example, if the most popular hash tag is "#React", this method should return "React".
   * If there are no tweets for the given user, this method should return "N/A".
   */
  const getMostPopularHashTag = React.useCallback((tweets: Tweet[]) => {
    const hashTagsMap = new Map();

    tweets.forEach((item) => {
      const matches = item.text.match(hashTagRegex);
      if (!matches) return;

      matches
        .map((match) => match.replace("#", "").trim())
        .forEach((match) => {
          if (hashTagsMap.has(match)) {
            const value = hashTagsMap.get(match);
            hashTagsMap.set(match, value + 1);
          } else {
            hashTagsMap.set(match, 1);
          }
        });
    });

    const [firstHashTag, fistHashTagNum] = hashTagsMap.entries().next().value;

    if (!firstHashTag) return "N/A";

    let mostPopularHastTag = firstHashTag;
    let maxNumOfOccurrences = fistHashTagNum;

    const mapIterator = hashTagsMap[Symbol.iterator]();

    for (const [hashName, hashNum] of mapIterator) {
      if (hashNum > maxNumOfOccurrences) {
        mostPopularHastTag = hashName;
        maxNumOfOccurrences = hashNum;
      }
    }

    console.log(hashTagsMap);

    return mostPopularHastTag;
  }, []);

  /**
   * Retrieves the highest number of tweets that were created on any given day by the given user.
   * A day's time period here is defined from 00:00:00 to 23:59:59
   * If there are no tweets for the given user, this method should return 0.
   */
  const getMostTweetsInOneDay = React.useCallback((tweets: Tweet[]) => {
    if (!tweets.length) return 0;

    const sameDay = (d1: Date, d2: Date) => {
      return d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    };

    let maxTweetsPerDay = 0;

    for (let i = 0; i < tweets.length; i++) {
      const createAtIso1 = tweets[i].createdAt;
      const dateOne = new Date(createAtIso1);

      let numberOfTweetsForDay = 0;
      let firstTime = true;

      for (let j = i + 1; j < tweets.length; j++) {
        const createdAtIso2 = tweets[j].createdAt;
        const dateTwo = new Date(createdAtIso2);

        if (sameDay(dateOne, dateTwo)) {
          if (firstTime) {
            numberOfTweetsForDay = 2;
            firstTime = false;
          }
          numberOfTweetsForDay += 1;
        }
      }

      if (numberOfTweetsForDay > maxTweetsPerDay) {
        maxTweetsPerDay = numberOfTweetsForDay;
      }

      numberOfTweetsForDay = 0;
      firstTime = true;
    }

    return maxTweetsPerDay;
  }, []);

  /**
   * Finds the first 6 characters of the ID of the longest tweet for the given user.
   * For example, if the ID of the longest tweet is "0b88c8e3-5ade-48a3-a5a0-8ce356c02d2a",
   * then this function should return "0b88c8".
   * You can assume there will only be one tweet that is the longest.
   * If there are no tweets for the given user, this method should return "N/A".
   */
  const getLongestTweetIdPrefix = React.useCallback((tweets: Tweet[]) => {
    //TODO Implement
  }, []);

  /**
   * Retrieves the most number of days between tweets by the given user.
   * This should always be rounded down to the complete number of days, i.e. if the time is 12 days & 3 hours, this
   * method should return 12.
   * If there are no tweets for the given user, this method should return 0.
   */
  const getMostDaysBetweenTweets = React.useCallback((tweets: Tweet[]) => {
    //TODO Implement
  }, []);

  React.useEffect(() => {
    if (tweets?.length) {
      const mostPopular = getMostPopularHashTag(tweets);
      setHashTag(() => mostPopular);

      const maxTweets = getMostTweetsInOneDay(tweets);
      setMostTweets(() => maxTweets);

      getLongestTweetIdPrefix(tweets);

      getMostDaysBetweenTweets(tweets);
    }

    return () => {
      setHashTag(() => "N/A");
      setMostTweets(() => 0);
      setLongetTweet(() => "N/A");
      setMostDays(() => 0);
    };
  }, [
    tweets,
    getMostPopularHashTag,
    getMostTweetsInOneDay,
    getLongestTweetIdPrefix,
    getMostDaysBetweenTweets,
  ]);

  const statNames = React.useMemo(() => {
    return [
      { title: "Most popular hashtag", data: hashTag },
      { title: "Most Tweets in one day", data: mostTweets },
      { title: "Longest Tweet ID", data: longestTweet },
      { title: "Most days between Tweets", data: mostDays },
    ];
  }, [hashTag, mostTweets, longestTweet, mostDays]);

  const renderedTweetStats = statNames.map((item, index) => {
    return (
      <div className="stats-box" key={index}>
        <p className="stats-box-heading">{item.title}</p>
        <p className="stats-box-info">{item.data}</p>
      </div>
    );
  });

  return <div className="tweet-stats-container">{renderedTweetStats}</div>;
}
