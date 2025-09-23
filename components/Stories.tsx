import { styles } from "@/styles/feed.styles";
import { ScrollView } from "react-native";
import Story from "./Story";
import { STORIES } from "@/constants/mock-data";

const Stories = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={styles.storiesContainer}
    >
      {STORIES.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </ScrollView>
  );
};

export default Stories;
