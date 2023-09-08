export const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const heroItemVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const commentsContainerVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  closed: {
    opacity: 0,
    height: 0,
  },
};

export const cardVariants = {
  initial: {
    y: -10,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -10,
    opacity: 0,
  },
};
