import React from "react";
import styles from "../../styles/email-templates/verification-email";
import Image from "next/image";

interface EmailTemplateProps {
  verificationUrl: any;
}

export const VerifyMailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  verificationUrl,
}) => {
  const body = {
    fontFamily: "Inter, Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    margin: 0,
    padding: 0,
  };
  const button = {
    display: "block",
    backgroundColor: "#666",
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 1,
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
  };

  const buttonLink = {
    textDecoration: "none",
    color: "#ffffff",
    fontsize: 16,
  };
  return (
    <html>
      <head>
        <title>Verify Your Email</title>
        <style>
          {`
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap");

          body {
            font-family: "Inter", Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
          }

          .header-image {
            width: 25%;
            height: 250px;
            position: relative;
            padding-top: 1rem;
          }

          /* Content */
          .content {
            max-width: 60%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
            padding: 20px;
            border-radius: 4px;
          }

          .welcome-text {
            font: 400 35px sans-serif;
            color: black;
            text-align: center;
            margin-bottom: 1.2rem;
          }

          .text-1 {
            font: 300 18px sans-serif;
            color: #333;
            text-align: center;
            line-height: 2rem;
          }

          .button {
            display: block;
            background-color: #666;
            padding: 12px 30px;
            margin-top: 1rem;
            border-radius: 4px;
            border: none;
            cursor: pointer;
          }

          .button a {
            text-decoration: none;
            color: white;
            font-size: 16px;
          }

          footer {
            width: 100%;
            margin: 5rem 0 3rem 0;
          }

          .text-3 {
            font: 300 18px sans-serif;
            color: #333;
            text-align: center;
            line-height: 2rem;
          }
        `}
        </style>
      </head>
      <body style={styles.body}>
        <div style={styles.container}>
          <div style={styles.content}>
            <Image
              src="/public/images/verify-email.jpeg"
              alt=""
              width={150}
              height={150}
              style={styles.headerImage}
            />

            <p style={styles.welcomeText}>Please verify your email</p>

            <p style={styles.text1}>
              Keep your account information up to date and receive important
              notifications regarding your job applications, events, and other
              platform activities. You&apos;ll also stay connected to the latest
              updates and opportunities on our platform.
            </p>

            <div style={styles.buttonContainer}>
              <button style={styles.button}>
                <a
                  href={`${verificationUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.buttonLink}
                >
                  Verify
                </a>
              </button>
            </div>
          </div>

          <br />

          <footer>
            <p style={styles.text3}>
              If you are still experiencing issues with verifying your email or
              have any questions, please do not hesitate to contact our support
              team at <a href="mailto:info@eha.ng">info@eha.ng</a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
};
