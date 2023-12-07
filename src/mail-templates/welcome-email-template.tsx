import React from "react";
import styles from "../../styles/email-templates/welcome-email";
import Image from "next/image";

interface WelcomeEmailTemplateProps {
  name: string;
  verificationUrl: any;
}

export const WelcomeEmailTemplate: React.FC<WelcomeEmailTemplateProps> = ({
  name,
  verificationUrl,
}) => (
  <html>
    <head>
      <title>Welcome To EHA Recruitment</title>
    </head>
    <body>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap");

          body {
            font-family: "Inter", Arial, sans-serif;
            background-color: #f3f3f3;
            margin: 0;
            padding: 0;
          }

          .header-image {
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

          .info-container {
            width: 80%;
            background-color: white;
            padding: 2rem 4rem;
            margin-top: 2rem;
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
            line-height: 1.7rem;
          }

          .second-section {
            margin-top: 1.5rem;
          }

          .text-2 {
            font: 300 18px sans-serif;
            color: #333;
            line-height: 1.7rem;
            margin-bottom: 1.2rem;
          }

          .span-2 {
            font: 300 18px sans-serif;
            color: #333;
            line-height: 0.5rem;
            margin-left: 0.5rem;
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

      <div style={styles.content}>
        <img
          src="data:ehr/png;base64,base64-encoded-image-data"
          alt=""
          style={styles.headerImage}
        />

        <div style={styles.infoContainer}>
          <p>Hello, {name}!</p>

          <h4>Welcome to EHA Recruitment!</h4>

          <p style={styles.text1}>
            Thank you for signing up for EHA Recruitment. We are excited to have
            you join our community of learners and job seekers. Here, you will
            find a wide range of online courses to enhance your skills and
            advance your career, as well as opportunities for recruitment and
            employment.
          </p>

          <br />

          <div className="fourth-section">
            <h4>Next Steps</h4>
            <p style={styles.text2}>
              1.
              <span style={styles.span2}>
                Enhance Your Profile: Complete your profile to provide more
                information about yourself, your skills, and your professional
                experience. A comprehensive profile will help employers find you
                easily and increase your chances of landing your dream job.
              </span>
            </p>
            <p style={styles.text2}>
              2.
              <span style={styles.span2}>
                Explore Our Courses: Browse our extensive collection of courses
                covering various subjects and disciplines. Whether you are
                interested in medicine, nursing, pharmacy or any medical related
                field, we have something for everyone.
              </span>
            </p>
            <p className="text-2">
              3.
              <span style={styles.span2}>
                Engage with the Community: Participate in our forums,
                discussions, and networking events. Connect with like-minded
                individuals, seek advice from industry experts, and share your
                knowledge and experiences with others.
              </span>
            </p>
          </div>

          <br />

          <p style={styles.text1}>
            If you have any questions, feel free to{" "}
            <a href={`mailto:info@eha.ng`}>email our customer success team</a>.
            We are lightning quick at replying.
          </p>

          <p style={styles.text1}>
            Click on the link here and login to get started{" "}
            <a href={`${verificationUrl}/login`}>{verificationUrl}.</a>
          </p>
        </div>
      </div>
    </body>
  </html>
);
