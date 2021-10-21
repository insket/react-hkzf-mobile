import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import News from "../News";
import HomePage from "../HomePage";
import Profile from "../Profile";
import CityList from "../CityList";
import ErrorPage from "../../components/ErrorPage";
import { TabBar } from "antd-mobile";
import "./index.scss";

// TopBar 数据
const tabItems = [
  {
    title: "首页",
    icon: "icon-shouye",
    path: "/home",
  },
  {
    title: "找房",
    icon: "icon-sousuo",
    path: "/home/list",
  },
  {
    title: "资讯",
    icon: "icon-zixun",
    path: "/home/news",
  },
  {
    title: "我的",
    icon: "icon-wode",
    path: "/home/profile",
  },
];

export default class Home extends Component {
  // 渲染 TopBar.Item
  renderTopBar = () => {
    let { pathname } = this.props.location;
    return tabItems.map((item) => (
      <TabBar.Item
        title={item.title}
        key={item.title}
        icon={<i className={`iconfont ${item.icon}`} />}
        selectedIcon={<i className={`iconfont ${item.icon}`} />}
        selected={pathname === item.path}
        onPress={() => {
          this.props.history.push(item.path);
        }}
      />
    ));
  };

  render() {
    return (
      <div className="home">
        {/*  配置子路由  */}
        <Switch>
          <Route path="/home" component={HomePage} exact />
          <Route path="/home/list" component={CityList} />
          <Route path="/home/news" component={News} />
          <Route path="/home/profile" component={Profile} />
          <Redirect to="/home" exact />
          <Route path="*" component={ErrorPage} />
        </Switch>

        {/* TopBar */}
        <TabBar
          unselectedTintColor="#888"
          tintColor="#21b97a"
          barTintColor="white"
          noRenderContent={true}
        >
          {this.renderTopBar()}
        </TabBar>
      </div>
    );
  }
}
