import Accordion from "../components/Accordion-component";
import ImageSlider from "../components/image-slider-component";
import ColorGenerator from "../components/random-color-generator";
import Tabs from "./tabs";

export default function TabContent() {
  const tabs = [
    {
      label: "Color Generator",
      content: <ColorGenerator />,
    },
    {
      label: "Image Slider",
      content: (
        <ImageSlider
          url={"https://picsum.photos/v2/list"}
          limit={10}
          page={1}
        />
      ),
    },
    {
      label: "Accordion",
      content: <Accordion />,
    },
  ];

  return <Tabs tabsContent={tabs} />;
}
