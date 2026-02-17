import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full flex justify-center px-4 pt-24 pb-16">
      <div className="max-w-6xl text-center">

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Connect. Collaborate.{" "}
          <span className="bg-gradient-to-r from-sky-400 to-violet-500 bg-clip-text text-transparent">
            Code Together.
          </span>
        </h1>

        <p className="mt-5 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300">
          DevTinder helps developers find collaborators, co-founders, and project partners 
          based on skills and interests.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            to="/login"
            className="px-6 py-3 rounded-xl font-semibold text-white 
                       bg-gradient-to-r from-sky-400 to-violet-500
                       hover:from-sky-500 hover:to-violet-600 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 rounded-xl font-semibold
                       border border-slate-300 dark:border-slate-700
                       text-slate-900 dark:text-slate-50
                       hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Explore Developers
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Hero;