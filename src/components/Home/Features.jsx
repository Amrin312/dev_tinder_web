import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  ShieldCheck,
  Brain,
  Star
} from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Swipe to Connect",
    desc: "Discover developers quickly with intuitive swipe interactions."
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    desc: "Instant messaging powered by Socket.io for seamless collaboration."
  },
  {
    icon: Brain,
    title: "Skill-based Matching",
    desc: "Smart matching based on tech stack, interests, and experience."
  }
];

const Features = () => {
  return (
    <section className="py-20 px-4 flex justify-center">
      <div className="max-w-6xl w-full">

        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-slate-50">
          Built for Developers
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                <Icon
                  className="w-8 h-8 text-blue-600 dark:text-sky-400"
                  strokeWidth={1.5}
                />
                <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Features;