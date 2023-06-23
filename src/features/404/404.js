import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./stylee.module.css";

function Cart() {
  return (
    <div className={`${styles.back}`}>
      <main className={`${styles.main}`}>
        <section className={`${styles.home}`}>
          <div className={`${styles.home__container} ${styles.containerr}`}>
            <div className={`${styles.home__data}`}>
              <span className={`${styles.home__subtitle}`}>Error 404</span>
              <h1 className={`${styles.home__title}`}>Hey Buddy</h1>
              <p className={`${styles.home__description}`}>
                We can't seem to find the page <br />
                you are looking for.
              </p>
              <Link to="/home" className={`${styles.home__button}`}>
                {" "}
                Go Home{" "}
              </Link>
            </div>

            <div className={`${styles.home__img}`}>
              <img
                src={process.env.PUBLIC_URL + "assets/ghost-img.png"}
                alt=""
              />
              <div className={`${styles.home__shadow}`}></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Cart;
