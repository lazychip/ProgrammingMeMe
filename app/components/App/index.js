/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { View } from "react-native";
import { Heading } from "@shoutem/ui";
import { redditHelper } from "../../helpers";
import { Provider } from "unstated";
import { PostsContainer, postsContainer } from "../../containers";
import {} from "unstated";
import Posts from "../Posts";
import { Subscribe } from "unstated";
type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <Provider inject={[postsContainer]}>
        <View>
            <Subscribe to={[PostsContainer]}>
                {
                    posts => <Posts cursors={posts.state.cursors} posts={posts.state.posts} />
                }
            </Subscribe>
        </View>
      </Provider>
    );
  }
}
