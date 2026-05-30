/* eslint-disable no-unused-vars */
import React from "react";
import "./styles.css";
import Button from "../../common/Button";
import iphone from "../../../assets/iphone.png";
import gradient from "../../../assets/gradient.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const features = [
  {
    icon: "📊",
    title: "Real-Time Charts",
    desc: "Track live price movements with interactive charts. View price, market cap, and volume over 1, 7, 30, or 90 days.",
  },
  {
    icon: "🔔",
    title: "Watchlist Tracking",
    desc: "Save your favourite coins and monitor them in one place. Add or remove coins instantly with one click.",
  },
  {
    icon: "⚖️",
    title: "Compare Coins",
    desc: "Compare two cryptocurrencies side by side with dual-axis charts to make smarter investment decisions.",
  },
  {
    icon: "📱",
    title: "Mobile Friendly",
    desc: "Fully responsive design that works seamlessly on any device — desktop, tablet, or mobile.",
  },
];

function MainComponent() {
  const navigate = useNavigate();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "CryptoTracker",
        text: "Track crypto in real time!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard! 🎉", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <>
     
      <div className="flex-info">
        <div className="left-component">
          <motion.h1
            className="track-crypto-heading"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Track Crypto
          </motion.h1>
          <motion.h1
            className="real-time-heading"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Real Time.
          </motion.h1>
          <motion.p
            className="info-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Track crypto through a public api in real time. Visit the dashboard
            to do so!
          </motion.p>
          <motion.div
            className="btn-flex"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <Button text={"Dashboard"} click={() => navigate("/dashboard")} />
            <Button text={"Share"} outlined={true} click={handleShare} />
          </motion.div>
        </div>

        <div className="phone-container">
          <motion.img
            src={iphone}
            alt="Phone"
            className="iphone"
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{
              type: "smooth",
              repeatType: "mirror",
              duration: 2,
              repeat: Infinity,
            }}
          />
          <img src={gradient} alt="gradient" className="gradient" />
        </div>
      </div>

    
      <div className="features-section">
        <motion.h2
          className="features-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        viewport={{ once: false, margin: "-100px" }}
        >
          Everything you need to Track Crypto
        </motion.h2>

        <div className="features-grid">
          {features.map((feature, i) => (
            <motion.div
              className="feature-card"
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MainComponent;