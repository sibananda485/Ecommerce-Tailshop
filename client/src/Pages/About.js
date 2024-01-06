import React from "react";
import Profile from '../assets/profile.png'
export default function About() {
  return (
    <>
      <div className="max-w-2xl px-4 sm:px-0 my-5 mx-auto">



      <h1 className="text-4xl mb-4">Contact Us</h1>
        <p className="mb-6">
          Have questions or feedback? We'd love to hear from you. Contact our Developer <a className="text-green-500" href="https://wa.me/+918433980976?text=Hii%20Shiva!,%20i%27m%20interested%20for%20a%20new%20project.">sahusiba485@gmail.com</a>
        </p>

        <h1 className="text-2xl font-">Designed and Developed by</h1>

        <div className="my-5 "> <img src={Profile} className="w-20 rounded-md ml-5" alt="" /> <h2 className="text-2xl my-2 " >Sibananda sahu</h2></div>
        <h3>Fullstack MERN Developer</h3>

        <p className="my-6">
        A passionate MERN stack developer with a deep appreciation for building robust and scalable web applications. With a foundation in MongoDB, Express.js, React, and Node.js
        </p>

        <p className="mb-6">Connect with sibananda: <a target="_blank" className="underline text-blue-600" href="https://www.linkedin.com/in/sibananda485/">LinkedIn</a> | <a target="_blank" className="underline text-red-600" href="https://github.com/sibananda485"> GitHub</a> | <a className="text-cyan-700 underline" href="https://wa.me/+918433980976?text=Hii%20Shiva!,%20i%27m%20interested%20for%20a%20new%20project.">whatsapp</a> </p>

        {/* <h1 className="text-4xl mb-4">About CloudEntry</h1>
        <p className="mb-6">
          Welcome to CloudEntry, a product of passion and innovation, designed
          to securely store your notes in the cloud. Our team of dedicated
          developers is committed to providing you with a seamless and reliable
          platform that prioritizes simplicity, security, and accessibility.
        </p>

        

        <h1 className="text-4xl mb-4">Key Features</h1>
        <h2 className="text-2xl mb-2" >Secure Cloud Storage</h2>
        <p className="mb-6">
          Your data's security is our top priority. CloudEntry employs
          state-of-the-art encryption protocols to safeguard your notes, thanks
          to the expertise of our security team led by John Doe.
        </p>

        <h2 className="text-2xl mb-2" >Anytime, Anywhere Access</h2>
        <p className="mb-6">
          Our development team, led by John, has implemented a cloud
          infrastructure that ensures your notes are accessible from any device
          with an internet connection.
        </p>

        <h2 className="text-2xl mb-2" >Collaborate with Confidence</h2>
        <p className="mb-6">
          Jane's design philosophy extends to collaborative features, making it
          easy for users to work together in real-time. Our development team
          ensures a smooth collaborative experience.
        </p>

        <h2 className="text-2xl mb-2" >Intuitive User Interface</h2>
        <p className="mb-6">
          Jane's design expertise is evident in the user-friendly interface,
          making note-taking and organization a breeze.
        </p>
        <h2 className="text-2xl mb-2" >Privacy and Security</h2>
        <p className="mb-6">
          We understand the importance of privacy in the digital age. Our
          developers, led by John, adhere to the highest standards of data
          protection, implementing end-to-end encryption, secure authentication,
          and regularly conducting security audits.
        </p>

        <h2 className="text-2xl mb-2" >Get Started Today</h2>
        <p className="mb-6">
          Join thousands of users who have chosen CloudEntry for their
          note-taking needs. Sign up for free today and experience the passion
          and expertise behind our cloud-based note storage.
        </p> */}

        
      </div>
    </>
  );
}
