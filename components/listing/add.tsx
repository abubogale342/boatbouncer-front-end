import { motion, AnimatePresence } from "framer-motion";
import BoatForm from "./forms";

const AddListing = ({ cancelHn }: { cancelHn: (status: any) => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <BoatForm cancelHn={cancelHn} />

        <div className="mt-10 px-4">
          <p className="text-xl font-semibold text-gray-900">
            Cancelation Policy
          </p>
          <hr className="mt-3 h-px border-0 bg-gray-200" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddListing;
