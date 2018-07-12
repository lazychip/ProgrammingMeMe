import React from "react";
import { PostsContainer, postsContainer } from "../../containers";
import { redditHelper } from "../../helpers";
import { TouchableOpacity, ListView } from "@shoutem/ui";
import { Subscribe } from "unstated";
import { Dimensions, Image, RefreshControl } from "react-native";

const window = Dimensions.get("window");

class Posts extends React.Component {
  componentWillMount() {
    this.setState({refreshing: true})
    this.fetchPosts()
  }
  constructor (props, context) {
    super(props, context)
    this.state = {
      refreshing: false
    }
    this.onRefresh = this.onRefresh.bind(this)
    this.fetchPosts = this.fetchPosts.bind(this)
  }
  async onRefresh () {
    console.log("refresh")
    this.setState({refreshing: true})
    await this.fetchPosts()
  }

  async fetchPosts () {
    try {
      const posts = await redditHelper.getPosts({
        subreddits: ["random", "MrRobot", "comics", "programmerHumor"]
      });
      postsContainer.updatePosts({ posts })
      this.setState({refreshing: false})
    } catch (error) {
    }
  }

  renderRow(post) {
    let resolution
    post.preview.images[0].resolutions.forEach(resolution1 => {
      if (resolution) {
        return
      }
      if (resolution1.width > window.width) {
        resolution = resolution1;
      }
    });
    if (!resolution) {
      resolution = post.preview.images[0].source
    }
    if (!resolution) {
      console.error("No image found", post)
      return null
    }

    return (
      <TouchableOpacity key={post.id} style={{ backgroundColor: "#fff" }}>
        <Image
          style={{ flex: 1, width: window.width, height: window.width * resolution.height / resolution.width, marginBottom: 20 }}
          // styleName="large-portrait"
          source={{ uri: resolution && resolution.url && resolution.url.replace(/&amp;/g, '&') }}
        />
      </TouchableOpacity>
    );
  }
  render() {
    const {refreshing} = this.state
    return (
      <Subscribe to={[PostsContainer]}>
        {posts => {
          return (
            <ListView
              loading={refreshing}
              onRefresh={this.onRefresh}
              style={{ backgroundColor: "#f0f0f0" }}
              data={posts.state.posts}
              renderRow={this.renderRow} />
          );
        }}
      </Subscribe>
    );
  }
}

export default Posts;
