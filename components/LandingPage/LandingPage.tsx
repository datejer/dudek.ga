import Image from "next/image";
import clsx from "clsx";
import { SEO } from "../SEO";

import styles from "./LandingPage.module.scss";

import me from "../../public/me.jpg";
import GitHub from "../../assets/icons/github.svg";
import Twitter from "../../assets/icons/twitter.svg";
import LinkedIn from "../../assets/icons/linkedin.svg";
import At from "../../assets/icons/at.svg";

export function LandingPage() {
  return (
    <div>
      <SEO />
      <div className={styles.hero}>
        <div>
          <h1 className={styles.name}>artur dudek</h1>
          <p className={styles.position}>full stack dev</p>
          <p>
            Hello 👋! <br />
            I'm a 16 year old web developer from Poland 🇵🇱. I'm currently studying at a High School,
            and enjoy making websites in React! I'm also the Host of{" "}
            <a href="https://require.podcast.gq/" data-textlink="true">
              Require Podcast
            </a>
            .
          </p>
          <a href="https://github.com/datejer" className={clsx(styles.link, styles.gh)}>
            <span data-visually-hidden>My GitHub Profile</span>
            <span aria-hidden="true">
              <GitHub />
            </span>
          </a>
          <a href="https://twitter.com/arturdudek_" className={clsx(styles.link, styles.tw)}>
            <span data-visually-hidden>My Twitter Profile</span>
            <span aria-hidden="true">
              <Twitter />
            </span>
          </a>
          <a href="/linkedin" className={clsx(styles.link, styles.li)}>
            <span data-visually-hidden>My LinkedIn Profile</span>
            <span aria-hidden="true">
              <LinkedIn />
            </span>
          </a>
          <a href="mailto:artur@dudek.ga" className={clsx(styles.link, styles.gh)}>
            <span data-visually-hidden>Send me an email!</span>
            <span aria-hidden="true">
              <At />
            </span>
          </a>
        </div>
        <div className={styles.picture}>
          <Image
            src={me}
            alt="Blurry face of Artur Dudek"
            width={128}
            height={128}
            priority
            placeholder="blur"
            layout="fixed"
            className={styles.img}
          />
        </div>
      </div>
    </div>
  );
}
