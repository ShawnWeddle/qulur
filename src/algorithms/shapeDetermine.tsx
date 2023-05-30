import type { shapeList } from "~/data/data";
type Shapetype = (typeof shapeList)[number];
import {
  ImHeart,
  ImDiamonds,
  ImSmile2,
  ImSad2,
  ImKey,
  ImLock,
  ImHome3,
  ImEarth,
} from "react-icons/im";

export function shapeDetermine(shape: Shapetype) {
  switch (shape) {
    case "diamond":
      return <ImDiamonds />;
    case "earth":
      return <ImEarth />;
    case "happy face":
      return <ImSmile2 />;
    case "heart":
      return <ImHeart />;
    case "home":
      return <ImHome3 />;
    case "key":
      return <ImKey />;
    case "lock":
      return <ImLock />;
    case "sad face":
      return <ImSad2 />;
  }
}
