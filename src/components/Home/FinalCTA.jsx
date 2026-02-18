import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="relative py-28 px-4 flex justify-center overflow-hidden">

      {/* Glow background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute w-[600px] h-[600px] bg-gradient-to-r 
                   from-sky-400/30 to-violet-500/30 
                   blur-3xl rounded-full -z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-4xl text-center"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50">
          Find your next build partner today.
        </h2>

        <p className="mt-5 text-lg text-slate-600 dark:text-slate-300">
          Join thousands of developers collaborating, learning, and shipping real projects together.
        </p>

        <Link
          to="/login"
          className="inline-flex items-center gap-3 mt-10 px-8 py-4 rounded-2xl 
                     font-semibold text-white text-lg
                     bg-gradient-to-r from-sky-400 to-violet-500
                     hover:from-sky-500 hover:to-violet-600
                     transition"
        >
          <Rocket className="w-5 h-5" strokeWidth={1.5} />
          Start Matching
        </Link>
      </motion.div>
    </section>
  );
};

export default FinalCTA;