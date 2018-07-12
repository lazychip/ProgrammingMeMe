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
import { postsContainer } from "../../containers";
import {} from "unstated";
import Posts from "../Posts";
type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <Provider inject={[postsContainer]}>
        <View style={{ backgroundColor: "#f0f0f0" }}>
          <Posts />
        </View>
      </Provider>
    );
  }
}
