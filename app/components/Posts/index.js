import React from "react";
import { PostsContainer, postsContainer } from "../../containers";
import { redditHelper } from "../../helpers";
import {
  GridRow,
  TouchableOpacity,
  Card,
  Image,
  View,
  Subtitle,
  ImageBackground,
  ListView,
  Tile,
  Divider
} from "@shoutem/ui";
import { Subscribe } from "unstated";

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
    return (
      <TouchableOpacity key={post.id}>
        <ImageBackground
          styleName="large"
          source={{ uri: post.preview.images[0].source.url }}
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
