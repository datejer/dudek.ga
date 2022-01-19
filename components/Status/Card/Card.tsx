import { forwardRef, useEffect, useState } from "react";
import Image from "next/image";
import { LanyardData } from "react-use-lanyard/dist";
import { getActivityName, getElapsedTime } from "../../../lib/status";

import styles from "./Card.module.scss";

import Spotify from "../../../assets/icons/spotify.svg";

type CardProps = {
  data: LanyardData;
};

// TODO: Make Tippy work on the Image components (for now using title)

const Card = forwardRef<HTMLDivElement, CardProps>(({ data }, ref) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card} ref={ref}>
        {!data.activities.length ? "No activities" : null}
        {data.activities
          .filter((activity) => activity.id !== "spotify:1")
          .reverse()
          .map((activity, index) => (
            <div key={index} className={styles.activity}>
              <h3 className={styles.type}>{getActivityName(activity.type)}</h3>
              <div className={styles.content}>
                <div className={styles.assets}>
                  {activity.assets?.large_image && (
                    <Image
                      src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.large_image}.png`}
                      alt={activity.assets?.large_text}
                      width={60}
                      height={60}
                      className={styles.largeImage}
                      title={activity.assets?.large_text}
                    />
                  )}
                  <div className={styles.smallImageWrapper}>
                    {activity.assets?.small_image && (
                      <Image
                        src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.small_image}.png`}
                        alt={activity.assets?.small_text}
                        width={20}
                        height={20}
                        className={styles.smallImage}
                        title={activity.assets?.small_text}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.info}>
                  <h4 className={styles.name} title={activity.name}>
                    {activity.name}
                  </h4>
                  <div className={styles.details} title={activity.details}>
                    {activity.details}
                  </div>
                  <div className={styles.state} title={activity.state}>
                    {activity.state}
                  </div>
                  {activity.timestamps?.start && (
                    <div
                      className={styles.elapsed}
                      title={`Since ${new Date(activity.timestamps.start)}`}
                    >
                      {getElapsedTime(activity.timestamps.start, time)} elapsed
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        {data.spotify && (
          <div className={styles.activity}>
            <h3 className={styles.type}>
              Listening to Spotify <Spotify className={styles.spotify} />
            </h3>
            <div className={styles.content}>
              <div className={styles.assets}>
                <Image
                  src={data.spotify.album_art_url}
                  alt={data.spotify.album}
                  width={60}
                  height={60}
                  className={styles.largeImage}
                  title={data.spotify.album}
                />
              </div>
              <div className={styles.info}>
                <h4 className={styles.name} title={data.spotify.song}>
                  <a
                    className={styles.link}
                    href={"https://open.spotify.com/track/" + data.spotify.track_id}
                  >
                    {data.spotify.song}
                  </a>
                </h4>
                <div className={styles.details} title={data.spotify.artist}>
                  by {data.spotify.artist}
                </div>
                <div className={styles.state} title={data.spotify.album}>
                  on {data.spotify.album}
                </div>
                <div
                  className={styles.elapsed}
                  title={`Since ${new Date(data.spotify.timestamps.start)}`}
                >
                  {getElapsedTime(data.spotify.timestamps.start, time)} elapsed
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

Card.displayName = "Card";

export { Card };
