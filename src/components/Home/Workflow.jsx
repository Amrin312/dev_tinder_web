import { motion } from "framer-motion";
import { User, Search, HeartHandshake, MessageCircle } from "lucide-react";

const steps = [
  { icon: User, title: "Create Profile", desc: "Add skills, stack, and goals" },
  { icon: Search, title: "Discover Developers", desc: "Browse matches instantly" },
  { icon: HeartHandshake, title: "Match & Connect", desc: "Swipe and connect fast" },
  { icon: MessageCircle, title: "Collaborate", desc: "Chat in real-time & build" }
];

const Workflow = () => {
  return (
    <section className="py-24 px-4 flex justify-center">
      <div className="max-w-6xl w-full">

        <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-slate-50">
          How DevTinder Works
        </h2>

        <div className="mt-16 grid md:grid-cols-4 gap-8">

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-md text-center"
              >
                <Icon className="w-10 h-10 mx-auto text-blue-600 dark:text-sky-400" />
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Workflow;