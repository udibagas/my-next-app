'use client'

import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Halaman about" />
        <meta name="keywords" content="next, react, typescript" />
      </Head>

      <div className="text-center p-8">
        <h1 className="text-3xl">About</h1>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, tempora illum, enim aut vero ducimus quia sapiente ullam nulla exercitationem nihil, quaerat maiores saepe hic! Sequi consectetur nihil dicta unde?
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, tempora illum, enim aut vero ducimus quia sapiente ullam nulla exercitationem nihil, quaerat maiores saepe hic! Sequi consectetur nihil dicta unde?
        </p>

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, tempora illum, enim aut vero ducimus quia sapiente ullam nulla exercitationem nihil, quaerat maiores saepe hic! Sequi consectetur nihil dicta unde?
        </p>
      </div>
    </>

  );
}