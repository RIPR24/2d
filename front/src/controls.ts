const controls = (key: string, coor: { x: number; y: number } | undefined) => {
  if (key === "ArrowUp" || key === "KeyW") {
    if (coor && coor.y > 0) {
      return { ...coor, y: coor.y - 2 };
    }
  } else if (key === "ArrowDown" || key === "KeyS") {
    if (coor && coor.y < 86) {
      return { ...coor, y: coor.y + 2 };
    }
  } else if (key === "ArrowLeft" || key === "KeyA") {
    if (coor && coor.x > 0) {
      return { ...coor, x: coor.x - 1 };
    }
  } else if (key === "ArrowRight" || key === "KeyD") {
    if (coor && coor.x < 93) {
      return { ...coor, x: coor.x + 1 };
    }
  }
};

export default controls;
