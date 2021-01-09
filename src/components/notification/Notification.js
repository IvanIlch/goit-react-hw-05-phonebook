import React from "react";

import styles from "./Notification.module.css";

const Notification = () => (
  <div className={styles.container}>
    <p className={styles.text}>Це ім'я вже є у списку контактів!</p>
  </div>
);

export default Notification;
