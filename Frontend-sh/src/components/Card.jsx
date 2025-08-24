import { motion } from "framer-motion";

const Card = ({ title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-8 shadow-bitly hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
    >
      <div className="mb-4">
        <div className="w-12 h-12 bg-bitly-lightBlue/10 rounded-lg flex items-center justify-center mb-4">
          <div className="w-6 h-6 bg-bitly-lightBlue rounded"></div>
        </div>
      </div>
      <h3 className="text-gray-900 text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
};

export default Card;