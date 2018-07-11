import React from "react";
import { PostsContainer, postsContainer } from "../../containers";
import { redditHelper } from "../../helpers";
import { TouchableOpacity, ListView } from "@shoutem/ui";
import { Subscribe } from "unstated";
import { Dimensions, Image } from "react-native";

const window = Dimensions.get("window");

class Posts extends React.Component {
  async componentWillMount() {
    try {
      const posts = await redditHelper.getPosts({
        subreddits: ["programmerHumor"]
      });
      postsContainer.updatePosts({ posts });
    } catch (error) {}
  }
  renderRow(post) {
    console.log("post: ", post);
    post.preview.images[0].resolutions.forEach(resolution1 => {
      if (resolution1.width < window.width) {
        resolution = resolution1;
      }
    });
    console.log("resolution: ", resolution);
    return (
      <TouchableOpacity key={post.id}>
        <Image
          style={{ flex: 1, width: window.width }}
          // styleName="large-portrait"
          source={{ uri: resolution && resolution.url }}
        />
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <Subscribe to={[PostsContainer]}>
        {posts => {
          return (
            <ListView data={posts.state.posts} renderRow={this.renderRow} />
          );
        }}
      </Subscribe>
    );
  }
}

export default Posts;
