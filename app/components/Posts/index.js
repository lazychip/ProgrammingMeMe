import React from "react";
import { PostsContainer, postsContainer } from "../../containers";
import { redditHelper } from "../../helpers";
import { TouchableOpacity, ListView, Button, View } from "@shoutem/ui";
import { Subscribe } from "unstated";
import { Dimensions, Image, RefreshControl, Text } from "react-native";

const window = Dimensions.get("window");

class Posts extends React.Component {
  componentWillMount() {
    this.onRefresh()
  }
  constructor (props, context) {
    super(props, context)
    this.state = {
      refreshing: false
    }
  }
  onRefresh = () => {
    let cursors = {}
    Object.keys(this.props.cursors).map(c => {
      if (this.props.cursors[c] !== false) {
        cursors[c] = undefined
      }
    })
    this.fetchPosts(cursors, {isRefresh: true})
  }
  fetchPosts = async (subreddits, options) => {
    try {
      this.setState({refreshing: true})
      console.log("fetching")
      const posts = await redditHelper.getPosts({subreddits});
      postsContainer.updatePosts({...options, ...posts})
      console.log("fetched")
      this.setState({refreshing: false})
    } catch (error) {
      console.error(error)
    }
  }
  onLoadMore = () => {
    console.log("load more")
    this.fetchPosts(this.props.cursors)
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
      <TouchableOpacity key={post.id}>
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
    const { posts } = this.props
    return (
      <View styleName="vertical">
        <View styleName="h-center">
          <Button styleName="secondary">
            <Text>Click me</Text>
          </Button>
          <Button styleName="secondary">
            <Text>Click me</Text>
          </Button>
        </View>
        <ListView
          loading={refreshing}
          onLoadMore={this.onLoadMore}
          onRefresh={this.onRefresh}
          data={posts}
          renderRow={this.renderRow} />
      </View>
    );
  }
}

export default Posts;
