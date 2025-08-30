const controls = (key: string, coor: { x: number; y: number } | undefined) => {
  if (key === "ArrowUp") {
    if (coor && coor.y > 0) {
      return { ...coor, y: coor.y - 2 };
    }
  } else if (key === "ArrowDown") {
    if (coor && coor.y < 86) {
      return { ...coor, y: coor.y + 2 };
    }
  } else if (key === "ArrowLeft") {
    if (coor && coor.x > 0) {
      return { ...coor, x: coor.x - 1 };
    }
  } else if (key === "ArrowRight") {
    if (coor && coor.x < 93) {
      return { ...coor, x: coor.x + 1 };
    }
  }
};

export default controls;
