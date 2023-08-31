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

export const postContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3,
    },
  },
};

export const postVariants = {
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
    transition: {
      staggerChildren: -0.1,
      delayChildren: 0.1,
    },
  },
};

export const commentVariants = {
  open: { y: 0, opacity: 1 },
  closed: { y: -20, opacity: 0 },
  exit: { y: -20, opacity: 0 },
};

export const commentExit = {
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};
