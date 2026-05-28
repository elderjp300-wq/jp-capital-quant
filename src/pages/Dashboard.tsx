import { YieldCurveCard } from "@/components/cards/YieldCurveCard";
import { FedExpectationsCard } from "@/components/cards/FedExpectationsCard";
import { DXYCard } from "@/components/cards/DXYCard";
import { CorrelationMatrix } from "@/components/cards/CorrelationMatrix";
import { LiquidityCard } from "@/components/cards/LiquidityCard";
import { RiskGauge } from "@/components/cards/RiskGauge";
import { AINarrativeCard } from "@/components/cards/AINarrativeCard";
import { motion } from "framer-motion";

export default function Dashboard() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="p-3 space-y-3 pb-20"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}><AINarrativeCard /></motion.div>
      <motion.div variants={item}><RiskGauge /></motion.div>
      <motion.div variants={item}><FedExpectationsCard /></motion.div>
      <motion.div variants={item}><YieldCurveCard /></motion.div>
      <motion.div variants={item}><DXYCard /></motion.div>
      <motion.div variants={item}><LiquidityCard /></motion.div>
      <motion.div variants={item}><CorrelationMatrix /></motion.div>
    </motion.div>
  );
}
